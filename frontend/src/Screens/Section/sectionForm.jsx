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

    useEffect(() => {
        const runApi = () => {
            CallAPI('department/list').then(
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