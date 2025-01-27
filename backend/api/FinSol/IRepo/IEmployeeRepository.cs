using FinSol.Model.Request;
using FinSol.Model.Response;

namespace FinSol.IRepo
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<EmployeeResponseModel>> GetAllEmployees(int maxRow);
        Task<EmployeeResponseModel> GetEmployeeById(Guid employeeId);
        Task<ResponseModel> AddEmployee(EmployeeRequestModel payload);
        Task<ResponseModel> AddEmployee_Fresh(EmployeeRequestModel payload);
        Task<ResponseModel> UpdateEmployee(EmployeeRequestModel payload);
        Task<ResponseModel> DeleteEmployee(Guid Id, Guid userId);

        // Employee Education
        Task<IEnumerable<EmployeeEducationRequestModel>> GetEmployeeEducations(Guid empoyeeId);
        Task<ResponseModel> AddEmployeeEducation(EmployeeEducationRequestModel payload);
        Task<ResponseModel> UpdateEmployeeEducation(EmployeeEducationRequestModel payload);
        Task<ResponseModel> DeleteEmployeeEducation(Guid id, Guid userId);

        // Leaves
        Task<IEnumerable<LeaveRequestModel>> GetEmployeeLeaves(Guid empoyeeId);
        Task<ResponseModel> ApplyForLeave(LeaveRequestModel payload);

        // Transfer
        Task<IEnumerable<EmployeeJobMappintResponseModel>> GetEmployeeTransferHistory(Guid employeeId);
        Task<ResponseModel> TransferEmployee(EmployeeJobMappintRequestModel payload);
    }
}
