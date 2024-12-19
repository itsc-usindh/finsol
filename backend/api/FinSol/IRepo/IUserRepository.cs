using FinSol.Model.Request;
using FinSol.Model.Response;

namespace FinSol.IRepo
{
    public interface IUserRepository
    {
        Task<UserResponseModel> GetUserByUsernameAsync(string username);
        Task<ResponseModel> AddUserAsync(UserRequestModel payload);
        Task<GetUserResponseModel> GetUserById(int UserId);
    }
}
