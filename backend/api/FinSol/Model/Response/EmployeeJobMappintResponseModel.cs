using FinSol.Model.Request;

namespace FinSol.Model.Response
{
    public class EmployeeJobMappintResponseModel : BaseModel
    {
        public string? Campus { get; set; }
        public string? Faculty { get; set; }
        public string? Department { get; set; }
        public string? Section { get; set; }
        public string? Position { get; set; }
        public string? JobTitle { get; set; }
        public string? Name { get; set; }
        public int? CampusId { get; set; }
        public int? FacultyId { get; set; }
        public int? DepartmentId { get; set; }
        public int? SectionId { get; set; }
        public Guid PositionId { get; set; }
        public Guid JobTitleId { get; set; }
    }
}
