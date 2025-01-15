import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import SlideIn from "../../Components/SlideIn";
import { getDateFormated } from "../../Utils/helper";
import FacultyForm from "./facultyForm";

const Faculty = () => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [item, setItem] = useState();

    useEffect(() => {
        runApi();
    }, []);

    const runApi = async () => {
        const res = await CallAPI("Faculty/list");
        if (res.status) {
            setList(res);
            setData(res && res.data.length > 0 && res.data.map(it => {
                return { Id: it.Id, "Faculty Name": it.Name, "Start Date": getDateFormated(it.StartDate), Description: it.Description, Fax: it.Fax, Email: it.Email, Phone: it.Phone }
            }))
        }
    }
    
    const editFormHandler = (row, e) => { 
        setItem(list.data.find(it => it.Id === row.Id));
        setShowEditForm(true);
    }

    const addHandler = async (paylaod) => {
        console.log("Add", paylaod)
        const res = await CallAPI('faculty/add','POST',paylaod);
        if(res.status){
            setShowAddForm(false)
            runApi();
        }
    }

    const editHandler = async (paylaod) => {
        console.log("Edit", paylaod)
        const res = await CallAPI('faculty/update','POST',paylaod);
        if(res.status){
            setShowEditForm(false)
            runApi();
        }
    }

    const deleteHandler = async (paylaod) => {
        console.log("Delete", paylaod)
        
        const res = await CallAPI('faculty/delete?facultyId='+paylaod.Id,'POST');
        if(res.status){
            setShowEditForm(false)
            runApi();
        }
    }
    return (
        <>
            <Topbar title={"Faculties / List"} />

            {<SlideIn show={showAddForm} title={"Add New Faculty"} setShowSlideIn={setShowAddForm}>
                <FacultyForm addNewFacultyHandler={addHandler} />
            </SlideIn>}
            
            {item && <SlideIn show={showEditForm} title={"Edit: "+item.Name} setShowSlideIn={setShowEditForm}>
                <FacultyForm addNewFacultyHandler={editHandler} model={item} />
            </SlideIn>}

            <button className="butn ms-auto d-flex me-3" onClick={()=>{setShowAddForm(true)}}>Add</button>
            <Table title="Faculty" data={data} onDelete={deleteHandler} onEdit={editFormHandler} />
        </>
    )
}

export default Faculty
