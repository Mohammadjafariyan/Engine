using Engine.Areas.Mobile.Service;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Engine.Entities.Data;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
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
                
                var jwtHandler = new JwtSecurityTokenHandler();
                var jsonToken = jwtHandler.ReadToken(token) as JwtSecurityToken;

                // ValidateIssuer, ValidateAudience, ValidateLifetime, etc. can be configured as needed
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("^5H!@#$%^&*(سکبمنترOSEH;561/*-+BNM<>?/SVNNNSSklsdv651vsdvs")), // Replace with your actual secret key
                    ValidateIssuer = true,
                    ValidIssuer = "your-issuer", // Replace with your actual issuer
                    ValidateAudience = true,
                    ValidAudience = "your-audience", // Replace with your actual audience
                    ValidateLifetime = true,
                    // Other parameters
                    NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
                    RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"

                };

                SecurityToken _;
                var claimsPrincipal = jwtHandler.ValidateToken(token, tokenValidationParameters, out _);

                // Sign in the user using ASP.NET Identity
           

                using (var db=new EngineContext())
                {
                   
                    

                    var user = UserManager.Users
                        .FirstOrDefault(s =>
                            s.UserName == claimsPrincipal.Identity.Name || s.Mobile == claimsPrincipal.Identity.Name ||
                            s.Email == claimsPrincipal.Identity.Name);


                    SignInManager.SignIn(user, true, true);
                    return  RedirectToAction("Index", "AttendanceHome",new { area = "Absence" });

                    /*switch (result)
                    {
                        case SignInStatus.Success:
                            return  RedirectToAction("Index", "AttendanceHome",new { area = "Absence" });
                        case SignInStatus.LockedOut:
                            throw new Exception("نام کاربری شما قفل شده است");
                        case SignInStatus.Failure:
                        default:
                            throw new Exception("نام کاربری یا رمز عبور اشتباه است");
                    }*/
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