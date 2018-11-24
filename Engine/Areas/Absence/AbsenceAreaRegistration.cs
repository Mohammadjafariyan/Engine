using System.Web.Http;
using System.Web.Mvc;

namespace Engine.Areas.App
{
    public class AbsenceAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Absence";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Absence_default",
                "Absence/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
            
            context.Routes.MapHttpRoute(
                "AbsenceApi_default",
                "Absence/api/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}