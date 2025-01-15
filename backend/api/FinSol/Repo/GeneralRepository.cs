using Dapper;
using FinSol.Context;
using FinSol.IRepo;
using FinSol.Model.Response;

namespace FinSol.Repo
{
    public class GeneralRepository : IGeneralRepository
    {
        private readonly DapperContext _dapperContext;

        public GeneralRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<ResponseModel> ExecuteStoreProcedure(string spName, object parameters = null)
        {
            using (var connection = _dapperContext.CreateConnection())
            {

                var Data = await connection.QueryAsync<object>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                ResponseModel res = new()
                {
                    Status = true,
                    Msg = spName + ": Success...",
                    Data = Data.ToList()
                };

                return res;
            }
        }
        public async Task<IEnumerable<OrganizationResponseModel>> GetOrganization()
        {
            string query = "SELECT * FROM organizations WHERE isActive = 1";

            using (var connection = _dapperContext.CreateConnection())
            {
                var res = await connection.QueryAsync<OrganizationResponseModel>(query);

                return res.ToList();
            }
        }
        public async Task<OrganizationResponseModel> GetOrganizationById(int id)
        {
            string query = "SELECT * FROM organizations WHERE Id = @Id AND isActive = 1";

            using (var connection = _dapperContext.CreateConnection())
            {
                var result = await connection.QuerySingleOrDefaultAsync<OrganizationResponseModel>(query, new { Id = id });

                return result;
            }
        }
        public async Task<IEnumerable<DepartmentResponseModel>> GetDepartments()
        {
            string query = "SELECT * FROM Departments WHERE isActive = 1";

            using (var connection = _dapperContext.CreateConnection())
            {
                var res = await connection.QueryAsync<DepartmentResponseModel>(query);

                return res.ToList();
            }
        }
        public async Task<IEnumerable<StatusResponseModel>> GetStatus()
        {
            string query = "SELECT * FROM Status WHERE isActive = 1";

            using (var connection = _dapperContext.CreateConnection())
            {
                var res = await connection.QueryAsync<StatusResponseModel>(query);

                return res.ToList();
            }
        }
        public async Task<IEnumerable<PositionResponseModel>> GetPositions(int maxRows)
        {
            string query = "GetPositions";

            using (var connection = _dapperContext.CreateConnection())
            {
                var res = await connection.QueryAsync<PositionResponseModel>(query,new { MaxRows = maxRows});

                return res.ToList();
            }
        }
    }
}
