import React, { useState } from "react";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";

function EmployeeEducation() {
    const [degreeTitle, setDegreeTitle] = useState("");
    const [year, setYear] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [obtainedMarks, setObtainedMarks] = useState("");
    const [grade, setGrade] = useState("");
    const [institueName, setInistitueName] = useState("");

    const [educations, setEducations] = useState([]);
    const [educationsTable, setEducationsTable] = useState([]);

    const handleAddEducation = () => {
        setEducations((prev) => [...prev, {
            degreeTitle,
            institueName,
            year,
            totalMarks,
            obtainedMarks,
            grade,
        }]);

        setEducationsTable(educations.map(edu => {
            return {
                "Degree Title": edu.degreeTitle,
                "Inistitue Name": edu.institueName,
                "Year": edu.year,
                "Total Marks": edu.totalMarks,
                "Obtained Marks": edu.obtainedMarks,
                "Grade / Percentage": edu.grade,
            }
        }))
    };

    return (
        <>

            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput value={degreeTitle} setValue={setDegreeTitle} label="Degree Title" />
                </div>

                <div className="mb-2 col-6" >
                    <FormInput value={institueName} setValue={setInistitueName} label="Institute Name" />
                </div>
            </div>

            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput value={year} setValue={setYear} label="Degree Year" />
                </div>


                <div className="mb-2 col-6">
                    <FormInput value={totalMarks} setValue={setTotalMarks} label="Total Marks" />
                </div>

            </div>

            <div className="row m-0">

                <div className="mb-2 col-6">
                    <FormInput value={obtainedMarks} setValue={setObtainedMarks} label="Obtained Marks" />
                </div>


                <div className="mb-2 col-6">
                    <FormInput value={grade} setValue={setGrade} label="Grade and Percentage" />
                </div>
            </div>
            <button className="butn px-5" onClick={handleAddEducation}>
                Add
            </button>
            {/* {JSON.stringify(educations)} */}
            <h2>Educations</h2>

            {educations.length > 0 && <Table data={educationsTable} onDelete={(row) => { setEducationsTable(educationsTable.filter(edu => edu !== row)) }} />}
        </>
    );
}

export default EmployeeEducation;
