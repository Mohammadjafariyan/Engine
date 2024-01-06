using System.Data.Entity;
using System.Web.Mvc;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ViewModel.Parameters;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Engine.ServiceLayer.Engine;
using NotImplementedException = System.NotImplementedException;

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