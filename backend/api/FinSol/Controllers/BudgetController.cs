using FinSol.IRepo;
using FinSol.Model.Response;
using Microsoft.AspNetCore.Mvc;

namespace FinSol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetRepository _budgetRepository;

        public BudgetController(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }
        [HttpGet("List")]
        public async Task<IEnumerable<BudgetResponseModel>> List([FromQuery] int maxRow = 100)
        {
            return await _budgetRepository.List(maxRow);
        }
        [HttpPost("UpdateProvision")]
        public async Task<ResponseModel> UpdateProvision([FromQuery] Guid id,[FromQuery] int provisions)
        {
            return await _budgetRepository.UpdateProvision(id,provisions);
        }
    }
}
