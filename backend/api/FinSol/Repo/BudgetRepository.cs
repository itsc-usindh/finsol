using Dapper;
using FinSol.Context;
using FinSol.IRepo;
using FinSol.Model.Response;

namespace FinSol.Repo
{
    public class BudgetRepository : IBudgetRepository
    {
        private readonly DapperContext _dapperContext;
        public BudgetRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<IEnumerable<BudgetResponseModel>> List(int maxRows)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "GetBudgetList";

                var parameters = new
                {
                    MaxRows = maxRows
                };


                var budget = await connection.QueryAsync<BudgetResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return budget.ToList();
            }
        }

        public async Task<ResponseModel> UpdateProvision(Guid id, int provisions)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "UpdateProvisionInBudgetRevision";

                var parameters = new
                {
                    Id = id,
                    Provisions = provisions
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }
    }
}
