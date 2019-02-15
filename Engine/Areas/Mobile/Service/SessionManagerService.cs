using System;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.Mobile.Service
{
    public class SessionManagerService
    {
        public string Token { get; set; }

        public void invalidate(string vmToken)
        {
            Token = null;
        }

        public bool isTokenValid(string _token)
        {
            try
            {
                SecurityService.GetUsernameFromToken(_token);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

       
    }
}