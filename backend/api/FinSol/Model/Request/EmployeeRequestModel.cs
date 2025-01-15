namespace FinSol.Model.Request
{
    public class EmployeeRequestModel:BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string CNIC { get; set; }
        public string ProfilePhotoUrl { get; set; }
        public string Gender { get; set; }
        public string Religion { get; set; }
        public Guid PositionId { get; set; }
        public DateTime? AppointedOn { get; set; }
        public Nullable<DateTime> RetiredOn { get; set; }
    }
}
