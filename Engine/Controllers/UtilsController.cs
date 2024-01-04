using System.Web.Mvc;

namespace Engine.Controllers
{
    public class UtilsController : Controller
    {
        // GET
        public ActionResult DatePicker(string name )
        {
            ViewBag.name = name;
            return View();
        }
    }
}