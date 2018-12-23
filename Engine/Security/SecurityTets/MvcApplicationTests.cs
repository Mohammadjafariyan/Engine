using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Engine.Controllers;
using Engine.Models;
using Engine.Service.AbstractControllers;
using Entities.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Rhino.Mocks;
using Xunit;

namespace Engine.Security.SecurityTets
{
    public class MvcApplicationTests
    {
        [Fact]
        public async void LoginTests()
        {

            var mvc = new MvcApplication();
            ApplicationUser superUser = await mvc.GenerateSuperUserIfNotExists();

            Assert.True(superUser.UserName == GlobalNames.SuperUser);

            var acc = new AccountController
            {
            };

            var vm = new LoginViewModel
            {
                UserName = GlobalNames.SuperUser,
                Password = "@21430037"
            };



            /*
            using (var context = new ApplicationDbContext())
            {
                var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));


                var res = acc.SignInManager.PasswordSignInAsync(vm.UserName, vm.Password, false, shouldLockout: false);
                Assert.True(res.Result == SignInStatus.Success);
     }
*/


        }
    }
}