import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Topbar from "../../Components/Topbar";
import ComboBox from "../../Components/ComboBox";
import { useEffect, useState } from "react";
import FormInput from "../../Components/FormInput";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";
import Table from "../../Components/Table";

function PromoteEmployee() {
    const { search } = useLocation();
    const [query, setQuery] = useSearchParams(search);
    const navigation = useNavigate();

    const [employeeId, setEmployeeId] = useState(query.get("employeeId"));
    const [employee, setEmployee] = useState();
    const [toDate, setToDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [reason, setReason] = useState("");

    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);

    const [employeePromoteHistroy, setEmployeePromoteHistroy] = useState();


    const [campuses, setCampuses] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sections, setSections] = useState([]);
    const [positions, setPositions] = useState();
    const [jobTitles, setJobTitles] = useState([]);

    const [campusId, setCampusId] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [sectionId, setSectionId] = useState("");
    const [positionId, setPositionId] = useState("");
    const [jobTitleId, setJobTitleId] = useState("");

    useEffect(() => {
        runApi()
    }, []);

    useEffect(() => {
        if (employee)
            CallAPI("campus/list?organizationId=1").then((data) => {
                setCampuses(getOptions(data.data));
                setCampusId(employee.campusId)
            }
            );
    }, [employee]);

    useEffect(() => {
        if (campusId !== "")
            CallAPI("faculty/list?campusId=" + campusId).then((data) => {
                setFaculties(getOptions(data.data))
                setFacultyId(employee.facultyId)
            });
    }, [campusId]);
    useEffect(() => {
        if (facultyId !== "")
            CallAPI("department/list?facultyId=" + facultyId).then((data) => {
                setDepartments(getOptions(data.data))
                setDepartmentId(employee.departmentId)
            });
    }, [facultyId]);
    useEffect(() => {
        if (departmentId !== "")
            CallAPI("section/list?departmentId=" + departmentId).then((data) =>{
                setSections(getOptions(data.data));
                setSectionId(employee.sectionId)

            });
    }, [departmentId]);
    useEffect(() => {
        const loadPositions = async () => {
            const itemdataRes = await CallAPI("General/GetPositions");
            if (!itemdataRes.length) return;
            setPositions(itemdataRes.map((item) => {
                return {
                    name: item.title,
                    value: item.id,
                };
            }));
            setPositionId(employee.positionId)
        };

        if(employee)
        loadPositions();
    }, [employee]);

    useEffect(() => {
        if (sectionId !== "" && positionId !== "")
            CallAPI(
                "General/getJobTitles?positionId=" +
                positionId +
                "&sectionId=" +
                sectionId
            ).then((data) => {
                setJobTitles(data.data.map(d => {
                return { name: d.Title, value: d.id }
            }));
            setJobTitleId(employee.jobTitleId)
        });
    }, [positionId, sectionId]);

    const getOptions = (data) => {
        return data?.map(d => {
            return { name: d.Name, value: d.Id }
        })
    }

    const runApi = () => {
        CallAPI("Employee/GetEmployeeById?employeeId=" + employeeId).then(res => {
            setEmployee(res)
        });
        CallAPI("Employee/GetEmployeePromoteHistory?employeeId=" + employeeId).then(res => {
            setEmployeePromoteHistroy(res.map(r=>{
                return {campus: r.campus, faculty: r.faculty, department: r.department, section: r.section, payscale: r.position, 'job Title': r.jobTitle, }
            }))
        });
    }

    const applyHandler = async () => {
        const payload = {
            employeeId,
            jobTitleDptMappId:jobTitleId
        }
        const res = await CallAPI('Employee/PromoteEmployee', 'POST', payload);
        setIsError(!res.status);
        setMsg(res.msg);
        // runApi();
    }
    return (
        <>
            <Topbar title="Promote Employee" />


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
                    <h2 className="ps-2 mb-4 heading">Promote Employee</h2>
                    <div className="form row">
                        <div className="row m-0">

                            <div className="row m-0">
                                <div className="mb-2 col-6">
                                    <ComboBox options={campuses} disable={campuses.length === 0} placeholder={"-- Select Campus --"} itemSelectHandler={(opt) => setCampusId(opt.value)} initSelectedOption={campuses.find(d => d.value === campusId)} />
                                </div>
                                {/* Faculty Title Dropdown */}

                                <div className="mb-2 col-6">
                                    <ComboBox disable={!campusId} options={faculties} placeholder={"-- Select Faculty --"} itemSelectHandler={(opt) => setFacultyId(opt.value)} initSelectedOption={faculties.find(f => f.value === facultyId)} />
                                </div>
                                {/* department Title Dropdown */}

                            </div>

                            <div className="row m-0">
                                <div className="mb-2 col-6">
                                    <ComboBox options={departments} disable={!facultyId} placeholder={"-- Select Department --"} itemSelectHandler={(opt) => setDepartmentId(opt.value)} initSelectedOption={departments.find(d => d.value === departmentId)} />
                                </div>
                                {/* Sections Title Dropdown */}

                                <div className="mb-2 col-6">
                                    <ComboBox options={sections} disable={!departmentId} placeholder={"-- Select Section --"} itemSelectHandler={(opt) => setSectionId(opt.value)} initSelectedOption={sections.find(s => s.value === sectionId)} />
                                </div>

                            </div>

                            <div className="row m-0">
                                {/* positoned title dropdown */}
                                <div className="mb-3 col-md-6">
                                    <ComboBox options={positions} disable={!positions} placeholder="-- Select Position --" itemSelectHandler={opt => setPositionId(opt.value)} initSelectedOption={positions?.find(p => p.value === positionId)} />
                                </div>

                                {/* Job Title Dropdown */}
                                <div className="mb-2 col-6">
                                    <ComboBox options={jobTitles} disable={(!positionId ? true : (sectionId.length === 0))} placeholder={"-- Select Job title --"} label="Job Title" itemSelectHandler={(opt) => setJobTitleId(opt.value)} initSelectedOption={jobTitles.find(j => j.value === jobTitleId)} />
                                </div>
                            </div>

                            <div className="ms-auto d-flex justify-content-end">
                                <button className="butn" onClick={applyHandler}>
                                    Promote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="mt-5" />

            <Table isSmall noPagination title="Leaves History" data={employeePromoteHistroy} />
        </>
    );
}

export default PromoteEmployee;