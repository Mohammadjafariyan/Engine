using Engine.Areas.Mobile.Service;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Engine.Entities.Data;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class WebController : Controller
    {

        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public WebController()
        {
        }

        public WebController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }


        public ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }

        [AllowAnonymous]
        [HttpPost]
        // GET: Mobile/Web
        public async Task<ActionResult> Index(string token)
        {

            try
            {

                using (var db=new EngineContext())
                {
                    var workplacePersonnel = BaseMobileApiController.GetWorkplacePersonnelFromToken(db, token);


                 var   lastpassword = SecurityUtility.DecodeAndDecrypt(workplacePersonnel.Password);



                    // This doesn't count login failures towards account lockout
                    // To enable password failures to trigger account lockout, change to shouldLockout: true
                    var result = await SignInManager.PasswordSignInAsync(workplacePersonnel.Username
                    , lastpassword, false,shouldLockout: false);
                    switch (result)
                    {
                        case SignInStatus.Success:
                            return  RedirectToAction("Index", "AttendanceHome",new { area = "Absence" });
                        case SignInStatus.LockedOut:
                            throw new Exception("نام کاربری شما قفل شده است");
                        case SignInStatus.Failure:
                        default:
                            throw new Exception("نام کاربری یا رمز عبور اشتباه است");
                    }
                }

                
            }
            catch(Exception e)
            {
                ViewData["Error"] = e.Message;
                return View("Error");
            }
        }
    }
}