using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Areas.Mobile.ViewModel;
using Engine.Entities.Data;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class LoginController : ApiController
    {
        // GET

        private SecurityService _securityService = new SecurityService();

        private SessionManagerService _sessionManagerService = new SessionManagerService();


        [ActionName("login")]
        [HttpPost]
        [ResponseType(typeof(LoginViewModelResult))]
        public LoginViewModelResult Login(LoginViewModel vm)
        {
            try
            {
                
                vm = _securityService.Decript(vm);

                using (var db = new EngineContext())
                {
                    vm = _securityService.EncriptForDbSave(vm);


                    WorkplacePersonnel wp= db.WorkplacePersonnels.FirstOrDefault(w => w.Username == vm.username &&
                                                                                      w.Password == vm.password);
                    
                    if(wp==null)
                        throw new Exception("نام کاربری یا رمز عبور اشتباه است");
                    
                    
                    var token = _securityService.GenerateToken(vm);


                    var dates = wp.BiometricDatas.Where(day => day.Date.Year == DateTime.Now.Year &&
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


                    return new LoginViewModelResult
                    {
                        success = true,
                        token = token,
                        isAdmin = wp.IsAdmin,
                        loggedIn = true,
                        oneDeviceEnabled = wp.Workplace.oneDeviceEnabled,
                        notificationsEnabled = wp.Workplace.IsNotificationsEnabled,
                        faceRecognation = wp.Workplace.IsFaceRecognationEnabled,
                        message= msg,
                        workplaceId=wp.WorkplaceId
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