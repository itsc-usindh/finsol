using System.Diagnostics.Metrics;
using System.Net;
using System.Numerics;
using System.Security.Claims;
using FinSol.IRepo;
using FinSol.Model.Request;
using FinSol.Model.Response;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FinSol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class DepartmentController : ControllerBase
    {
        private readonly IGeneralRepository _generalRepository;
        public DepartmentController(IGeneralRepository generalRepository)
        {
            _generalRepository = generalRepository;
        }
        [HttpGet("List")]
        public async Task<ActionResult<ResponseModel>> List()
        {
            return Ok(await _generalRepository.ExecuteStoreProcedure("GetDepartment"));
        }
        [HttpPost("Add")]
        public async Task<ActionResult<ResponseModel>> Add(DepartmentRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) payload.UserId = Guid.Parse(userId);
            var addPayload = new
            {
                Name = payload.Name,
                Code = payload.Code,
                Description = payload.Description,
                FacultyId = payload.FacultyId,
                Phone = payload.Phone,
                Fax = payload.Fax,
                Email = payload.Email,
                StartDate = payload.StartDate,
                UserId = payload.UserId,
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("AddDepartment", addPayload));
        }
        [HttpPost("Update")]
        public async Task<ActionResult<ResponseModel>> Update(DepartmentRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) payload.UserId = Guid.Parse(userId);
            var updatePayload = new
            {
                Name = payload.Name,
                Code = payload.Code,
                Description = payload.Description,
                FacultyId = payload.FacultyId,
                Phone = payload.Phone,
                Fax = payload.Fax,
                Email = payload.Email,
                StartDate = payload.StartDate,
                UserId = payload.UserId,
                DepartmentId = payload.DepartmentId
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("UpdateDepartment", updatePayload));
        }
        [HttpPost("Delete")]
        public async Task<ActionResult<ResponseModel>> Delete(int departmentId)
        {
            Guid uId = Guid.Empty;
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) uId = Guid.Parse(userId);
            var deletePayload = new
            {
                DepartmentId = departmentId,
                userId = uId
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("DeleteDepartment", deletePayload));
        }
    }
}
