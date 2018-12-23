using Engine.Utitliy;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Engine.Controllers;
using Engine.Models;
using Engine.Service.AbstractControllers;
using Entities.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using WebAppIDEEngine.Models;

namespace Engine
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            var container1 = new Container(new EngineRegistry());
            Database.SetInitializer<EngineContext>(null);


            // <----- Add this line
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            GenerateSuperUserIfNotExists();
        }


        public async Task<ApplicationUser> GenerateSuperUserIfNotExists()
        {
            using (var context = new ApplicationDbContext())
            {
                var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
                var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));


                // creating Creating Manager role     
                if (!roleManager.RoleExists(GlobalNames.SystemAdmin))
                {
                    var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                    role.Name = GlobalNames.SystemAdmin;
                    roleManager.Create(role);
                }

                // In Startup iam creating first Admin Role and creating a default Admin User     
                if (!roleManager.RoleExists(GlobalNames.SuperUser))
                {
                    // first we create Admin rool    
                    var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                    role.Name = GlobalNames.SuperUser;
                    roleManager.Create(role);
                }

                ApplicationUser finded = UserManager.Find(GlobalNames.SuperUserName, "@21430037");
                ApplicationUser user = null;
                if (finded == null)
                {
                    //Here we create a Admin super user who will maintain the website                   

                    user = new ApplicationUser();
                    user.UserName = GlobalNames.SuperUserName;
                    //user. = "syedshanumcain@gmail.com";    

                    string userPWD = "@21430037";

                    var chkUser = UserManager.Create(user, userPWD);

                    //Add default User to Role Admin    
                    if (chkUser.Succeeded)
                    {
                        var result = UserManager.AddToRole(user.Id, GlobalNames.SuperUser);
                    }
                    else
                    {
                        throw new Exception("super user cant be created!");
                    }
                }

                return finded ?? user;
            }
        }
    }
}