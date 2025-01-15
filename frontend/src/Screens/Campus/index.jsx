import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import CampusForm from "./campusForm";
import SlideIn from "../../Components/SlideIn";
import { getDateFormated } from "../../Utils/helper";

const Campus = () => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [item, setItem] = useState();

    useEffect(() => {
        runApi();
    }, []);

    const runApi = async () => {
        const res = await CallAPI("Campus/list?organizationId=1");
        if (res.status) {
            setList(res);
            setData(res && res.data.length > 0 && res.data.map(it => {
                return { Id: it.Id, "Campus Name": it.Name, "Start Date": getDateFormated(it.StartDate), Country: it.Country, State: it.State, City: it.City, Phone: it.Phone }
            }))
        }
    }
    
    const editFormHandler = (row, e) => { 
        setItem(list.data.find(it => it.Id === row.Id));
        setShowEditForm(true);
    }

    const addHandler = async (paylaod) => {
        console.log("Add", paylaod)
        const res = await CallAPI('campus/add','POST',paylaod);
        if(res.status){
            setShowAddForm(false)
            runApi();
        }
    }

    const editHandler = async (paylaod) => {
        console.log("Edit", paylaod)
        const res = await CallAPI('campus/update','POST',paylaod);
        if(res.status){
            setShowEditForm(false)
            runApi();
        }
    }

    const deleteHandler = async (paylaod) => {
        console.log("Delete", paylaod)
        
        const res = await CallAPI('campus/delete?campusId='+paylaod.Id,'POST');
        if(res.status){
            setShowEditForm(false)
            runApi();
        }
    }
    return (
        <>
            <Topbar title={"Campus / List"} />

            {<SlideIn show={showAddForm} title={"Add New Campus"} setShowSlideIn={setShowAddForm}>
                <CampusForm addNewCampusHandler={addHandler} />
            </SlideIn>}
            
            {item && <SlideIn show={showEditForm} title={"Edit: "+item.Name} setShowSlideIn={setShowEditForm}>
                <CampusForm addNewCampusHandler={editHandler} model={item} />
            </SlideIn>}

            <button className="butn ms-auto d-flex me-3" onClick={()=>{setShowAddForm(true)}}>Add</button>
            <Table title="Campus" data={data} onDelete={deleteHandler} onEdit={editFormHandler} />
        </>
    )
}

export default Campus;