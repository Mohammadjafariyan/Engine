
 using System.Web.Mvc;
 using System.Web.Http;
namespace Engine.Areas.Absence
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
                new { action =" Index ", id = UrlParameter.Optional }
            );

 context.Routes.MapHttpRoute(
              "Absenceapi_default ",
            "Absence/api/{controller}/{action}/{id}",
                new { action =" Index ", id = UrlParameter.Optional }
            );
        }
    }
    }

