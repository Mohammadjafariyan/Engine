using System.Web.Http;
using System.Web.Mvc;

namespace Engine.Areas.Mobile
{
    public class MobileAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Mobile";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Mobile_default",
                "Mobile/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );


            context.Routes.MapHttpRoute(
                name: "Mobile_apiAction",
                routeTemplate: "Mobile/api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }

            );
        }
    }
}