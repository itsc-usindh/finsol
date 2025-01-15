import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import SlideIn from "../../Components/SlideIn";
import { getDateFormated } from "../../Utils/helper";
import SectionForm from "./sectionForm";

const Section = () => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [item, setItem] = useState();

    useEffect(() => {
        runApi();
    }, []);

    const runApi = async () => {
        const res = await CallAPI("Section/list");
        if (res.status) {
            setList(res);
            setData(res && res.data.length > 0 && res.data.map(it => {
                return { Id: it.Id, "Section Name": it.Name, Department:it.DepartmentName, Description:it.Description }
            }))
        }
    }
    
    const editFormHandler = (row, e) => { 
        setItem(list.data.find(it => it.Id === row.Id));
        setShowEditForm(true);
    }

    const addHandler = async (paylaod) => {
        console.log("Add", paylaod)
        const res = await CallAPI('section/add','POST',paylaod);
        if(res.status){
            setShowAddForm(false)
            runApi();
        }
    }

    const editHandler = async (paylaod) => {
        console.log("Edit", paylaod)
        const res = await CallAPI('section/update','POST',paylaod);
        if(res.status){
            setShowEditForm(false)
            runApi();
        }
    }

    const deleteHandler = async (paylaod) => {
        console.log("Delete", paylaod)
        
        const res = await CallAPI('section/delete?sectionId='+paylaod.Id,'POST');
        if(res.status){
            setShowEditForm(false)
            runApi();
        }
    }
    return (
        <>
            <Topbar title={"Section / List"} />

            {<SlideIn show={showAddForm} title={"Add New Section"} setShowSlideIn={setShowAddForm}>
                <SectionForm addNewSectionHandler={addHandler} />
            </SlideIn>}
            
            {item && <SlideIn show={showEditForm} title={"Edit: "+item.Name} setShowSlideIn={setShowEditForm}>
                <SectionForm addNewSectionHandler={editHandler} model={item} />
            </SlideIn>}

            <button className="butn ms-auto d-flex me-3" onClick={()=>{setShowAddForm(true)}}>Add</button>
            <Table title="Section" data={data} onDelete={deleteHandler} onEdit={editFormHandler} />
        </>
    )
}

export default Section
