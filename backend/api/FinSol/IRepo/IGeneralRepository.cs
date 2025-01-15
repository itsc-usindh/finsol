using FinSol.Model.Response;

namespace FinSol.IRepo
{
    public interface IGeneralRepository
    {
        Task<ResponseModel> ExecuteStoreProcedure(string spName, object parameters = null);
        Task<IEnumerable<OrganizationResponseModel>> GetOrganization();
        Task<OrganizationResponseModel> GetOrganizationById(int id);
        Task<IEnumerable<DepartmentResponseModel>> GetDepartments();
        Task<IEnumerable<StatusResponseModel>> GetStatus();
        Task<IEnumerable<PositionResponseModel>> GetPositions(int maxRows);
    }
}
