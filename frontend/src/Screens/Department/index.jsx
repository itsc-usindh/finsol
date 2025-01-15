import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import SlideIn from "../../Components/SlideIn";
import { getDateFormated } from "../../Utils/helper";
import DepartmentForm from "./departmentForm";

const Department = () => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [item, setItem] = useState();

    useEffect(() => {
        runApi();
    }, []);

    const runApi = async () => {
        const res = await CallAPI("Department/list");
        if (res.status) {
            setList(res);
            setData(res && res.data.length > 0 && res.data.map(it => {
                return { Id: it.Id, Code:it.Code, "Department Name": it.Name, "Start Date": getDateFormated(it.StartDate), Description: it.Description, Phone: it.Phone }
            }))
        }
    }
    
    const editFormHandler = (row, e) => { 
        setItem(list.data.find(it => it.Id === row.Id));
        setShowEditForm(true);
    }

    const addHandler = async (paylaod) => {
        console.log("Add", paylaod)
        const res = await CallAPI('department/add','POST',paylaod);
        if(res.status){
            setShowAddForm(false)
            runApi();
        }
    }

    const editHandler = async (paylaod) => {
        console.log("Edit", paylaod)
        const res = await CallAPI('department/update','POST',paylaod);
        if(res.status){
            setShowEditForm(false)
            runApi();
        }
    }

    const deleteHandler = async (paylaod) => {
        console.log("Delete", paylaod)
        
        const res = await CallAPI('department/delete?departmentId='+paylaod.Id,'POST');
        if(res.status){
            runApi();
        }
    }
    return (
        <>
            <Topbar title={"Department / List"} />

            {<SlideIn show={showAddForm} title={"Add New Department"} setShowSlideIn={setShowAddForm}>
                <DepartmentForm addNewDepartmentHandler={addHandler} />
            </SlideIn>}
            
            {item && <SlideIn show={showEditForm} title={"Edit: "+item.Name} setShowSlideIn={setShowEditForm}>
                <DepartmentForm addNewDepartmentHandler={editHandler} model={item} />
            </SlideIn>}

            <button className="butn ms-auto d-flex me-3" onClick={()=>{setShowAddForm(true)}}>Add</button>
            <Table title="Department" data={data} onDelete={deleteHandler} onEdit={editFormHandler} />
        </>
    )
}

export default Department
