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
    public class FacultyController : ControllerBase
    {
        private readonly IGeneralRepository _generalRepository;
        public FacultyController(IGeneralRepository generalRepository)
        {
            _generalRepository = generalRepository;
        }
        [HttpGet("List")]
        public async Task<ActionResult<ResponseModel>> List([FromQuery] int? campusId = null)
        {
            return campusId == null ?
             Ok(await _generalRepository.ExecuteStoreProcedure("GetFaculty")) :
             Ok(await _generalRepository.ExecuteStoreProcedure("GetFaculty",new {CampusId = campusId}));
        }
        [HttpPost("Add")]
        public async Task<ActionResult<ResponseModel>> Add(FacultyRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) payload.UserId = Guid.Parse(userId);
            var addPayload = new
            {
                Name = payload.Name,
                Description = payload.Description,
                Phone = payload.Phone,
                Fax = payload.Fax,
                Email = payload.Email,
                StartDate = payload.StartDate,
                UserId = payload.UserId,
                CampusId = payload.CampusId,
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("AddFaculty", addPayload));
        }
        [HttpPost("Update")]
        public async Task<ActionResult<ResponseModel>> Update(FacultyRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) payload.UserId = Guid.Parse(userId);
            var updatePayload = new
            {
                Name = payload.Name,
                Description = payload.Description,
                Phone = payload.Phone,
                Fax = payload.Fax,
                Email = payload.Email,
                StartDate = payload.StartDate,
                UserId = payload.UserId,
                CampusId = payload.CampusId,
                FacultyId = payload.FacultyId
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("UpdateFaculty", updatePayload));
        }
        [HttpPost("Delete")]
        public async Task<ActionResult<ResponseModel>> Delete(int facultyId)
        {
            Guid uId = Guid.Empty;
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) uId = Guid.Parse(userId);
            var deletePayload = new
            {
                FacultyId = facultyId,
                userId = uId
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("DeleteFaculty", deletePayload));
        }
    }
}
