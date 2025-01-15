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
    public class CampusController : ControllerBase
    {
        private readonly IGeneralRepository _generalRepository;
        public CampusController(IGeneralRepository generalRepository)
        {
            _generalRepository = generalRepository;
        }
        [HttpGet("List")]
        public async Task<ActionResult<ResponseModel>> List([FromQuery] string organizationId)
        {
            return Ok(await _generalRepository.ExecuteStoreProcedure("GetCampus", new { OrganizationId = organizationId }));
        }
        [HttpPost("Add")]
        public async Task<ActionResult<ResponseModel>> Add(CampusRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) payload.UserId = Guid.Parse(userId);
            var addPayload = new
            {
                Name = payload.Name,
                Description = payload.Description,
                OrganizationId = payload.OrganizationId,
                Country = payload.Country,
                State = payload.State,
                City = payload.City,
                Address = payload.Address,
                Phone = payload.Phone,
                Fax = payload.Fax,
                Email = payload.Email,
                StartDate = payload.StartDate,
                UserId = payload.UserId,
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("AddCampus", addPayload));
        }
        [HttpPost("Update")]
        public async Task<ActionResult<ResponseModel>> Update(CampusRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) payload.UserId = Guid.Parse(userId);
            var updatePayload = new
            {
                Name = payload.Name,
                Description = payload.Description,
                OrganizationId = payload.OrganizationId,
                Country = payload.Country,
                State = payload.State,
                City = payload.City,
                Address = payload.Address,
                Phone = payload.Phone,
                Fax = payload.Fax,
                Email = payload.Email,
                StartDate = payload.StartDate,
                UserId = payload.UserId,
                CampusId = payload.CampusId
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("UpdateCampus", updatePayload));
        }
        [HttpPost("Delete")]
        public async Task<ActionResult<ResponseModel>> Delete(int campusId)
        {
            Guid uId = Guid.Empty;
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) uId = Guid.Parse(userId);
            var deletePayload = new
            {
                CampusId = campusId,
                userId = uId
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("DeleteCampus", deletePayload));
        }
    }
}
