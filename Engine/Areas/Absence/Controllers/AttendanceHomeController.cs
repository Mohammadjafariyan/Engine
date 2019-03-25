using System.Web.Mvc;
using Engine.Absence.Models;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ViewModel.Parameters;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;

namespace Engine.Areas.Absence.Controllers
{
    public class AttendanceHomeController : EBaseAppController<BiometricData,CommonParameter>
    {
       

        // GET
        public ActionResult Index()
        {
          
            return View();
        }


      
    }
}