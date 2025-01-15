using System.Diagnostics.Metrics;
using System.Numerics;

namespace FinSol.Model.Request
{
    public class CampusRequestModel : BaseModel
    {
        public int? CampusId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int OrganizationId { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Guid? UserId { get; set; }
    }
}
