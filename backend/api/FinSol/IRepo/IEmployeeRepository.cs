using FinSol.Model.Request;
using FinSol.Model.Response;

namespace FinSol.IRepo
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<EmployeeResponseModel>> GetAllEmployees(int maxRow);
        Task<ResponseModel> AddEmployee(EmployeeRequestModel payload);
    }
}
