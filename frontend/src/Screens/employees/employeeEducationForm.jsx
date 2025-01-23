import React, { useEffect, useState } from "react";
import FormInput from "../../Components/FormInput";
import Table from "../../Components/Table";
import CallAPI from "../../Utils/callApi";

function EmployeeEducation({ employeeId, model, closeSlideIn }) {
  const [degreeTitle, setDegreeTitle] = useState(model?.degreeTitle ?? "");
  const [yearOfPassing, setYearOfPassing] = useState(
    model?.yearOfPassing ?? ""
  );
  const [totalMarks, setTotalMarks] = useState(model?.totalMarks ?? "");
  const [obtainMarks, setObtainMarks] = useState(model?.obtainMarks ?? "");
  const [gradePercentage, setgradePercentage] = useState(
    model?.gradePercentage ?? ""
  );
  const [instituteName, setInstituteName] = useState(
    model?.instituteName ?? ""
  );
  const [board, setBoard] = useState(model?.board ?? "");

  const [educations, setEducations] = useState([]);
  const [educationsTable, setEducationsTable] = useState([]);

  const handleAddEducation = () => {
    if (educations.some((education) => education.degreeTitle === degreeTitle)) {
      return;
    }
    setEducations((prev) => [
      ...prev,
      {
        employeeId,
        degreeTitle,
        instituteName,
        board,
        yearOfPassing,
        totalMarks,
        obtainMarks,
        gradePercentage,
      },
    ]);

    setDegreeTitle("");
    setYearOfPassing("");
    setTotalMarks("");
    setObtainMarks("");
    setgradePercentage("");
    setInstituteName("");
    setBoard("");
  };
  const handleSaveEducation =async () => {
    if (!model) {
      if (educations.length > 0)
        educations.forEach((education) =>
          CallAPI("Employee/AddEmployeeEducation", "post", education)
        );
    } else {
      const payload = {
        id:model.id, 
        employeeId,
        degreeTitle,
        instituteName,
        board,
        gradePercentage,
        totalMarks,
        obtainMarks,
        yearOfPassing,
      };
    //   console.log(payload)
      const res = await CallAPI("Employee/UpdateEmployeeEducation", "post", payload);
      if(res.status && closeSlideIn){
        closeSlideIn(false);
      }
    }
  };
  useEffect(() => {
    setEducationsTable(
      educations.map((edu) => {
        return {
          "Degree Title": edu.degreeTitle,
          "Inistitue Name": edu.instituteName,
          board: edu.board,
          "year Of Passing": edu.yearOfPassing,
          "Total Marks": edu.totalMarks,
          "Obtained Marks": edu.obtainMarks,
          "gradePercentage / Percentage": edu.gradePercentage,
        };
      })
    );
  }, [educations]);

  return (
    <>
      <div className="mt-2 row m-0">
        <div className="mb-2 col-6 col-lg-4">
          <FormInput
            value={degreeTitle}
            setValue={setDegreeTitle}
            label="Degree Title"
          />
        </div>

        <div className="mb-2 col-6 col-lg-4">
          <FormInput
            value={instituteName}
            setValue={setInstituteName}
            label="Institute Name"
          />
        </div>

        <div className="mb-2 col-6 col-lg-4">
          <FormInput value={board} setValue={setBoard} label="Board" />
        </div>

        <div className="mb-2 col-6 col-lg-4">
          <FormInput
            value={yearOfPassing}
            setValue={setYearOfPassing}
            label="Degree Year"
          />
        </div>

        <div className="mb-2 col-6 col-lg-4">
          <FormInput
            value={totalMarks}
            setValue={setTotalMarks}
            label="Total Marks"
          />
        </div>

        <div className="mb-2 col-6 col-lg-4">
          <FormInput
            value={obtainMarks}
            setValue={setObtainMarks}
            label="Obtained Marks"
          />
        </div>

        <div className="mb-2 col-6 col-lg-4">
          <FormInput
            value={gradePercentage}
            setValue={setgradePercentage}
            label="Grade and Percentage"
          />
        </div>
      </div>

      <div className="row m-0 mb-3">
        <div className="col-12">
          {!model ? (
            <button className="butn px-5 col-12" onClick={handleAddEducation}>
              Add
            </button>
          ) : (
            <button className="butn px-5 col-12" onClick={handleSaveEducation}>
              Save
            </button>
          )}
        </div>
      </div>
      <hr />

      {educationsTable.length > 0 && (
        <>
          <Table
            isSmall
            noPagination
            isDark
            title="Education Records"
            data={educationsTable}
            onDelete={(row) => {
              setEducationsTable(educationsTable.filter((edu) => edu !== row));
            }}
          />
          <div className="row m-0 mb-3">
            <div className="col-12">
              <button
                className="butn px-5 col-12"
                onClick={handleSaveEducation}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeEducation;
