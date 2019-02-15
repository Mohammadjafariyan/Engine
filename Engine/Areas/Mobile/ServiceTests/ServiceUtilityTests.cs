using System;
using Engine.Areas.Mobile.Service;
using Spire.Pdf.General.Render.Font.OpenTypeFile;
using Xunit;

namespace Engine.Areas.Mobile.ServiceTests
{
    public class SecurityServiceTests
    {
        [Fact]
        public void EncriptForDbSave()
        {
            var vm = new Engine.Areas.Mobile.ViewModel.LoginViewModel
            {
                username = "admin",
                password = "admin",
            };
            var ss = new SecurityService();
            ss.EncriptForDbSave(vm);

            string deco=SecurityUtility.DecodeAndDecrypt(vm.password);

            Assert.True(deco=="admin");
        }

        [Fact]
        public void GenerateToken()
        {
            var vm = new Engine.Areas.Mobile.ViewModel.LoginViewModel
            {
                username = "admin",
                password = "admin",
            };

            var ss = new SecurityService();
            string token = ss.GenerateToken(vm);

            DateTime dt = ss.parseToken(token);

            Assert.True(dt < DateTime.Now);

        }

        [Fact]
        public void UtilityTest()
        {
            var admin = SecurityUtility.EncryptAndEncode("admin");
            Assert.True(SecurityUtility.DecodeAndDecrypt(admin) == "admin");
            Assert.True(SecurityUtility.DecodeAndDecrypt("4eIVszyvsMJErvFLw/kxJg==") == "admin");
        }

        [Fact]
        public void EncriptionTest()
        {
            var ss = new SecurityService();

            var vm = new Engine.Areas.Mobile.ViewModel.LoginViewModel
            {
                username = "admin",
                password = "admin",
            };

            vm.encoded = "ycB4x+5G74MqYrueadnLiTXEJHYg94DY1fvTA5D3TaLvXFFPLRbXIhOr7Dcy17m4QYdeiCF+uzmYlX4LYHRLZw==";


            var decodedVm = ss.Decript(vm);

            Assert.Equal(decodedVm.username, vm.username);
            Assert.Equal(decodedVm.password, vm.password);
        }
    }
}