using System.Security.Claims;
using FinSol.IRepo;
using FinSol.Model.Request;
using FinSol.Model.Response;
using Microsoft.AspNetCore.Mvc;

namespace FinSol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class SectionController : ControllerBase
    {
        private readonly IGeneralRepository _generalRepository;
        public SectionController(IGeneralRepository generalRepository)
        {
            _generalRepository = generalRepository;
        }
        [HttpGet("List")]
        public async Task<ActionResult<ResponseModel>> List()
        {
            return Ok(await _generalRepository.ExecuteStoreProcedure("GetSection"));
        }
        [HttpPost("Add")]
        public async Task<ActionResult<ResponseModel>> Add(SectionRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) payload.UserId = Guid.Parse(userId);
            var addPayload = new
            {
                Name = payload.Name,
                Description = payload.Description,
                DepartmentId = payload.DepartmentId,
                UserId = payload.UserId,
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("AddSection", addPayload));
        }
        [HttpPost("Update")]
        public async Task<ActionResult<ResponseModel>> Update(SectionRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) payload.UserId = Guid.Parse(userId);
            var updatePayload = new
            {
                Name = payload.Name,
                Description = payload.Description,
                DepartmentId = payload.DepartmentId,
                UserId = payload.UserId,
                SectionId = payload.SectionId
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("UpdateSection", updatePayload));
        }
        [HttpPost("Delete")]
        public async Task<ActionResult<ResponseModel>> Delete(int departmentId)
        {
            Guid uId = Guid.Empty;
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId != null) uId = Guid.Parse(userId);
            var deletePayload = new
            {
                SectionId = departmentId,
                userId = uId
            };
            return Ok(await _generalRepository.ExecuteStoreProcedure("DeleteSection", deletePayload));
        }
    }
}
