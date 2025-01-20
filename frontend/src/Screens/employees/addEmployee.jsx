import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import SlideIn from "../../Components/SlideIn";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";
import { data } from "react-router-dom";
import Department from "../Department";
import Section from "../Section";

const AddEmployee = () => {
    const genders = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
    ];

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
    const [jobTitleId, setJobTitleId] = useState("");
    const [appointedOn, setAppointedOn] = useState("");
    const [retiredOn, setRetiredOn] = useState(null);
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(true);

    const [campuses, setCampuses] = useState([]);
    const [faculties, setFaculties] = useState();
    const [departments, setDepartments] = useState([]);
    const [sections, setSections] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);

    const [jobTitleOptions, setJobTitleOptions] = useState([]);
    const [sectionoptions, setSectionOptions] = useState([]);

    const [placeholder, setPlaceholder] = useState("Select Campus");
    const [campusOptions, setCampusOptions] = useState(campuses);
    const [campusId, setCampusId] = useState(data.id);
    const [facultyOptions, setFacultyOptions] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departmentoptions, setDepartmentOptions] = useState("");

    const [payScale, setPayScale] = useState("");
    const [payScaleId, setPayScaleId] = useState("");

    const [sectionId, setSectionId] = useState("");
    const [postAvailable, setPostAvailable] = useState(false);

    // campuses api call
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
            campuses.map((campus) => {
                return { name: campus.Name, value: campus.Id };
            })
        );
    }, [campuses]);
    //   faculty api call
    useEffect(() => {
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
        CallAPI('General/getJobTitles?positionId=' + positionId + '&sectionId=' + sectionId)
            .then(data => setJobTitles(data.data))
    }, [positionId]);

    useEffect(() => {
        CallAPI('General/GetAvailablePosts?jobTitleDptMappId=' + jobTitleId).then(data => {
            const res = data.data[0];
            if (res?.VaccantPost == 0) alert("No post available")
            else if (res?.VaccantPost > 0) setPostAvailable(true);
            else setPostAvailable(false);
        })
    }, [jobTitleId]);

    useEffect(() => {
        setJobTitleOptions(jobTitles.map(jobTitle => {
            return {
                name: jobTitle.Title,
                value: jobTitle.Id
            }
        }))
    }, [jobTitles])

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
            firstName !== "" &&
            lastName !== "" &&
            email !== ""
        ) {
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
                retiredOn,
            };
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

                        <div className="mb-2 col-6">
                            {campusOptions && placeholder && campusOptions.length > 0 && (
                                <ComboBox
                                    options={campusOptions}
                                    placeholder={placeholder}
                                    itemSelectHandler={(opt) => setCampusId(opt.value)}
                                />
                            )}
                        </div>
                        {/* Faculty Title Dropdown */}

                        <div className="mb-2 col-6">
                            {campusId &&
                                facultyOptions &&
                                placeholder &&
                                facultyOptions.length > 0 && (
                                    <ComboBox
                                        options={facultyOptions}
                                        placeholder={"Faculty Options"}
                                        itemSelectHandler={(opt) => setFacultyId(opt.value)}
                                    />
                                )}
                        </div>
                        {/* department Title Dropdown */}

                        <div className="mb-2 col-6">
                            {facultyId &&
                                campusId &&
                                departmentoptions &&
                                placeholder &&
                                departmentoptions.length > 0 && (
                                    <ComboBox
                                        options={departmentoptions}
                                        placeholder={"Department options"}
                                        itemSelectHandler={(opt) => setDepartmentId(opt.value)}
                                    />
                                )}
                        </div>
                        {/* Sections Title Dropdown */}

                        <div className="mb-2 col-6">
                            {departmentId &&
                                facultyId &&
                                campusId &&
                                departmentoptions.length > 0 &&
                                sectionoptions &&
                                placeholder &&
                                sectionoptions.length > 0 && (
                                    <ComboBox
                                        options={sectionoptions}
                                        placeholder={"Section options"}
                                        itemSelectHandler={(opt) => setSectionId(opt.value)}
                                    />
                                )}
                        </div>
                        {/* positoned title dropdown */}
                        <div className="mb-3 col-md-6">
                            {positions &&
                                departmentId &&
                                facultyId &&
                                campusId &&
                                sectionoptions &&
                                placeholder &&
                                sectionoptions.length > 0 && (
                                    <ComboBox
                                        options={positions}
                                        placeholder="-- Select Position --"
                                        itemSelectHandler={getSelectedPosition}
                                    />
                                )}
                        </div>

                        {/* Job Title Dropdown */}
                        <div className="mb-2 col-6">
                            {jobTitleOptions && selectedPosition && facultyId && campusId && facultyOptions && placeholder && jobTitleOptions.length > 0 && <ComboBox options={jobTitleOptions} placeholder={"Select Job title"} label="Job Title" itemSelectHandler={(opt) => setJobTitleId(opt.value)} />}
                        </div>

                        {postAvailable && <>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="First Name"
                                    type="text"
                                    required
                                    value={firstName}
                                    setValue={setFirstName}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="Last Name"
                                    type="text"
                                    required
                                    value={lastName}
                                    setValue={setLastName}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="CNIC"
                                    type="text"
                                    required
                                    value={cnic}
                                    setValue={setCNIC}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="Email"
                                    type="text"
                                    required
                                    value={email}
                                    setValue={setEmail}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="Contact"
                                    type="text"
                                    value={contact}
                                    setValue={setContact}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="Religion"
                                    type="text"
                                    value={religion}
                                    setValue={setReligion}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="Profile Photo Url"
                                    type="text"
                                    value={profilePhotoUrl}
                                    setValue={setProfilePhotoUrl}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                {genders && (
                                    <ComboBox
                                        options={genders}
                                        placeholder="-- Select Gender --"
                                        itemSelectHandler={getSelectedGender}
                                    />
                                )}
                            </div>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="Appointment Date"
                                    type="date"
                                    required
                                    value={appointedOn}
                                    setValue={setAppointedOn}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <FormInput
                                    label="Retirement Date"
                                    type="date"
                                    value={retiredOn}
                                    setValue={setRetiredOn}
                                />
                            </div>
                        </>}
                    </div>

                    <div className="ms-auto col-3 col-md-1 mt-3">
                        <button className="butn col-12" onClick={saveHandler}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEmployee;
