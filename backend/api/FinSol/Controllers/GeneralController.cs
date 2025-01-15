using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FinSol.IRepo;
using FinSol.Model.Response;
using System.Security.Claims;
using FinSol.Model.Request;
using System.Text.Json;

namespace FinSol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class GeneralController : ControllerBase
    {
        private readonly IGeneralRepository _organizationRepository;
        private readonly IGeneralRepository _generalRepository;

        public GeneralController(IGeneralRepository organizationRepository, IGeneralRepository generalRepository)
        {
            _organizationRepository = organizationRepository;
            _generalRepository = generalRepository;
        }

        [HttpGet("GetOrganization")]
        public async Task<IEnumerable<OrganizationResponseModel>> GetOrganization()
        {
            var organizations = await _organizationRepository.GetOrganization();

            return organizations;
        }

        [HttpGet("GetOrganizationById/{id}")]
        public async Task<OrganizationResponseModel> GetOrganizationById(int Id)
        {
            var organizations = await _organizationRepository.GetOrganizationById(Id);

            return organizations;
        }
        [HttpGet("GetDepartments")]
        public async Task<IEnumerable<DepartmentResponseModel>> GetDepartments()
        {
            var departments = await _organizationRepository.GetDepartments();

            return departments;
        }
        [HttpGet("GetStatus")]
        public async Task<IEnumerable<StatusResponseModel>> GetStatus()
        {
            var status = await _organizationRepository.GetStatus();

            return status;
        }
        [HttpGet("GetPositions")]
        public async Task<IEnumerable<PositionResponseModel>> GetPositions([FromQuery] int maxRows = 100)
        {
            var status = await _organizationRepository.GetPositions(maxRows);

            return status;
        } 
        [HttpPost("ExecuteSp")]
        public async Task<ResponseModel> ExecuteSp(ExecuteSpRequestModel payload)
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            
            var parameters = payload.parameters == null ? null : JsonSerializer.Deserialize<object>(payload.parameters);
            if (parameters is Dictionary<string, object> dictParameters && userId != null)
            {
                // Add UserId to the dictionary
                dictParameters["UserId"] = userId;
            }
            var res = (await _generalRepository.ExecuteStoreProcedure(payload.spName, parameters));
            return res;
        }
    }
}
