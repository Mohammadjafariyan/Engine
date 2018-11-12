
 using System.Web.Http;
 using System.Web.Mvc;

namespace Engine.Areas.Library
{
        public class LibraryAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Library";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Library_default",
                "Library/{controller}/{action}/{id}",
                new { action =" Index ", id = UrlParameter.Optional }
                
            );

            context.Routes.MapHttpRoute(
                name: "Library_apiAction",
                routeTemplate: "Library/api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }

            );



        }
    }
    }

