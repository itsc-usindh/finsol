using System.Diagnostics.Metrics;
using System.Numerics;

namespace FinSol.Model.Request
{
    public class DepartmentRequestModel : BaseModel
    {
        public int? DepartmentId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int FacultyId { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public DateTime? StartDate { get; set; }
        public Guid? UserId { get; set; }
    }
}
