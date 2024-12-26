namespace FinSol.Model.Response
{
    public class EmployeeResponseModel:BaseModel
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
        public DateTime AppointedOn { get; set; }
        public DateTime RetiredOn { get; set; }
        public double MinPay {  get; set; }
        public double AnnualIncreament {  get; set; }
        public double MaxPay {  get; set; }
        public int Stages {  get; set; }
        public int Provisions {  get; set; }
    }
}
