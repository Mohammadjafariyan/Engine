using System.Web.Mvc;

namespace Engine.Controllers
{
    public class ErrorController : Controller
    {
        // GET
        public ActionResult Index()
        {
            return View();
        }
    }
}