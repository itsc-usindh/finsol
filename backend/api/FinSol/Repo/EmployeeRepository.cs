using System.Reflection;
using Dapper;
using FinSol.Context;
using FinSol.IRepo;
using FinSol.Model.Request;
using FinSol.Model.Response;

namespace FinSol.Repo
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DapperContext _dapperContext;

        public EmployeeRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

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
                    Email = payload.Email,
                    Contact = payload.Contact,
                    CNIC = payload.CNIC,
                    ProfilePhotoUrl = payload.ProfilePhotoUrl,
                    Gender = payload.Gender,
                    Religion = payload.Religion,
                    AppointedOn = payload.AppointedOn,
                    RetiredOn = payload.RetiredOn
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
                    Id= payload.Id,
                    Name = payload.Name,
                    FatherName = payload.FatherName,
                    HusbandName = payload.HusbandName,
                    Email = payload.Email,
                    Contact = payload.Contact,
                    CNIC = payload.CNIC,
                    ProfilePhotoUrl = payload.ProfilePhotoUrl,
                    Gender = payload.Gender,
                    Religion = payload.Religion,
                    AppointedOn = payload.AppointedOn,
                    RetiredOn = payload.RetiredOn
                };

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

        public async Task<IEnumerable<EmployeeResponseModel>> GetEmployeeEducations(Guid empoyeeId)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                string spName = "GetEmployeeEducations";

                var parameters = new
                {
                    EmmployeeId = empoyeeId
                };


                var Employee = await connection.QueryAsync<EmployeeResponseModel>(
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
                    InistitueName = payload.InistitueName,
                    YearOfPassing = payload.YearOfPassing,
                    GradePercentage = payload.GradePercentage,
                    TotalMarks = payload.TotalMarks,
                    ObtainMarks = payload.ObtainMarks
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
                    EmployeeId = payload.EmployeeId,
                    DegreeTitle = payload.DegreeTitle,
                    Board = payload.Board,
                    InistitueName = payload.InistitueName,
                    YearOfPassing = payload.YearOfPassing,
                    GradePercentage = payload.GradePercentage,
                    TotalMarks = payload.TotalMarks,
                    ObtainMarks = payload.ObtainMarks
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
                string spName = "deleteEmployeeEducation";

                var parameters = new
                {
                    Id = id,
                    updatedBy = userId
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
