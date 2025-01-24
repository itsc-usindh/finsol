import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";

const JobTitle = () => {
    const [positions, setPositions] = useState();
    const [positionId, setPositionId] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);

    const [jobTitles, setJobTitles] = useState();

    const getJobTitles= async () => {
        const res = await CallAPI('General/GetJobTitles');
        const tableData = res.data.sort((a, b) => new Date(b.CreatedOn) - new Date(a.CreatedOn)).map(jt=>{
            return {BPS: positions?.find(p=>p.value === jt.PositionId).name, title:jt.Title,Description:jt.Description}
        })
        setJobTitles(tableData);
    }
    useEffect(()=>{
        const getPositions = async ()=> {
            const res = await CallAPI("General/GetPositions");
            const positionOptions = res.map(position=>{
                return {name:position.title,value:position.id}
            })
            setPositions(positionOptions);
        }

        getPositions();
    },[]);

    useEffect(()=>{
        getJobTitles();
    },[])

    const saveHandler = async () => {
        if(!positionId || !title || positionId.length === 0 || title.length === 0){
            setIsError(true);
            setMsg("Position and Title are required...");
            return;
        }
        const res = await CallAPI(`General/AddJobTitle?positionId=${positionId}&title=${title}&description=${description}`,'POST');
        setIsError(!res.status);
        setMsg(title+" added successfully");
        setTitle("");
        setDescription("");
        getJobTitles();
    }
    return (
        <>
            <Topbar title="Job Tiles"/>

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
                            <div className="mb-3 col-6">
                                {positions && positions.length > 0 && (
                                    <ComboBox options={positions} placeholder={"-- Select Position --"} itemSelectHandler={(opt) => setPositionId(opt.value)} />
                                )}
                            </div>

                            <div className="mb-3 col-6">
                                <FormInput label="Title" required value={title} setValue={setTitle} />
                            </div>

                            <div className="mb-3 col-12">
                                <FormInput label="Description" required value={description} setValue={setDescription} />
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

            <Table isSmall noPagination title="Job Titles" data={jobTitles} />
        </>
    );
}

export default JobTitle;