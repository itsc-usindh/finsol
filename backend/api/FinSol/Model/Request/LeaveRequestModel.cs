using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FinSol.Model.Request
{
    public class LeaveRequestModel : BaseModel
    {

        public Guid? EmployeeId { get; set; }
        public string? Reason { get; set; }
        public string? LeaveType { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? FromDate { get; set; }
        public string? PayStatus { get; set; }
        public string? Remarks { get; set; }
        public string? LeaveStatus { get; set; }
    }
}
