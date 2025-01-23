import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import FormInput from "../../Components/FormInput";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";
import { data } from "react-router-dom";
import { getDateFormated } from "../../Utils/helper";

const AddEmployee = () => {
    const genders = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
    ];

    const [positions, setPositions] = useState();
    const [selectedPosition, setSelectedPosition] = useState();
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [cnic, setCNIC] = useState("");
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
    const [gender, setGender] = useState("");
    const [religion, setReligion] = useState("");
    const [positionId, setPositionId] = useState("");
    const [jobTitleId, setJobTitleId] = useState("");
    const [borrowedJobTitleDptMappId, setBorrowedJobTitleDptMappId] = useState();
    const [appointedOn, setAppointedOn] = useState("");
    const [retiredOn, setRetiredOn] = useState("");
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(true);

    const [campuses, setCampuses] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sections, setSections] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);

    const [jobTitleOptions, setJobTitleOptions] = useState([]);
    const [sectionoptions, setSectionOptions] = useState([]);

    const [campusOptions, setCampusOptions] = useState(campuses);
    const [campusId, setCampusId] = useState(data.id);
    const [facultyOptions, setFacultyOptions] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departmentoptions, setDepartmentOptions] = useState("");

    const [sectionId, setSectionId] = useState("");
    const [postAvailable, setPostAvailable] = useState(false);

    // add new usestate

    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [husbandName, setHusbandName] = useState("");
    const [surname, setSurname] = useState("");
    const [title, setTitle] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [accountTitle, setAccountTitle] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [mailingAddress, setMailingAddress] = useState("");
    const [ntnNumber, setNtnNumber] = useState("");
    const [bank, setBank] = useState("");
    const [diedOnService, setDiedOnService] = useState("");
    const [resign, setResign] = useState("");
    const [terminated, setTerminated] = useState("");

    useEffect(() => {
        const runApi = () => {
            CallAPI("campus/list?organizationId=1").then((data) =>
                setCampuses(data.data)
            );
        };

        runApi();
    }, []);

    useEffect(() => {
        setCampusOptions(
            campuses?.map((campus) => {
                return { name: campus.Name, value: campus.Id };
            }) || []
        );
    }, [campuses]);
    //   faculty api call
    useEffect(() => {
        if (campusId)
            CallAPI("faculty/list?campusId=" + campusId).then((data) =>
                setFaculties(data.data)
            );
    }, [campusId]);

    useEffect(() => {
        if (faculties)
            setFacultyOptions(
                faculties.map((faculty) => {
                    return { name: faculty.Name, value: faculty.Id };
                })
            );
    }, [faculties]);
    //   department api call

    useEffect(() => {
        CallAPI("department/list?facultyId=" + facultyId).then((data) =>
            setDepartments(data.data)
        );
    }, [facultyId]);

    useEffect(() => {
        if (departments)
            setDepartmentOptions(
                departments.map((Department) => {
                    return { name: Department.Name, value: Department.Id };
                })
            );
    }, [departments]);
    //   section api call

    useEffect(() => {
        if (departmentId !== "")
            CallAPI("section/list?departmentId=" + departmentId).then((data) =>
                setSections(data.data)
            );
    }, [departmentId]);

    useEffect(() => {
        if (sections)
            setSectionOptions(
                sections.map((Section) => {
                    return { name: Section.Name, value: Section.Id };
                })
            );
    }, [sections]);

    useEffect(() => {
        const loadPositions = async () => {
            const itemdataRes = await CallAPI("General/GetPositions");
            if (!itemdataRes.length) return;
            const itemData = itemdataRes.map((item) => {
                return {
                    name: item.title,
                    value: item.id,
                };
            });
            setPositions(itemData);
        };
        loadPositions();
    }, []);

    useEffect(() => {
        CallAPI(
            "General/getJobTitles?positionId=" +
            positionId +
            "&sectionId=" +
            sectionId
        ).then((data) => setJobTitles(data.data));
    }, [positionId, sectionId]);

    useEffect(() => {
        if (jobTitleId)
            CallAPI("General/GetAvailablePosts?jobTitleDptMappId=" + jobTitleId).then(
                (data) => {
                    const res = data.data[0];
                    if (res?.VaccantPost == 0) alert("No post available");
                    else if (res?.VaccantPost > 0) setPostAvailable(true);
                    else setPostAvailable(false);
                }
            );
    }, [jobTitleId]);

    useEffect(() => {
        setJobTitleOptions(
            jobTitles.map((jobTitle) => {
                return {
                    name: jobTitle.Title,
                    value: jobTitle.id,
                };
            })
        );
    }, [jobTitles]);

    const getSelectedPosition = (option) => {
        setSelectedPosition(option);
        if (option.provisions === 0) {
            setIsError(true);
            setMsg("No provision available for " + option.name);
            return;
        }
        setPositionId(option.value);
        console.dir(option);
    };
    const getSelectedGender = (option) => {
        setGender(option.value);
        console.dir(option);
    };


    const saveHandler = async () => {
        if (
            selectedPosition &&
            selectedPosition.provisions === 0 &&
            positionId === ""
        ) {
            setIsError(true);
            setMsg("No provision available for " + selectedPosition.name);
            return;
        }
        if (
            positionId !== "" &&
            cnic !== "" &&
            email !== ""
        ) {
            const payload = {
                name,
                fatherName,
                husbandName,
                surname,
                title,
                bank,
                accountNo,
                accountTitle,
                mailingAddress,
                ntnNumber,
                email,
                contact,
                cnic,
                profilePhotoUrl,
                gender,
                religion,
                dateOfBirth:dateOfBirth===""?null:dateOfBirth,
                appointedOn:appointedOn===""?null:appointedOn,
                retiredOn:retiredOn===""?null:retiredOn,
                diedOnService:diedOnService===""?null:diedOnService,
                resign:resign===""?null:resign,
                terminated:terminated===""?null:terminated,
                jobTitleDptMappId: jobTitleId,
                borrowedJobTitleDptMappId,
            };

            const res = await CallAPI("Employee/Add", "POST", payload);
            if (res && res.msg) {
                setIsError(false);
                setMsg(res.msg);

                //clear form
                setGender("");
                setName("");
                setFatherName("");
                setHusbandName("");
                setSurname("");
                setTitle("");
                setBank("");
                setAccountNo("");
                setAccountTitle("");
                setDateOfBirth("");
                setMailingAddress("");
                setNtnNumber("");
                setEmail("");
                setContact("");
                setCNIC("");
                setProfilePhotoUrl("");
                setReligion("");
                setAppointedOn("");
                setRetiredOn("");
                setDiedOnService("");
                setResign("");
                setTerminated("");
                setJobTitleId("");
                setBorrowedJobTitleDptMappId("");
            }
        } else {
            setIsError(true);
            setMsg("Please fill all required fields ...");
        }
    };


    return (
        <>
            <Topbar title="Add" />

            {msg && (
                <Toast
                    message={msg}
                    setMessage={setMsg}
                    error={isError}
                    success={!isError}
                />
            )}

            <div className="px-3">
                <div className="box floating-heading">
                    <h2 className="ps-2 mb-4 heading">Add Employee</h2>
                    <div className="form row">
                        {/* drop down start here */}
                        {/* Campus Title Dropdown */}


                        <div className="row m-0">
                            <div className="mb-2 col-6">
                                {campusOptions && campusOptions.length > 0 && (
                                    <ComboBox options={campusOptions} placeholder={"-- Select Campus --"} itemSelectHandler={(opt) => setCampusId(opt.value)} />
                                )}
                            </div>
                            {/* Faculty Title Dropdown */}

                            <div className="mb-2 col-6">
                                <ComboBox disable={!campusId} options={facultyOptions} placeholder={"-- Select Faculty --"} itemSelectHandler={(opt) => setFacultyId(opt.value)} />
                            </div>
                            {/* department Title Dropdown */}

                        </div>

                        <div className="row m-0">
                            <div className="mb-2 col-6">
                                <ComboBox options={departmentoptions} disable={!facultyId} placeholder={"-- Select Department --"} itemSelectHandler={(opt) => setDepartmentId(opt.value)} />
                            </div>
                            {/* Sections Title Dropdown */}

                            <div className="mb-2 col-6">
                                <ComboBox options={sectionoptions} disable={!departmentId} placeholder={"-- Select Section --"} itemSelectHandler={(opt) => setSectionId(opt.value)} />
                            </div>

                        </div>

                        <div className="row m-0">
                            {/* positoned title dropdown */}
                            <div className="mb-3 col-md-6">
                                <ComboBox options={positions} disable={!positions} placeholder="-- Select Position --" itemSelectHandler={getSelectedPosition} />
                            </div>

                            {/* Job Title Dropdown */}
                            <div className="mb-2 col-6">
                                <ComboBox options={jobTitleOptions} disable={(!selectedPosition ? true : (sectionId.length === 0))} placeholder={"-- Select Job title --"} label="Job Title" itemSelectHandler={(opt) => setJobTitleId(opt.value)} />
                            </div>
                        </div>
                        <hr className="my-3" />
                        {!postAvailable && <div className="px-3"><p className="no-data-row text-center">Select a valid Job title to proceed</p></div>}
                        {postAvailable && (
                            <>
                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput label="Employe Name" required value={name} setValue={setName} />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput label="Father Name" required value={fatherName} setValue={setFatherName} />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={husbandName} setValue={setHusbandName} label="Husband Name" />
                                    </div>
                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={bank} setValue={setBank} label="Bank" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={surname} setValue={setSurname} label="Surname" />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={title} setValue={setTitle} label="Title" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={mailingAddress} setValue={setMailingAddress} label="Mailing Address" />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={accountNo} setValue={setAccountNo} label="Account No" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={accountTitle} setValue={setAccountTitle} label="Account Title" />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={contact} setValue={setContact} label="Contact" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <ComboBox label="Gender" placeholder="Select Gender" options={genders} itemSelectHandler={getSelectedGender} />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={religion} setValue={setReligion} label="Religion" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={cnic} setValue={setCNIC} label="CNIC" />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={profilePhotoUrl} setValue={setProfilePhotoUrl} label="Profile Photo" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={ntnNumber} setValue={setNtnNumber} label="NTN Number" />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="text" value={email} setValue={setEmail} label="Email" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput type="date" value={getDateFormated(dateOfBirth)} setValue={setDateOfBirth} label="Date Of Birth" />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="date" value={getDateFormated(diedOnService)} setValue={setDiedOnService} label="Died On Service" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput type="date" value={getDateFormated(appointedOn)} setValue={setAppointedOn} label="Appointed On" />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="date" value={getDateFormated(retiredOn)} setValue={setRetiredOn} label="Retired On" />
                                    </div>
                                </div>

                                <div className="row m-0">
                                    <div className="mb-2 col-6">
                                        <FormInput type="date" value={getDateFormated(terminated)} setValue={setTerminated} label="Terminated" />
                                    </div>

                                    <div className="mb-2 col-6">
                                        <FormInput type="date" value={getDateFormated(resign)} setValue={setResign} label="Resign" />
                                    </div>
                                </div>

                            </>
                        )}
                    </div>

                    <div className="ms-auto col-3 col-md-1 mt-3">
                        <button className="butn col-12" onClick={saveHandler}>
                            Save
                        </button>
                    </div>

                </div>
            </div>
            <div>
            </div>
        </>
    );
};

export default AddEmployee;
