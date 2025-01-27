using System.Reflection;
using Dapper;
using FinSol.Context;
using FinSol.IRepo;
using FinSol.Model.Request;
using FinSol.Model.Response;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Identity.Client;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FinSol.Repo
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DapperContext _dapperContext;

        public EmployeeRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        #region Employee CRUD
        public async Task<IEnumerable<EmployeeResponseModel>> GetAllEmployees(int maxRow)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "GetAllEmployees";

                var parameters = new
                {
                    MaxRows = maxRow
                };


                var Employee = await connection.QueryAsync<EmployeeResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return Employee.ToList();
            }
        }
        public async Task<EmployeeResponseModel> GetEmployeeById(Guid employeeId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "GetEmployeeById";

                var parameters = new
                {
                    EmployeeId = employeeId
                };

                var query = await connection.QueryMultipleAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);

                var Employee = (await query.ReadAsync<EmployeeResponseModel>()).FirstOrDefault();
                Employee.EducationRecords = (await query.ReadAsync<EmployeeEducationRequestModel>()).ToList();

                var Employeex = await connection.QueryAsync<EmployeeResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return Employee;
            }
        }

        public async Task<ResponseModel> AddEmployee_Fresh(EmployeeRequestModel payload)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "CreateEmployee_Fresh";

                var parameters = new
                {
                    Name = payload.Name,
                    FatherName = payload.FatherName,
                    HusbandName = payload.HusbandName,
                    Surname = payload.Surname,
                    Title = payload.Title,
                    Bank = payload.Bank,
                    AccountNo = payload.AccountNo,
                    AccountTitle = payload.AccountTitle,
                    DateOfBirth = payload.DateOfBirth,
                    MailingAddress = payload.MailingAddress,
                    NTNnumber = payload.NTNnumber,
                    Email = payload.Email,
                    Contact = payload.Contact,
                    CNIC = payload.CNIC,
                    ProfilePhotoUrl = payload.ProfilePhotoUrl,
                    Gender = payload.Gender,
                    Religion = payload.Religion,
                    AppointedOn = payload.AppointedOn,
                    RetiredOn = payload.RetiredOn,
                    DiedOnService = payload.DiedOnService,
                    Resign = payload.Resign,
                    Terminated = payload.Terminated,
                    Createdby = payload.CreatedBy,
                    JobTitleDptMappId = payload.JobTitleDptMappId,
                    BorrowedJobTitleDptMappId = payload.BorrowedJobTitleDptMappId,
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }

        public async Task<ResponseModel> AddEmployee(EmployeeRequestModel payload)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "CreateEmployee";

                var parameters = new
                {
                    Name = payload.Name,
                    FatherName = payload.FatherName,
                    HusbandName = payload.HusbandName,
                    Surname = payload.Surname,
                    Title = payload.Title,
                    Bank = payload.Bank,
                    AccountNo = payload.AccountNo,
                    AccountTitle = payload.AccountTitle,
                    DateOfBirth = payload.DateOfBirth,
                    MailingAddress = payload.MailingAddress,
                    NTNnumber = payload.NTNnumber,
                    Email = payload.Email,
                    Contact = payload.Contact,
                    CNIC = payload.CNIC,
                    ProfilePhotoUrl = payload.ProfilePhotoUrl,
                    Gender = payload.Gender,
                    Religion = payload.Religion,
                    AppointedOn = payload.AppointedOn,
                    RetiredOn = payload.RetiredOn,
                    DiedOnService = payload.DiedOnService,
                    Resign = payload.Resign,
                    Terminated = payload.Terminated,
                    Createdby = payload.CreatedBy,
                    JobTitleDptMappId = payload.JobTitleDptMappId,
                    BorrowedJobTitleDptMappId = payload.BorrowedJobTitleDptMappId,
                    Designation = payload.Designation,
                    Years = payload.Years,
                    DepartmentName = payload.DepartmentName,
                    SalaryAmount = payload.SalaryAmount
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }

        public async Task<ResponseModel> UpdateEmployee(EmployeeRequestModel payload)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "UpdateEmployee";

                var parameters = new
                {
                    Id = payload.Id,
                    Name = payload.Name,
                    FatherName = payload.FatherName,
                    HusbandName = payload.HusbandName,
                    Surname = payload.Surname, // Assuming Surname is also part of the payload
                    Title = payload.Title, // If Title is part of the payload
                    Bank = payload.Bank, // If Bank is part of the payload
                    AccountNo = payload.AccountNo, // If AccountNo is part of the payload
                    AccountTitle = payload.AccountTitle, // If AccountTitle is part of the payload
                    DateOfBirth = payload.DateOfBirth, // If DateOfBirth is part of the payload
                    MailingAddress = payload.MailingAddress, // If MailingAddress is part of the payload
                    NTNnumber = payload.NTNnumber, // If NTNnumber is part of the payload
                    Email = payload.Email,
                    Contact = payload.Contact,
                    CNIC = payload.CNIC,
                    ProfilePhotoUrl = payload.ProfilePhotoUrl,
                    Gender = payload.Gender,
                    Religion = payload.Religion,
                    AppointedOn = payload.AppointedOn,
                    RetiredOn = payload.RetiredOn,
                    DiedOnService = payload.DiedOnService, // If DiedOnService is part of the payload
                    Resign = payload.Resign, // If Resign is part of the payload
                    Terminated = payload.Terminated, // If Terminated is part of the payload
                    ModifiedBy = payload.ModifiedBy, // Created by user's ID
                }; ;

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }

        public async Task<ResponseModel> DeleteEmployee(Guid Id, Guid userId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "DeleteEmployee";

                var parameters = new
                {
                    Id=Id,
                    UserId = userId
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }
        #endregion

        #region Employee Education CRUD
        public async Task<IEnumerable<EmployeeEducationRequestModel>> GetEmployeeEducations(Guid empoyeeId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "GetEmployeeEducations";

                var parameters = new
                {
                    EmployeeId = empoyeeId
                };


                var Employee = await connection.QueryAsync<EmployeeEducationRequestModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return Employee.ToList();
            }
        }
        public async Task<ResponseModel> AddEmployeeEducation(EmployeeEducationRequestModel payload)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "AddEmployeeEducation";

                var parameters = new
                {
                    EmployeeId = payload.EmployeeId,
                    DegreeTitle = payload.DegreeTitle,
                    Board = payload.Board,
                    InstituteName = payload.InstituteName,
                    YearOfPassing = payload.YearOfPassing,
                    GradePercentage = payload.GradePercentage,
                    TotalMarks = payload.TotalMarks,
                    ObtainMarks = payload.ObtainMarks,
                    CreatedBy = payload.CreatedBy
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }
        public async Task<ResponseModel> UpdateEmployeeEducation(EmployeeEducationRequestModel payload)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "UpdateEmployeeEducation";

                var parameters = new
                {
                    Id = payload.Id,
                    DegreeTitle = payload.DegreeTitle,
                    Board = payload.Board,
                    InstituteName = payload.InstituteName,
                    YearOfPassing = payload.YearOfPassing,
                    GradePercentage = payload.GradePercentage,
                    TotalMarks = payload.TotalMarks,
                    ObtainMarks = payload.ObtainMarks,
                    ModifiedBy = payload.ModifiedBy
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }
        public async Task<ResponseModel> DeleteEmployeeEducation(Guid id, Guid userId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "DeleteEmployeeEducation";

                var parameters = new
                {
                    Id = id,
                    ModifiedBy = userId
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }
        #endregion

        #region Leaves
        public async Task<IEnumerable<LeaveRequestModel>> GetEmployeeLeaves(Guid empoyeeId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "GetEmployeeLeaves";

                var parameters = new
                {
                    EmployeeId = empoyeeId
                };


                var Employee = await connection.QueryAsync<LeaveRequestModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return Employee.ToList();
            }
        }
        public async Task<ResponseModel> ApplyForLeave(LeaveRequestModel payload)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "ApplyForLeave";

                var parameters = new
                {
                    EmployeeId = payload.EmployeeId,
                    LeaveType = payload.LeaveType,
                    ToDate = payload.ToDate,
                    FromDate = payload.FromDate,
                    Reason = payload.Reason,
                    CreatedBy = payload.CreatedBy
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }
        #endregion

        #region Transfer
        public async Task<IEnumerable<EmployeeJobMappintResponseModel>> GetEmployeeTransferHistory(Guid employeeId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "GetEmployeeTransferHistory";

                var parameters = new
                {
                    EmployeeId = employeeId
                };

                var query = await connection.QueryMultipleAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);

                var Employee = (await query.ReadAsync<EmployeeJobMappintResponseModel>()).ToList();


                return Employee;
            }
        }

        public async Task<ResponseModel> TransferEmployee(EmployeeJobMappintRequestModel payload)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "TransferEmployee";

                var parameters = new
                {
                    EmployeeId = payload.EmployeeId,
                    JobTitleDptMappId = payload.JobTitleDptMappId,
                    BorrowedJobTitleDptMappId = payload.BorrowedJobTitleDptMappId,
                    Createdby = payload.CreatedBy,
                };

                var response = await connection.QueryFirstOrDefaultAsync<ResponseModel>(
                    spName,
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return response;
            }
        }

        #endregion
    }
}
