import { useEffect, useState } from "react";
import FormInput from "../../Components/FormInput";
import { getDateFormated } from "../../Utils/helper";
import ComboBox from "../../Components/ComboBox";
import CallAPI from "../../Utils/callApi";

const FacultyForm = ({ addNewFacultyHandler, model }) => {
    const [name, setName] = useState(model?.Name);
    const [description, setDescription] = useState(model?.Description);
    const [campusId, setCampusId] = useState(model?.CampusId);
    const [phone, setPhone] = useState(model?.Phone);
    const [fax, setFax] = useState(model?.Fax);
    const [email, setEmail] = useState(model?.Email);
    const [startDate, setStartDate] = useState(model?.StartDate);

    const [campuses, setCampuses] = useState([]);
    const [campusOptions, setCampusOptions] = useState();
    const [placeholder, setPlaceholder] = useState("Select Campus");

    useEffect(() => {
        const runApi = () => {
            CallAPI('campus/list?organizationId=1').then(
                data => setCampuses(data.data)
            )
        }

        runApi();
    }, []);

    useEffect(() => {
        setCampusOptions(campuses.map(campus => { return { name: campus.Name, value: campus.Id } }));
        if(campusId) setPlaceholder(campusOptions&&campusOptions.find(opt=>opt.value === campusId)?.name);
    }, [campuses]);

    const saveHandler = () => {
        console.log(model)
        const payload = model ?
            {
                facultyId: model.Id,
                name,
                description,
                campusId,
                phone,
                fax,
                email,
                startDate,
            }
            :
            {
                name,
                description,
                campusId,
                phone,
                fax,
                email,
                startDate,
            };
        addNewFacultyHandler(payload);
    }
    return (
        <>
            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput label="Faculty Name" required value={name} setValue={setName} />
                </div>

                <div className="mb-2 col-6">
                    {campusOptions&&placeholder&&campusOptions.length>0 && <ComboBox options={campusOptions} placeholder={placeholder } itemSelectHandler={(opt)=>setCampusId(opt.value)}/>}
                </div>
            </div>

            <div className="row m-0">
                <div className="mb-2 col-12">
                    <FormInput type="text" value={description} setValue={setDescription} label="Description" />
                </div>
            </div>


            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput type="text" value={phone} setValue={setPhone} label="Phone" />
                </div>

                <div className="mb-2 col-6">
                    <FormInput type="text" value={fax} setValue={setFax} label="Fax" />
                </div>
            </div>

            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput type="email" value={email} setValue={setEmail} label="Email" />
                </div>

                <div className="mb-2 col-6">
                    <FormInput type="date" value={getDateFormated(startDate)} setValue={setStartDate} label="Start Date" />
                </div>
            </div>

            {/* <div className="row m-0">

                 <div className="mb-2 col-6">
                    <FormInput type="date" value={getDateFormated(endDate)} setValue={setEndDate} label="End Date" />
                </div> 
            </div> */}

            <div className="mt-3 px-2">
                <button className="butn col-12" onClick={saveHandler}>Save</button>
            </div>
        </>
    )
}

export default FacultyForm;