using FinSol.Model.Response;

namespace FinSol.IRepo
{
    public interface IBudgetRepository
    {
        Task<IEnumerable<BudgetResponseModel>> List(int maxRows);
        Task<ResponseModel> UpdateProvision(Guid id, int provisions);
    }
}
