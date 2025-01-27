using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Identity.Client;

namespace FinSol.Model.Request
{
    public class EmployeeJobMappintRequestModel : BaseModel
    {
        public Guid? EmployeeId { get; set; }
        public Guid? JobTitleDptMappId { get; set; }
        public Guid? BorrowedJobTitleDptMappId { get; set; }
        public bool? IsTransfered { get; set; }
        public bool? IsPromoted { get; set; }
    }
}
