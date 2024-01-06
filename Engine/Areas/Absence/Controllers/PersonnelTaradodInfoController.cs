using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Engine.Areas.Absence.Models;
using Engine.Areas.Absence.Service;
using Engine.Areas.Absence.UiConstructs;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Data;
using Engine.Entities.Models.UiGeneratorModels;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.Absence.Controllers
{
    public class PersonnelTaradodInfoController : EBaseAppController<BiometryCalculatedDetail, CommonParameter>
    {
        public static readonly string Personnel = "Personnel";
        public static readonly string total = "total";
        public static readonly string taradodInfo = "taradodInfo";
        public static readonly string obligatedRangeName = "obligatedRange";
        public static readonly string NoStyle = "NoStyle";

        private PersonnelTaradodInfoService _service = new PersonnelTaradodInfoService();

        public PersonnelTaradodInfoController()
        {
            _engineService = new BiometryCalculatedDetailService();
            FormConstructProvider = new PersonnelTaradodInfoConstruct();
            TableConstructProvider = new PersonnelTaradodInfoConstruct();
        }


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

        public ViewResult GetAllPersonnelTotalSummaryTimesheetView()
        {
            var dt = GetAllPersonnelTotalSummaryTimesheetDataTable(
                new List<BiometryCalculatedDetail>(), true);
            return View("GetAllPersonnelTotalSummaryTimesheet", dt);
        }

        [HttpPost]
        public JsonResult GetAllPersonnelTotalSummaryTimesheet(DateTime from, DateTime to)
        {
            ViewData["from"] = Engine.Controllers.AbstractControllers.EngineUtility.ConvertToShamsiDate(from, false, false);
            ViewData["to"] = Engine.Controllers.AbstractControllers.EngineUtility.ConvertToShamsiDate(to, false, false);

            List<BiometryCalculatedDetail> summaries = new List<BiometryCalculatedDetail>();
            using (var db = new EngineContext())
            {
                var personnels = db.Personnels.Where(q => q.WorkGroup.WorkGroupObligatedRanges.Count > 0)
                    .ToList();
                foreach (var personnel in personnels)
                {
                    var det = SummaryHelperGetTimeSheetForOnePersonnel(personnel.Id, from, to);
                    det.PersonnelName = personnel.Name + " " + personnel.LastName;
                    det.Id = personnel.Id;
                    summaries.Add(det);
                }

                var dt = GetAllPersonnelTotalSummaryTimesheetDataTable(
                    summaries, false);

                return Json(dt, JsonRequestBehavior.AllowGet);
            }
        }

        private IDataTable GetAllPersonnelTotalSummaryTimesheetDataTable
            (List<BiometryCalculatedDetail> summaries, bool withform)
        {
            var res = new DynaDataTable()
            {
                RecordsList = summaries.Cast<dynamic>().ToList(),
                Headers = new Dictionary<string, string>
                {
                    {"Id", "شماره پرسنلی"},
                    {"PersonnelName", "نام پرسنل"},
                    {"TotalStr", "کل ساعت حظور"},
                    {"TotalAbsenceStr", "کسری کار وغیبت"},
                    {"TotalOvertimeStr", "اضافه کاری"},
                    {"InValidStr", "غیر مجاز"},
                    {"ShiftWorkStr", "نوبت کاری"},
                    {"NightWorkStr", "شب کاری"},
                    {"MissionWorkStr", "ماموریت"},
                    {"HolidayWorkStr", "تعطیل کاری"},
                    {"VacationStr", "مرخصی"},
                    {"TotalValidStr", "کارکرد موظف"},
                }
            };
            SetDynamicTableViewDataHelper(res,
                formActionName: "GetAllPersonnelTotalSummaryTimesheet", withform: withform);

            return res;
        }

        private BiometryCalculatedDetail SummaryHelperGetTimeSheetForOnePersonnel(
            long personnelId, DateTime @from, DateTime to)
        {
            var biometricData = _service.GetBiometricData(personnelId, from, to);

            var obligatedRange = _service.GetObligatedRange(personnelId);

            List<BiometryCalculatedDetail> taradodInfoCalculated =
                _service.CompareAndJoin(from, to, biometricData, obligatedRange);

            BiometryCalculatedDetail totalCalculated = _service.CalculateTotal(taradodInfoCalculated);

            return totalCalculated;
        }
    }
}