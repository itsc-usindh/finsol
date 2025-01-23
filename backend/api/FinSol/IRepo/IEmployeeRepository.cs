﻿using FinSol.Model.Request;
using FinSol.Model.Response;

namespace FinSol.IRepo
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<EmployeeResponseModel>> GetAllEmployees(int maxRow);
        Task<EmployeeResponseModel> GetEmployeeById(Guid employeeId);
        Task<ResponseModel> AddEmployee(EmployeeRequestModel payload);
        Task<ResponseModel> UpdateEmployee(EmployeeRequestModel payload);
        Task<ResponseModel> DeleteEmployee(Guid Id, Guid userId);

        // Employee Education
        Task<IEnumerable<EmployeeEducationRequestModel>> GetEmployeeEducations(Guid empoyeeId);
        Task<ResponseModel> AddEmployeeEducation(EmployeeEducationRequestModel payload);
        Task<ResponseModel> UpdateEmployeeEducation(EmployeeEducationRequestModel payload);
        Task<ResponseModel> DeleteEmployeeEducation(Guid id, Guid userId);
    }
}
