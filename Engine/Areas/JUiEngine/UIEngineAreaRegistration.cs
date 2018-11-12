using System.Web.Mvc;

namespace Engine.Areas.App
{
    public class UIEngineAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "UIEngine";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "App_default",
                "UIEngine/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}