import { useEffect, useState } from "react";
import SlideIn from "../../Components/SlideIn";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";
import FormInput from "../../Components/FormInput";
import EmployeeEducation from "./employeeEducationForm";
import { useNavigate } from "react-router-dom";


const ListEmployee = () => {
    const navigator = useNavigate();

    const [list, setList] = useState();
    const [data, setData] = useState();
    const [showSlideIn, setShowSlideIn] = useState();
    const [selectedRow, setSelectedRow] = useState();
    const [msg, setMsg] = useState();
    const [isError, setIsError] = useState(true);

    useEffect(() => {
        runApi();
        console.log(1)
    }, []);


    const runApi = async () => {
        const data = await CallAPI("Employee/list");
        setList(data);
        setData(data.length > 0 && data.map(it => {
            return { name: it.name, 'father Name': it.fatherName, surname: it.surname, department: it.department, email: it.email, contact: it.contact, getnder: it.gender, CNIC:it.cnic }
        }))
    }

    const onRowEditHandler = (row, e) => {
        const employee = list.find(em => em.cnic === row.CNIC);
        navigator('/editEmployee?employeeId=' + employee.id);
    }

    const onRowDeleteHandler = async (row, e) => {
        const employee = list.find(em => em.cnic === row.CNIC);
        const res = await CallAPI('Employee/Delete?Id=' + employee.id, 'POST');

        if (res && res.msg) {
            setIsError(!res.status)
            setMsg(res.msg);
            runApi();
        }
    }

    const onRowViewHandler = async (row, e) => {
        const employee = list.find(em => em.cnic === row.CNIC);
        navigator('/employeeLeaves?employeeId=' + employee.id);
    }

    return (
        <>
            <Topbar title={"Employee / List"} />

            <Toast message={msg} setMessage={setMsg} error={isError} success={!isError} />

            {selectedRow &&
                <SlideIn show={showSlideIn} setShowSlideIn={setShowSlideIn} title="Employee Edit">
                    <EmployeeEducation />
                </SlideIn>}

            <Table title="Employee List" data={data} onEdit={onRowEditHandler} onDelete={onRowDeleteHandler} onView={onRowViewHandler} />
        </>
    );
}


export default ListEmployee;