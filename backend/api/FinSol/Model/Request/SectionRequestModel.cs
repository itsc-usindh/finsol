using System.Diagnostics.Metrics;
using System.Numerics;

namespace FinSol.Model.Request
{
    public class SectionRequestModel : BaseModel
    {
        public int? SectionId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? DepartmentName { get; set; }
        public int DepartmentId { get; set; }
        public Guid? UserId { get; set; }
    }
}
