import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import Toast from "../../Components/Toast";
import Topbar from "../../Components/Topbar";
import Table from "../../Components/Table";
import CallAPI from "../../Utils/callApi";

const AssignJobTitle = () => {
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);


    const [positions, setPositions] = useState();
    const [positionId, setPositionId] = useState();
    const [campusId, setCampusId] = useState(1);
    const [facultyOptions, setFacultyOptions] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departmentoptions, setDepartmentOptions] = useState("");
    const [sectionId, setSectionId] = useState("");
    const [sectionoptions, setSectionOptions] = useState([]);
    const [jobTitleId, setJobTitleId] = useState("");
    const [jobTitleOptions, setJobTitleOptions] = useState([]);

    useEffect(() => {
        if (campusId)
            CallAPI("faculty/list?campusId=" + campusId).then((data) =>
                setFacultyOptions(
                    data.data.map((faculty) => {
                        return { name: faculty.Name, value: faculty.Id };
                    }))
            );
    }, [campusId]);

    useEffect(() => {
        CallAPI("department/list?facultyId=" + facultyId).then((data) =>
            setDepartmentOptions(data.data.map((Department) => {
                return { name: Department.Name, value: Department.Id };
            }))
        );
    }, [facultyId]);

    useEffect(() => {
        if (departmentId !== "")
            CallAPI("section/list?departmentId=" + departmentId).then((data) =>
                setSectionOptions(data.data.map((Section) => {
                    return { name: Section.Name, value: Section.Id };
                }))
            );
    }, [departmentId]);

    useEffect(() => {
        if(positionId)
        CallAPI("General/GetJobTitles?positionId="+positionId).then((data) =>
            setJobTitleOptions(data.data.map((jobTitle) => {
                return { name: jobTitle.Title, value: jobTitle.Id };
            }))
        );
    }, [positionId]);

    useEffect(() => {
        const getPositions = async () => {
            const res = await CallAPI("General/GetPositions");
            const positionOptions = res.map(position => {
                return { name: position.title, value: position.id }
            })
            setPositions(positionOptions);
        }

        getPositions();
    }, []);
    const saveHandler = async () => {
        if(!jobTitleId || !sectionId || jobTitleId.length === 0 || sectionId.length === 0){
            setIsError(true);
            setMsg("Section and Job Tile are required...");
            return;
        }
        const res = await CallAPI(`General/AddJobTitleDptMapp?jobTitleId=${jobTitleId}&sectionId=${sectionId}`,'POST');
        setIsError(!res.data[0].Status);
        setMsg(res.data[0].Msg);
     }
    return (
        <>
            <Topbar title="Assign Job Tiles" />

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
                    <h2 className="ps-2 mb-4 heading">Add Job Title</h2>
                    <div className="form row">
                        <div className="row m-0">

                            <div className="row m-0">
                                <div className="mb-2 col-6">
                                    <ComboBox disable={!campusId} options={facultyOptions} placeholder={"-- Select Faculty --"} itemSelectHandler={(opt) => setFacultyId(opt.value)} />
                                </div>
                                {/* department Title Dropdown */}

                                <div className="mb-2 col-6">
                                    <ComboBox options={departmentoptions} disable={!facultyId} placeholder={"-- Select Department --"} itemSelectHandler={(opt) => setDepartmentId(opt.value)} />
                                </div>
                                {/* Sections Title Dropdown */}

                                <div className="mb-2 col-6">
                                    <ComboBox options={sectionoptions} disable={!departmentId} placeholder={"-- Select Section --"} itemSelectHandler={(opt) => setSectionId(opt.value)} />
                                </div>

                                <div className="mb-3 col-6">
                                    <ComboBox disable={!positions} options={positions} placeholder={"-- Select Position --"} itemSelectHandler={(opt) => setPositionId(opt.value)} />
                                </div>

                                <div className="mb-3 col-12">
                                    <ComboBox disable={!positionId} options={jobTitleOptions} placeholder={"-- Select Job Title --"} itemSelectHandler={(opt) => setJobTitleId(opt.value)} />
                                </div>
                            </div>

                            <div className="ms-auto d-flex justify-content-end">
                                <button className="butn" onClick={saveHandler}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="mt-5" />

            {/* <Table isSmall noPagination title="Job Titles" data={jobTitles} /> */}
        </>
    );
}

export default AssignJobTitle;