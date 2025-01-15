import { useEffect, useState } from "react";
import FormInput from "../../Components/FormInput";
import { getDateFormated } from "../../Utils/helper";
import ComboBox from "../../Components/ComboBox";
import CallAPI from "../../Utils/callApi";

const DepartmentForm = ({ addNewDepartmentHandler, model }) => {
    const [name, setName] = useState(model?.Name);
    const [code, setCode] = useState(model?.Code);
    const [description, setDescription] = useState(model?.Description);
    const [facultyId, setFacultyId] = useState(model?.FacultyId);
    const [phone, setPhone] = useState(model?.Phone);
    const [fax, setFax] = useState(model?.Fax);
    const [email, setEmail] = useState(model?.Email);
    const [startDate, setStartDate] = useState(model?.StartDate);

    const [faculties, setFaculties] = useState([]);
    const [facultyOptions, setFacultyOptions] = useState();
    const [placeholder, setPlaceholder] = useState("Select Faculty");

    useEffect(() => {
        const runApi = () => {
            CallAPI('faculty/list').then(
                data => setFaculties(data.data)
            )
        }

        runApi();
    }, []);

    useEffect(() => {
        setFacultyOptions(faculties.map(faculty => { return { name: faculty.Name, value: faculty.Id } }));
        if(facultyId) setPlaceholder(facultyOptions&&facultyOptions.find(opt=>opt.value === facultyId)?.name);
    }, [faculties]);

    const saveHandler = () => {
        console.log(model)
        const payload = model ?
            {
                departmentId: model.Id,
                name,
                code,
                description,
                facultyId,
                phone,
                fax,
                email,
                startDate,
            }
            :
            {
                name,
                description,
                code,
                facultyId,
                phone,
                fax,
                email,
                startDate,
            };
        addNewDepartmentHandler(payload);
    }
    return (
        <>
            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput label="Department Name" required value={name} setValue={setName} />
                </div>

                <div className="mb-2 col-6">
                    {facultyOptions&&placeholder&&facultyOptions.length>0 && <ComboBox options={facultyOptions} placeholder={placeholder } itemSelectHandler={(opt)=>setFacultyId(opt.value)}/>}
                </div>
            </div>

            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput type="text" value={code} setValue={setCode} label="Code" />
                </div>

                <div className="mb-2 col-6">
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

export default DepartmentForm;