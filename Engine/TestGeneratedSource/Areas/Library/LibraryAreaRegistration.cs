
 using System.Web.Mvc;

namespace Engine.Areas.AppGeneration
{
        public class libraryAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "library ";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
              "  library_default ",
            "    library/{controller}/{action}/{id} ",
                new { action =" Index ", id = UrlParameter.Optional }
            );
        }
    }
    }

