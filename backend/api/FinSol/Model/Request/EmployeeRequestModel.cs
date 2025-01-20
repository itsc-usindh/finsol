using Microsoft.Identity.Client;

namespace FinSol.Model.Request
{
    public class EmployeeRequestModel : BaseModel
    {
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
    }
}
