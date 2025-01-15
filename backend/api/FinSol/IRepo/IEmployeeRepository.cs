using FinSol.Model.Request;
using FinSol.Model.Response;

namespace FinSol.IRepo
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<EmployeeResponseModel>> GetAllEmployees(int maxRow);
        Task<ResponseModel> AddEmployee(EmployeeRequestModel payload);
        Task<ResponseModel> UpdateEmployee(EmployeeRequestModel payload);
        Task<ResponseModel> DeleteEmployee(Guid Id, Guid userId);
    }
}
