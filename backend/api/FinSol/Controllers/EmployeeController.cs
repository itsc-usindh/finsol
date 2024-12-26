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
        [HttpPost("Add")]
        public async Task<ActionResult<ResponseModel>> Add(EmployeeRequestModel payload)
        {
            return Ok(await _employeeRepository.AddEmployee(payload));
        }
        [HttpGet("List")]
        public async Task<IEnumerable<EmployeeResponseModel>> List([FromQuery] int maxRow = 100)
        {
            return await _employeeRepository.GetAllEmployees(maxRow);
        }
    }
}
