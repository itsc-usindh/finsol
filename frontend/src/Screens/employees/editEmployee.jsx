import React, { useEffect, useState } from "react";
import FormInput from "../../Components/FormInput";
import Topbar from "../../Components/Topbar";
import EmployeeEducation from "./employeeEducationForm";
import CallAPI from "../../Utils/callApi";
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import SlideIn from "../../Components/SlideIn";
import Table from "../../Components/Table";

function EditEmployee() {
  const { search } = useLocation();
  const [query, setQuery] = useSearchParams(search);
  const navigation = useNavigate();

  const [campus, setCampus] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [position, setPosition] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [name, setname] = useState("");
  const [faherName, setFatherName] = useState("");
  const [husbandName, setHusbandName] = useState("");
  const [surname, setSurname] = useState("");
  const [title, setTitle] = useState("");
  const [bank, setBank] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({});
  const [mailingAddress, setMailingAddress] = useState("");
  const [ntnNumber, setNtnNumber] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [cnic, setCnic] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [appointedOn, setAppointedOn] = useState({});
  const [retiredOn, setRetiredOn] = useState({});
  const [diedOnService, setDiedOnService] = useState({});
  const [resign, setResign] = useState({});
  const [terminated, setTerminated] = useState({});
  const [employee, setEmployee] = useState("");
  const [educationRecords, setEducationRecords] = useState();
  const [employeeId, setEmployeesId] = useState(query.get("employeeId"));
  const [selectedEducation,setSelectedEducation] = useState();
  const [showEditSlideIn,setShowEditSlideIn] = useState(false);


  const [showSlideIn, setShowSlideIn] = useState("");

  const runApi= () => 
    CallAPI("Employee/GetEmployeeById?employeeId=" + employeeId).then(
      (data) => setEmployee(data)
    );

  useEffect(() => {
    runApi();
  }, [employeeId]);


  useEffect(() => {
    if (!employee) return;
    setCampus(employee.campus);
    setFaculty(employee.faculty);
    setDepartment(employee.department);
    setSection(employee.section);
    setPosition(employee.position);
    setJobTitle(employee.jobTitle);
    setname(employee.name);
    setFatherName(employee.faherName);
    setHusbandName(employee.husbandName);
    setSurname(employee.surname);
    setTitle(employee.title);
    setBank(employee.bank);
    setAccountNo(employee.accountNo);
    setAccountTitle(employee.accountTitle);
    setDateOfBirth(employee.dateOfBirth);
    setMailingAddress(employee.mailingAddress);
    setNtnNumber(employee.ntnNumber);
    setEmail(employee.email);
    setContact(employee.contact);
    setCnic(employee.cnic);
    setProfilePhotoUrl(employee.profilePhotoUrl);
    setGender(employee.gender);
    setReligion(employee.religion);
    setAppointedOn(employee.appointedOn);
    setRetiredOn(employee.retiredOn);
    setDiedOnService(employee.diedOnService);
    setResign(employee.resign);
    setTerminated(employee.terminated);

    const _er = employee?.educationRecords?.map(er=>{
        return{
          "Degree Title": er.degreeTitle,
          "Inistitue Name": er.instituteName,
          board: er.board,
          "year Of Passing": er.yearOfPassing,
          "Total Marks": er.totalMarks,
          "Obtained Marks": er.obtainMarks,
          "grade / %": er.gradePercentage,
        }
    })
    setEducationRecords(_er)
  }, [employee]);

  const saveHandler = async () => {
     const payload = {
        id:employeeId,
      name,
      faherName,
      husbandName,
      surname,
      title,
      bank,
      accountNo,
      accountTitle,
      dateOfBirth,
      mailingAddress,
      ntnNumber,
      email,
      contact,
      cnic,
      profilePhotoUrl,
      gender,
      religion,
      appointedOn,
      retiredOn,
      diedOnService,
      resign,
      terminated,
    };
   
    const res = await CallAPI("Employee/Update","POST",payload);
    
    if(res.status)
      navigation('/listEmployee')
    
    console.log(payload)
};

const handleCloseSlideIn = () => {
    setShowEditSlideIn(false);
    runApi();
    setSelectedEducation(null)
}

  return (
    <>
      {/* Topbar component */}
      <Topbar title={"Edit"} />

      <SlideIn
        show={showSlideIn}
        setShowSlideIn={setShowSlideIn}
        title="Employee Add"
      >
        <EmployeeEducation employeeId={employeeId}/>
      </SlideIn>

      <SlideIn
        show={showEditSlideIn}
        setShowSlideIn={setShowEditSlideIn}
        title="Employee Edit"
      >
        {selectedEducation&&<EmployeeEducation employeeId={employeeId} model={selectedEducation} closeSlideIn={handleCloseSlideIn}/>}
      </SlideIn>

      <div className="px-3">
        <div className="box floating-heading">
          <h2 className="ps-2 mb-4 heading">Edit Employee - {name}</h2>
          <div className="d-flex justify-content-end mb-4">
            <button className="butn" onClick={(e) => {setShowSlideIn(true)}}>
              Add Education
            </button>
          </div>
          {/* Disable input fields  */}
          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Campus"
                required
                value={campus}
                setValue={setCampus}
                disabled={true}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Faculty"
                required
                value={faculty}
                setValue={setFaculty}
                disabled={true}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Department"
                required
                value={department}
                setValue={setDepartment}
                disabled={true}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Section"
                required
                value={section}
                setValue={setSection}
                disabled={true}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Position"
                required
                value={position}
                setValue={setPosition}
                disabled={true}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Job Title"
                required
                value={jobTitle}
                setValue={setJobTitle}
                disabled={true}
              />
            </div>
          </div>
          <hr />

          {/* Employe 22 fields start from here  */}

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Employee Name"
                required
                value={name}
                setValue={setname}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Father Name"
                required
                value={faherName}
                setValue={setFatherName}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Husband Name"
                required
                value={husbandName}
                setValue={setHusbandName}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Surname"
                required
                value={surname}
                setValue={setSurname}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Title"
                required
                value={title}
                setValue={setTitle}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Bank"
                required
                value={bank}
                setValue={setBank}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Account No"
                required
                value={accountNo}
                setValue={setAccountNo}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Account Title"
                required
                value={accountTitle}
                setValue={setAccountTitle}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                type="date"
                label="Date of Birth"
                required
                value={dateOfBirth}
                setValue={setDateOfBirth}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Mailing Address"
                required
                value={mailingAddress}
                setValue={setMailingAddress}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="NTN Number"
                required
                value={ntnNumber}
                setValue={setNtnNumber}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Email"
                required
                value={email}
                setValue={setEmail}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Contact"
                required
                value={contact}
                setValue={setContact}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="CNIC"
                required
                value={cnic}
                setValue={setCnic}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Profile Photo"
                required
                value={profilePhotoUrl}
                setValue={setProfilePhotoUrl}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                label="Gender"
                required
                value={gender}
                setValue={setGender}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                label="Religion"
                required
                value={religion}
                setValue={setReligion}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                type="date"
                label="Appointed On"
                required
                value={appointedOn}
                setValue={setAppointedOn}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                type="date"
                label="Retired on"
                required
                value={retiredOn}
                setValue={setRetiredOn}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                type="date"
                label="Died On Service"
                required
                value={diedOnService}
                setValue={setDiedOnService}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="mb-2 col-6">
              <FormInput
                type="date"
                label="Resign"
                required
                value={resign}
                setValue={setResign}
              />
            </div>
            <div className="mb-2 col-6">
              <FormInput
                type="date"
                label="terminated"
                required
                value={terminated}
                setValue={setTerminated}
              />
            </div>
          </div>

          <div className="ms-auto col-3 col-md-1 mt-3">
            <button className="butn col-12" onClick={saveHandler}>
              Save
            </button>
          </div>
          
          <hr />
          {educationRecords&&(
            <Table
              isSmall
              noPagination
              isDark
              title="Education Records"
              onView={()=>{}}
              onEdit={row=>{
                  setSelectedEducation(employee.educationRecords.find(er=>er.degreeTitle === row["Degree Title"]));
                  console.log(selectedEducation)
                setShowEditSlideIn(true);
            }}
              data={educationRecords}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default EditEmployee;
