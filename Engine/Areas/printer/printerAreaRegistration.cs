using System.Web.Mvc;

namespace Engine.Areas.printer
{
    public class printerAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "printer";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "printer_default",
                "printer/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}