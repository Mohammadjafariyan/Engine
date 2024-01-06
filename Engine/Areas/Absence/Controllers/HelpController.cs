using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Engine.ServiceLayer.Engine;

namespace Engine.Areas.Absence.Controllers
{
    public class HelpController:Controller
    {
        
        public  ActionResult Menu()
        {


            using (var db =new EngineContext())
            {
                ViewBag.workgroupCount =  db.QueryNoTrack<WorkGroup>().Count();
            }

            return View();
        }

    }
}