using Engine.Areas.Mobile.Controllers;
using Engine.Areas.Mobile.ViewModel;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Xunit;

namespace Engine.Areas.Mobile.ControllerTests
{
    [TestClass()]
    public class LoginControllerTest
    {
        [TestMethod()]
        [Fact]
        public void LoginSuccess()
        {
            var loginController = new LoginController();

            var vm = new LoginViewModel
            {
            };
            vm.encoded = "ycB4x+5G74MqYrueadnLiTXEJHYg94DY1fvTA5D3TaLvXFFPLRbXIhOr7Dcy17m4QYdeiCF+uzmYlX4LYHRLZw==";

            var res = loginController.Login(vm);


            Xunit.Assert.True(res.success == true);
            Xunit.Assert.True(res.message != null);
        }

        [Fact]
        public void LoginFail()
        {
            var loginController = new LoginController();

            var vm = new LoginViewModel
            {
            };

            var res = loginController.Login(vm);


            Xunit.Assert.True(res.success);
            Xunit.Assert.True(res.isAdmin);
            Xunit.Assert.True(vm.username == "admin");
            Xunit.Assert.True(vm.password == "admin");
        }
    }
}