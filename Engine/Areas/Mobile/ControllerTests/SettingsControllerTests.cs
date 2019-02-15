using Engine.Areas.Mobile.Controllers;
using Engine.Areas.Mobile.ViewModel;
using Xunit;

namespace Engine.Areas.Mobile.ControllerTests
{
    public class SettingsControllerTests
    {
        [Fact]
        public  void SavePersonImageTest()
        {
            var c = new SettingsController();


            var loginViewModel = new ObjectPostViewModel
            {
                token = "TdqvLaLw76Sky/m0KAC7Fjj4B9HVVBqDA1RoAhgoWyg=",
                obj = new byte[5]
            };

            var res =  c.SavePersonImage(loginViewModel);

            Assert.True(res.success);
            
        }
    }
}