using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Engine.Areas.Mobile.Service
{
    public class SecurityUtility
    {

       private static string IV = "715sjvy6f$^*&(g5";
            private static string PASSWORD = "PASSWORD_VALUE";
            private static string SALT = "v6a51er6q1+q3141jv2345678vm#$%^&dvjn";
 
            public static string EncryptAndEncode(string raw)
            {
                using (var csp = new AesCryptoServiceProvider())
                {
                    ICryptoTransform e = GetCryptoTransform(csp, true);
                    byte[] inputBuffer = Encoding.UTF8.GetBytes(raw);
                    byte[] output = e.TransformFinalBlock(inputBuffer, 0, inputBuffer.Length);
                    string encrypted = Convert.ToBase64String(output);
                    return encrypted;
                }
            }
 
            public static string DecodeAndDecrypt(string encrypted)
            {
                using (var csp = new AesCryptoServiceProvider())
                {
                    var d = GetCryptoTransform(csp, false);
                    byte[] output = Convert.FromBase64String(encrypted);
                    byte[] decryptedOutput = d.TransformFinalBlock(output, 0, output.Length);
                    string decypted = Encoding.UTF8.GetString(decryptedOutput);
                    return decypted;
                }
            }
 
            private static ICryptoTransform GetCryptoTransform(AesCryptoServiceProvider csp, bool encrypting)
            {
                csp.Mode = CipherMode.CBC;
                csp.Padding = PaddingMode.PKCS7;
                var spec = new Rfc2898DeriveBytes(Encoding.UTF8.GetBytes(PASSWORD), Encoding.UTF8.GetBytes(SALT), 65536);
                byte[] key = spec.GetBytes(16);
 
 
                csp.IV = Encoding.UTF8.GetBytes(IV);
                csp.Key = key;
                if (encrypting)
                {
                    return csp.CreateEncryptor();
                }
                return csp.CreateDecryptor();
            }
        }
 
}