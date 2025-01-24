import { useEffect, useState } from "react";
import FormInput from "../../Components/FormInput";
import { getDateFormated } from "../../Utils/helper";
import ComboBox from "../../Components/ComboBox";
import CallAPI from "../../Utils/callApi";

const SectionForm = ({ addNewSectionHandler, model }) => {
    const [name, setName] = useState(model?.Name);
    const [description, setDescription] = useState(model?.Description);
    const [facultyId, setFacultyId] = useState(model?.FacultyId);

    const [faculties, setFaculties] = useState([]);
    const [facultyOptions, setFacultyOptions] = useState();
    const [placeholder, setPlaceholder] = useState("Select Faculty");
    const [departmentoptions, setDepartmentOptions] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    useEffect(() => {
        const runApi = () => {
            CallAPI('faculty/list').then(
                data => setFaculties(data.data)
            )
        }

        runApi();
    }, []);

    useEffect(() => {
        if(faculties.length>0)
        setFacultyOptions(faculties?.map(faculty => { return { name: faculty.Name, value: faculty.Id } }));
        if(facultyId) setPlaceholder(facultyOptions&&facultyOptions.find(opt=>opt.value === facultyId)?.name);
    }, [faculties]);

    useEffect(() => {
        if(facultyId)
        CallAPI("department/list?facultyId=" + facultyId).then((data) =>
            setDepartmentOptions(data.data.map((Department) => {
                return { name: Department.Name, value: Department.Id };
            }))
        );
    }, [facultyId]);

    const saveHandler = () => {
        console.log(model)
        const payload = model ?
            {
                sectionId: model.Id,
                name,
                description,
            }
            :
            {
                name,
                description,
            };
        addNewSectionHandler(payload);
    }
    return (
        <>

            <div className="row m-0">
                <div className="mb-2 col-6">
                    <ComboBox disable={!facultyOptions} options={facultyOptions} placeholder={"-- Select Faculty --"} itemSelectHandler={(opt) => setFacultyId(opt.value)} />
                </div>
                {/* department Title Dropdown */}

                <div className="mb-2 col-6">
                    <ComboBox options={departmentoptions} disable={!facultyId} placeholder={"-- Select Department --"} itemSelectHandler={(opt) => setDepartmentId(opt.value)} />
                </div>

                <div className="mb-2 col-6">
                    <FormInput type="text" value={name} setValue={setName} label="Name" />
                </div>

                <div className="mb-2 col-6">
                    <FormInput type="text" value={description} setValue={setDescription} label="Description" />
                </div>
            </div>


            <div className="mt-3 px-2">
                <button className="butn col-12" onClick={saveHandler}>Save</button>
            </div>
        </>
    )
}

export default SectionForm;