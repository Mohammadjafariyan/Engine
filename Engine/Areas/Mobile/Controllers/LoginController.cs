using System;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Areas.Mobile.ViewModel;
using Engine.Entities.Data;
using Engine.ServiceLayer.Engine;
using Microsoft.AspNet.Identity.Owin;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class LoginController : ApiController
    {
        // GET
        private ApplicationUserManager _userManager;
        private ApplicationSignInManager _signInManager;

        private SecurityService _securityService = new SecurityService();

        private SessionManagerService _sessionManagerService = new SessionManagerService();

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }
        
        [ActionName("login")]
        [HttpPost]
        [ResponseType(typeof(LoginViewModelResult))]
        public LoginViewModelResult Login(LoginViewModel vm)
        {
            try
            {
                vm = _securityService.Decript(vm);
   
                var user = UserManager.Users
                    .FirstOrDefault(s => s.UserName == vm.username || s.Mobile == vm.username || s.Email == vm.username);

                string username = user?.UserName ?? vm?.username;

                var result = SignInManager.PasswordSignIn(username, vm.password, true,
                    shouldLockout: false);
            
                switch (result)
                {
                    case SignInStatus.Success:
                        using (var db = new EngineContext())
                        {

                            var personnel = db.GetCurrentUserPersonnel( user.Id, true);


                            var biometricDatas = personnel.WorkplacePersonnels.SelectMany(s=>s.BiometricDatas);
                            var dates = biometricDatas.Where(day => day.Date.Year == DateTime.Now.Year &&
                                                                    day.Date.Month == DateTime.Now.Month &&
                                                                    day.Date.Day == DateTime.Now.Day).OrderBy(d=>d.Date).LastOrDefault();

                            string msg=null;
                            if (dates != null)
                            {
                                var time=  dates.BiometricDataTimes.OrderBy(b => b.InsertDateTime).LastOrDefault();
                                if (time!=null)
                                {
                                    msg= DashboardItemController.GetStatus(time) + " "+ time;
                                }
                            }


                            var token=_securityService.GenerateToken(user.UserName);


                            return new LoginViewModelResult
                            {
                                success = true,
                                token = token,
                                isAdmin = user?.IsAdmin ?? false,
                                loggedIn = true,
                                message= msg,
                            };
                        }
                    case SignInStatus.LockedOut:
                        return new LoginViewModelResult
                        {
                            success = false,
                            message = "این اکانت قفل شده است لطفا با پشتیبانی یا شرکت خود تماس بگیرید"
                        };
                    case SignInStatus.RequiresVerification:
                        return new LoginViewModelResult
                        {
                            success = false,
                            message = "اکانت شما تایید نشده است"
                        };
                    case SignInStatus.Failure:
                    default:
                        return new LoginViewModelResult
                        {
                            success = false,
                            message = "شماره موبایل / ایمیل یا رمز عبور اشتباه است"
                        };
                }

                
            }
            catch (Exception e)
            {
                return new LoginViewModelResult
                {
                    success = false,
                    message = e.Message
                };
            }
        }
        
        
        [ActionName("Logout")]
        [HttpPost]
        [ResponseType(typeof(LoginViewModelResult))]
        public LoginViewModelResult Logout(LoginViewModel vm)
        {
            try
            {
                _sessionManagerService.invalidate(vm.token);
                
                return new LoginViewModelResult
                {
                };
            }
            catch (Exception e)
            {
                return new LoginViewModelResult
                {
                    success = false,
                    message = e.Message
                };
            }
        }
    }
}