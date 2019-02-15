using System;
using System.IO;
using System.Security.Cryptography;
using Engine.Areas.Mobile.ViewModel;
using Newtonsoft.Json;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.Mobile.Service
{
    public class SecurityService
    {
        public LoginViewModel Decript(LoginViewModel vm)
        {
            if (string.IsNullOrEmpty(vm.encoded))
                throw new Exception("  خطای سیستمی : انکد خالی است ");

            string json = SecurityUtility.DecodeAndDecrypt(vm.encoded);

            vm = JsonConvert.DeserializeObject<LoginViewModel>(json);

            if (string.IsNullOrEmpty(vm.username) || string.IsNullOrEmpty(vm.password))
                throw new Exception("  خطای سیستمی : نام کاربری یا رمز عبور خالی است ");


            return vm;
        }

        public LoginViewModel EncriptForDbSave(LoginViewModel vm)
        {
            vm.password = SecurityUtility.EncryptAndEncode(vm.password);

            return vm;
        }

        public string GenerateToken(LoginViewModel vm)
        {
            string token = vm.username + "_" + DateTime.Now;

            token = SecurityUtility.EncryptAndEncode(token);

            return token;
        }

        public DateTime parseToken(string token)
        {
            if (string.IsNullOrEmpty(token))
                throw new Exception("token is null");

            token = SecurityUtility.DecodeAndDecrypt(token);

            if (string.IsNullOrEmpty(token))
                throw new Exception("token after decription is null");

            string datetime = token.Split('_')[1];

            return DateTime.Parse(datetime);
        }

        public static string GetUsernameFromToken(string token)
        {
            if (string.IsNullOrEmpty(token))
                throw new Exception("token is null   - دسترسی ندارید");

            token = SecurityUtility.DecodeAndDecrypt(token);

            if (string.IsNullOrEmpty(token))
                throw new Exception("token after decription is null - دسترسی ندارید");

            string datetime = token.Split('_')[0];

            return datetime;
        }
    }
}