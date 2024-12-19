using FinSol.Model.Request;
using FinSol.Model.Response;

namespace FinSol.IRepo
{
    public interface IAuthService
    {
        Task<string> Authenticate(LoginRequestModel model);
        Task<ResponseModel> SignUp(UserRequestModel model);
    }
}
