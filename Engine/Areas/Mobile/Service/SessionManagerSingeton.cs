using System;

namespace Engine.Areas.Mobile.Service
{
    public class SessionManagerSingeton
    {
        
        [ThreadStatic]
        private static readonly  SessionManagerService Service=new SessionManagerService();
        public static SessionManagerService TokenManager = Service;
    }
}