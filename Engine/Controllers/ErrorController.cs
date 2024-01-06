using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting.Logging;

namespace Engine.Controllers
{
    public class ErrorController : Controller
    {
        // GET
        public ActionResult Index()
        {
            return View("Error");
        }
        
        protected override void OnException(ExceptionContext filterContext)
        {
            // Log the exception
            //Logger.LogError(filterContext.Exception);

            // Redirect to the error view
            filterContext.Result = new ViewResult
            {
                ViewName = "Error"
            };

            // Mark the exception as handled
            filterContext.ExceptionHandled = true;
        }
    }
}