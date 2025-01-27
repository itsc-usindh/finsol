using FinSol.Model.Request;

namespace FinSol.Model.Response
{
    public class EmployeeResponseModel:BaseModel
    {
        public string? Campus { get; set; }
        public string? Faculty { get; set; }
        public string? Department { get; set; }
        public string? Section { get; set; }
        public string? Position { get; set; }
        public string? JobTitle { get; set; }
        public string? Name { get; set; }
        public string? FatherName { get; set; }
        public string? HusbandName { get; set; }
        public string? Surname { get; set; }
        public string? Title { get; set; }
        public string? Bank { get; set; }
        public string? AccountNo { get; set; }
        public string? AccountTitle { get; set; }
        public Nullable<DateTime> DateOfBirth { get; set; }
        public string? MailingAddress { get; set; }
        public string? NTNnumber { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
        public string? CNIC { get; set; }
        public string? ProfilePhotoUrl { get; set; }
        public string? Gender { get; set; }
        public string? Religion { get; set; }
        public Nullable<DateTime> AppointedOn { get; set; }
        public Nullable<DateTime> RetiredOn { get; set; }
        public Nullable<DateTime> DiedOnService { get; set; }
        public Nullable<DateTime> Resign { get; set; }
        public Nullable<DateTime> Terminated { get; set; }
        public double MinPay {  get; set; }
        public double AnnualIncreament {  get; set; }
        public double MaxPay {  get; set; }
        public int Stages {  get; set; }
        public int Provisions {  get; set; }
        public List<EmployeeEducationRequestModel> EducationRecords { get; set; }
        public int? CampusId { get; set; }
        public int? FacultyId { get; set; }
        public int? DepartmentId { get; set; }
        public int? SectionId { get; set; }
        public Guid PositionId { get; set; }
        public Guid JobTitleId { get; set; }
    }
}
