using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Engine.Areas.Mobile.ViewModel;
using Microsoft.IdentityModel.Tokens;
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

        /*public string GenerateToken(LoginViewModel vm)
        {
            string token = vm.username;

         //   token = SecurityUtility.EncryptAndEncode(token);
            token = GenerateToken(token);

            return token;
        }
        */
        
        
        public string GenerateToken( string userName)
        {
            var key = Encoding.UTF8.GetBytes("^5H!@#$%^&*(سکبمنترOSEH;561/*-+BNM<>?/SVNNNSSklsdv651vsdvs");
            var securityKey = new SymmetricSecurityKey(key);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, userName),
                // Add additional claims as needed
            };

            var token = new JwtSecurityToken(
                issuer: "your-issuer",
                audience: "your-audience",
                claims: claims,
                expires: DateTime.Now.AddDays(30), // Adjust as needed
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
            if (HttpContext.Current.User.Identity.IsAuthenticated==false)
                throw new Exception("token is null   - دسترسی ندارید");

            return HttpContext.Current.User.Identity.Name;
            /*token = SecurityUtility.DecodeAndDecrypt(token);

            if (string.IsNullOrEmpty(token))
                throw new Exception("token after decription is null - دسترسی ندارید");

            string datetime = token.Split('_')[0];

            return datetime;*/
        }
    }
}