import React, { useEffect, useState } from "react";
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
    };

    useEffect(()=>{
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
    },[educations])

    return (
        <>

            <div className="row m-0">
                <div className="mb-2 col-6 col-lg-4">
                    <FormInput value={degreeTitle} setValue={setDegreeTitle} label="Degree Title" />
                </div>

                <div className="mb-2 col-6 col-lg-4" >
                    <FormInput value={institueName} setValue={setInistitueName} label="Institute Name" />
                </div>
                
                <div className="mb-2 col-6 col-lg-4">
                    <FormInput value={year} setValue={setYear} label="Degree Year" />
                </div>


                <div className="mb-2 col-6 col-lg-4">
                    <FormInput value={totalMarks} setValue={setTotalMarks} label="Total Marks" />
                </div>
                
                <div className="mb-2 col-6 col-lg-4">
                    <FormInput value={obtainedMarks} setValue={setObtainedMarks} label="Obtained Marks" />
                </div>


                <div className="mb-2 col-6 col-lg-4">
                    <FormInput value={grade} setValue={setGrade} label="Grade and Percentage" />
                </div>
            </div>

            <div className="row m-0 mb-3">
                <div className="col-12">
                    <button className="butn px-5 col-12" onClick={handleAddEducation}>
                        Add
                    </button>
                </div>
            </div>
            {/* {JSON.stringify(educations)} */}
            <hr/>

            {educationsTable.length > 0 && 
            <>
                <Table isSmall noPagination isDark title="Education Records" data={educationsTable} onDelete={(row) => { setEducationsTable(educationsTable.filter(edu => edu !== row)) }} />
                    
                <div className="row m-0 mb-3">
                    <div className="col-12">
                        <button className="butn px-5 col-12" onClick={handleAddEducation}>
                            Save
                        </button>
                    </div>
                </div>
            </>
            }

            
        </>
    );
}

export default EmployeeEducation;
