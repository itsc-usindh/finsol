import { useEffect, useState } from "react";
import SlideIn from "../../Components/SlideIn";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";
import FormInput from "../../Components/FormInput";
import ComboBox from "../../Components/ComboBox";

const ListEmployee = () => {
    const genders = [{ name: "Male", value: "male" }, { name: "Female", value: "female" }]
    const [list, setList] = useState();
    const [data, setData] = useState();
    const [showSlideIn, setShowSlideIn] = useState();
    const [selectedRow, setSelectedRow] = useState();
    const [msg, setMsg] = useState();
    const [isError, setIsError] = useState(true);
    const [positions, setPositions] = useState();
    const [selectedPosition, setSelectedPosition] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [cnic, setCNIC] = useState("");
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
    const [gender, setGender] = useState("");
    const [religion, setReligion] = useState("");
    const [positionId, setPositionId] = useState("");
    const [appointedOn, setAppointedOn] = useState("");
    const [retiredOn, setRetiredOn] = useState(null);

    useEffect(() => {
        runApi();
        console.log(1)
    }, []);

    useEffect(() => {
        const loadPositions = async () => {
            const itemdataRes = await CallAPI('General/GetPositions');
            if (!itemdataRes.length) return;
            const itemData = itemdataRes.map(item => {
                return { name: item.title + ' - ' + item.provisions, value: item.id, provisions: item.provisions }
            })
            setPositions(itemData)
        }
        loadPositions();
    }, []);

    const runApi = async () => {
        const data = await CallAPI("Employee/list");
        setList(data);
        setData(data.length > 0 && data.map(it => {
            return { name: it.firstName + ' ' + it.lastName, CNIC: it.cnic, email: it.email, gender: it.gender, position: it.position, "Joined on": it.appointedOn }
        }))
    }

    const onRowEditHandler = (row, e) => {
        const employee = list.find(em => em.cnic === row.CNIC);
        console.log(employee)
        setSelectedRow(employee);
        setShowSlideIn(true);
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setCNIC(employee.cnic);
        setEmail(employee.email);
        setContact(employee.contact);
        setReligion(employee.religion);
        setProfilePhotoUrl(employee.profilePhotoUrl);
        setGender(employee.gender);
        setAppointedOn((employee.appointedOn).split('T')[0])
        setRetiredOn(employee.retiredOn&&(employee.retiredOn).split('T')[0])
        setPositionId(employee.positionId)

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

    const getSelectedPosition = (option) => {
        setSelectedPosition(option);
        if (option.provisions === 0) {
            setIsError(true);
            setMsg("No provision available for " + option.name);
            return;
        }
        setPositionId(option.value)
        console.dir(option)
    };
    const getSelectedGender = (option) => {
        setGender(option.value)
        console.dir(option)
    };

    const saveHandler = async() =>{
        const payload = {
            id:selectedRow.id,
            firstName,
            lastName,
            email,
            contact,
            cnic,
            profilePhotoUrl,
            gender,
            religion,
            positionId,
            appointedOn,
            retiredOn
        }
        const res = await CallAPI('Employee/Update', 'POST', payload);

        setIsError(!res.status);
        setMsg(res.msg);
        runApi();
        setShowSlideIn(false);
    }
    return (
        <>
            <Topbar title={"Employee / List"} />

            <Toast message={msg} setMessage={setMsg} error={isError} success={!isError} />

            {selectedRow &&
                <SlideIn show={showSlideIn} setShowSlideIn={setShowSlideIn} title="Employee Edit">
                    <div className="form row m-0">
                        <div className="mb-3 col-md-6">
                            <FormInput label="Position" type="text" required value={positions.find(p => p.value === positionId).name} disabled />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="First Name" type="text" required value={firstName} setValue={setFirstName} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Last Name" type="text" required value={lastName} setValue={setLastName} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="CNIC" type="text" required value={cnic} setValue={setCNIC} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Email" type="text" required value={email} setValue={setEmail} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Contact" type="text" value={contact} setValue={setContact} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Religion" type="text" value={religion} setValue={setReligion} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Profile Photo Url" type="text" value={profilePhotoUrl} setValue={setProfilePhotoUrl} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Gender" type="text" required value={genders.find(g => g.value.toLocaleLowerCase() === gender.toLocaleLowerCase()).name} disabled />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Appointment Date" type="date" required value={appointedOn} setValue={setAppointedOn} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Retirement Date" type="date" value={retiredOn} setValue={setRetiredOn} />
                        </div>
                    </div>
                    
                    <div className="ms-auto col-3 col-md-3 mt-3">
                        <button className="butn col-12" onClick={saveHandler}>Update</button>
                    </div>
                </SlideIn>}
            <Table title="Employee List" data={data} onEdit={onRowEditHandler} onDelete={onRowDeleteHandler} />
        </>
    );
}


export default ListEmployee;