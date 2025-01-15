import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import SlideIn from "../../Components/SlideIn";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";

const AddEmployee = () => {
    const genders = [{ name: "Male", value: "male" }, { name: "Female", value: "female" }]

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
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(true);


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
    const saveHandler = async () => {
        if (selectedPosition && selectedPosition.provisions === 0 && positionId === "") {
            setIsError(true);
            setMsg("No provision available for " + selectedPosition.name);
            return;
        }
        if (positionId !== "" && cnic !== "" && firstName !== "" && lastName !== "" && email !== "") {
            const payload = {
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
            const res = await CallAPI("Employee/Add", "POST", payload);
            if (res && res.msg) {
                setIsError(false);
                setMsg(res.msg);
                setFirstName("");
                setLastName("");
                setEmail("");
                setContact("");
                setCNIC("");
                setProfilePhotoUrl("");
                setGender("");
                setReligion("");
                setPositionId("");
                setAppointedOn("");
                setRetiredOn(null);
                setRetiredOn("");
            }
        }
        else {
            setIsError(true);
            setMsg("Please fill all required fields ...")
        }
    };

    return (
        <>
            <Topbar title="Add" />

            {msg && <Toast message={msg} setMessage={setMsg} error={isError} success={!isError} />}

            <div className="px-3">
                <div className="box floating-heading">
                    <h2 className="ps-2 mb-4 heading">Add Employee</h2>
                    <div className="form row">
                        <div className="mb-3 col-md-6">
                            {positions && <ComboBox options={positions} placeholder="-- Select Position --" itemSelectHandler={getSelectedPosition} />}
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
                            {genders && <ComboBox options={genders} placeholder="-- Select Gender --" itemSelectHandler={getSelectedGender} />}
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Appointment Date" type="date" required value={appointedOn} setValue={setAppointedOn} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <FormInput label="Retirement Date" type="date" value={retiredOn} setValue={setRetiredOn} />
                        </div>
                    </div>

                    <div className="ms-auto col-3 col-md-1 mt-3">
                        <button className="butn col-12" onClick={saveHandler}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEmployee;
