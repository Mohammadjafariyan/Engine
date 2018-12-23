using System.Web.Mvc;
using Engine.Absence.Models;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ViewModel.Parameters;

namespace Engine.Areas.Absence.Controllers
{
    public class AttendanceHomeController : EBaseAppController<BiometricData,CommonParameter>
    {
        // GET
        public ActionResult Index()
        {
            return  View();
        }
    }
}