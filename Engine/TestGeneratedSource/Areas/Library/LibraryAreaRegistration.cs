
 using System.Web.Mvc;
 using System.Web.Http;
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
              "Library_default ",
            "Library/{controller}/{action}/{id}",
                new { action =" Index ", id = UrlParameter.Optional }
            );

 context.Routes.MapHttpRoute(
              "Libraryapi_default",
            "Library/api/{controller}/{action}/{id}",
                new { action =" Index ", id = UrlParameter.Optional }
            );
        }
    }
    }

