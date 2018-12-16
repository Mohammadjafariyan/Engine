using System.Web.Mvc;

namespace Engine.Areas.Absence.Controllers
{
    public class AttendanceHomeController : Controller
    {
        // GET
        public ActionResult Index()
        {
            return  View();
        }
    }
}