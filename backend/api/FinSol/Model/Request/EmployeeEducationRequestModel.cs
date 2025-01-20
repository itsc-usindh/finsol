using Microsoft.Identity.Client;

namespace FinSol.Model.Request
{
    public class EmployeeEducationRequestModel : BaseModel
    {
        public Guid? EmployeeId { get; set; }
        public string? DegreeTitle { get; set; }
        public string? Board { get; set; }
        public string? InistitueName { get; set; }
        public string? YearOfPassing { get; set; }
        public string? GradePercentage { get; set; }
        public int? TotalMarks { get; set; }
        public int? ObtainMarks { get; set; }
    }
}
