using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Engine.Areas.Absence.Models;
using Engine.Areas.Absence.Service;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Absence.Controllers
{
    public class PersonnelTaradodInfoController : Controller
    {
        public static readonly string Personnel = "Personnel";

        private PersonnelTaradodInfoService _service = new PersonnelTaradodInfoService();
        public static readonly string total = "total";
        public static readonly string taradodInfo = "taradodInfo";
        public static readonly string obligatedRangeName = "obligatedRange";
        public static readonly string NoStyle = "NoStyle";

        // GET
        public ActionResult Index()
        {
            try
            {
                GenForm();
            }
            catch (Exception e)
            {
                ViewData["error"] = e.Message;
            }

            return View();
        }


        private void GenForm()
        {
            using (var db = new EngineContext())
            {
                ViewData[PersonnelTaradodInfoController.Personnel] = db.Personnels.ToList();
            }
        }


        public ActionResult Detail(long personnelId, DateTime fromdate, DateTime dateto)
        {
            try
            {
                GenForm();
                ViewData["personnelId"] = personnelId;
                ViewData["fromdate"] = fromdate;
                ViewData["dateto"] = dateto;

                var biometricData = _service.GetBiometricData(personnelId, fromdate, dateto);

                var obligatedRange = _service.GetObligatedRange(personnelId);

                List<BiometryCalculatedDetail> taradodInfoCalculated =
                    _service.CompareAndJoin(fromdate, dateto, biometricData, obligatedRange);

                BiometryCalculatedDetail totalCalculated = _service.CalculateTotal(taradodInfoCalculated);

                
                
                ViewData[PersonnelTaradodInfoController.total] = totalCalculated;
                ViewData[PersonnelTaradodInfoController.obligatedRangeName] = obligatedRange;
                ViewData[PersonnelTaradodInfoController.taradodInfo] = taradodInfoCalculated;
            }
            catch (Exception e)
            {
                ViewData["error"] = e.Message;
            }


            return View("Index");
        }
    }
}