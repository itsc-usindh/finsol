using FinSol.IRepo;
using FinSol.Model.Request;
using FinSol.Model.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinSol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        #region Employee
        [HttpPost("AddFresh")]
        public async Task<ActionResult<ResponseModel>> AddFresh(EmployeeRequestModel payload)
        {
            //payload.CreatedBy = userId
            return Ok(await _employeeRepository.AddEmployee_Fresh(payload));
        }
        [HttpPost("Add")]
        public async Task<ActionResult<ResponseModel>> Add(EmployeeRequestModel payload)
        {
            //payload.CreatedBy = userId
            return Ok(await _employeeRepository.AddEmployee(payload));
        }
        [HttpGet("GetEmployeeById")]
        public async Task<ActionResult<ResponseModel>> GetEmployeeById([FromQuery] Guid employeeId)
        {
            return Ok(await _employeeRepository.GetEmployeeById(employeeId));
        }
        [HttpGet("List")]
        public async Task<IEnumerable<EmployeeResponseModel>> List([FromQuery] int maxRow = 100)
        {
            return await _employeeRepository.GetAllEmployees(maxRow);
        }
        [HttpPost("Update")]
        public async Task<ActionResult<ResponseModel>> Update(EmployeeRequestModel payload)
        {
            //payload.ModifiedBy = userid
            return Ok(await _employeeRepository.UpdateEmployee(payload));
        }
        [HttpPost("Delete")]
        public async Task<ActionResult<ResponseModel>> Delete([FromQuery] Guid Id)
        {
            // add user id from claims when login is done
            return Ok(await _employeeRepository.DeleteEmployee(Id, Guid.Empty));
        }
        #endregion

        #region  Employee Education

        [HttpPost("AddEmployeeEducation")]
        public async Task<ActionResult<ResponseModel>> AddEmployeeEducation(EmployeeEducationRequestModel payload)
        {
            return Ok(await _employeeRepository.AddEmployeeEducation(payload));
        }
        [HttpGet("ListEmployeeEducation")]
        public async Task<IEnumerable<EmployeeEducationRequestModel>> ListEmployeeEducation([FromQuery] Guid emplyeeId)
        {
            return await _employeeRepository.GetEmployeeEducations(emplyeeId);
        }
        [HttpPost("UpdateEmployeeEducation")]
        public async Task<ActionResult<ResponseModel>> UpdateEmployeeEducation(EmployeeEducationRequestModel payload)
        {
            return Ok(await _employeeRepository.UpdateEmployeeEducation(payload));
        }
        [HttpPost("DeleteEmployeeEducation")]
        public async Task<ActionResult<ResponseModel>> DeleteEmployeeEducation([FromQuery] Guid Id)
        {
            // add user id from claims when login is done
            return Ok(await _employeeRepository.DeleteEmployeeEducation(Id, Guid.Empty));
        }
        #endregion

        #region  Employee Leaves
        [HttpPost("ApplyForLeave")]
        public async Task<ActionResult<ResponseModel>> ApplyForLeave(LeaveRequestModel payload)
        {
            return Ok(await _employeeRepository.ApplyForLeave(payload));
        }
        [HttpGet("GetEmployeeLeaves")]
        public async Task<IEnumerable<LeaveRequestModel>> GetEmployeeLeaves([FromQuery] Guid emplyeeId)
        {
            return await _employeeRepository.GetEmployeeLeaves(emplyeeId);
        }
        #endregion

        #region Transfer
        [HttpGet("GetEmployeeTransferHistory")]
        public async Task<IEnumerable<EmployeeJobMappintResponseModel>> GetEmployeeTransferHistory([FromQuery] Guid employeeId)
        {
            //payload.CreatedBy = userId
            return (await _employeeRepository.GetEmployeeTransferHistory(employeeId));
        }
        [HttpPost("TransferEmployee")]
        public async Task<ActionResult<ResponseModel>> TransferEmployee(EmployeeJobMappintRequestModel payload)
        {
            return Ok(await _employeeRepository.TransferEmployee(payload));
        }
        #endregion

        #region Promote
        [HttpGet("GetEmployeePromoteHistory")]
        public async Task<IEnumerable<EmployeeJobMappintResponseModel>> GetEmployeePromoteHistory([FromQuery] Guid employeeId)
        {
            //payload.CreatedBy = userId
            return (await _employeeRepository.GetEmployeePromoteHistory(employeeId));
        }
        [HttpPost("PromoteEmployee")]
        public async Task<ActionResult<ResponseModel>> PromoteEmployee(EmployeeJobMappintRequestModel payload)
        {
            return Ok(await _employeeRepository.PromoteEmployee(payload));
        }

        #endregion
    }
}
