using System.Web.Mvc;

namespace Engine.Areas.JUiEngine
{
    public class UiEngineAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "JUiEngine";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "JUiEngine_default2",
                "JUiEngine/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}