using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using Engine.Areas.Absence.Models;
using Engine.Areas.Absence.Service;
using Engine.Areas.Absence.UiConstructs;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Models;
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
                var user = db.Users
                    .Where(s => s.UserName == User.Identity.Name)
                    .FirstOrDefault();

                if (user == null)
                {
                    throw new Exception("اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید");
                }

                var query = db.Personnels.AsQueryable();
              
                query = query.Where(s=>s.ApplicationUserId==user.Id);

                if (user.PersonnelType==PersonnelTypeEnm.Employee)
                {
                    Personnel personnel = db.GetCurrentUserPersonnel(user.Id, false);

                    query = query.Where(s=>s.WorkplacePersonnels.Any(p=>p.PersonnelId==personnel.Id));
                }

                
                
                ViewData[PersonnelTaradodInfoController.Personnel] = query.ToList();
            }
        }


        public ActionResult Detail(long personnelId, string fromdate, string dateto)
        {
            try
            {
                
                
                CultureInfo persianCulture = new CultureInfo("fa-IR");
                DateTime from_dt = DateTime.ParseExact(fromdate,
                    "yyyy/MM/dd", persianCulture);

                DateTime to_dt = DateTime.ParseExact(dateto,
                    "yyyy/MM/dd", persianCulture);


                using (var db=new EngineContext())
                {
                    var user = db.Users
                        .Where(s => s.UserName == User.Identity.Name)
                        .FirstOrDefault();

                    if (user == null)
                    {
                        throw new Exception("اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید");
                    }

                    var query = db.Personnels.AsQueryable();
              
                    query = query.Where(s=>s.ApplicationUserId==user.Id);

                    if (user.PersonnelType==PersonnelTypeEnm.Employee)
                    {
                        Personnel personnel = db.GetCurrentUserPersonnel(user.Id, false);

                        query = query.Where(s=>s.WorkplacePersonnels.Any(p=>p.PersonnelId==personnel.Id));
                    }


                    if (query.Any(s=>s.Id==personnelId)==false)
                    {
                        throw new Exception("دسترسی ندارید");
                    }
                }
                
                
                GenForm();
                ViewData["personnelId"] = personnelId;
                ViewData["fromdate"] = from_dt;
                ViewData["dateto"] = to_dt;

                var biometricData = _service.GetBiometricData(personnelId, from_dt, to_dt);

                var obligatedRange = _service.GetObligatedRange(personnelId);

                List<BiometryCalculatedDetail> taradodInfoCalculated =
                    _service.CompareAndJoin(from_dt, to_dt, biometricData, obligatedRange);

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
            return View("GetAllPersonnelTotalSummaryTimesheet", new WorkSummary());
        }

        [HttpPost]
        public JsonResult GetAllPersonnelTotalSummaryTimesheet(string from, string to)
        {
            CultureInfo persianCulture = new CultureInfo("fa-IR");
            DateTime from_dt = DateTime.ParseExact(from,
                "yyyy/MM/dd", persianCulture);

            DateTime to_dt = DateTime.ParseExact(to,
                "yyyy/MM/dd", persianCulture);

            ViewData["from"] =
                from_dt; // Engine.Controllers.AbstractControllers.EngineUtility.ConvertToShamsiDate(from, false, false);
            ViewData["to"] =
                to_dt; //Engine.Controllers.AbstractControllers.EngineUtility.ConvertToShamsiDate(to, false, false);

            List<BiometryCalculatedDetail> summaries = new List<BiometryCalculatedDetail>();
            using (var db = new EngineContext())
            {
                
                var user = db.Users
                    .Where(s => s.UserName == User.Identity.Name)
                    .FirstOrDefault();

                if (user == null)
                {
                    throw new Exception("اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید");
                }

                var query = db.Personnels.AsQueryable();
              
                query = query.Where(s=>s.ApplicationUserId==user.Id);

                if (user.PersonnelType==PersonnelTypeEnm.Employee)
                {
                    Personnel personnel = db.GetCurrentUserPersonnel(user.Id, false);

                    query = query.Where(s=>s.WorkplacePersonnels.Any(p=>p.PersonnelId==personnel.Id));
                }


                var personnels = query.Where(q => q.WorkGroup.WorkGroupObligatedRanges.Count > 0)
                    .ToList();
                foreach (var personnel in personnels)
                {
                    var det = SummaryHelperGetTimeSheetForOnePersonnel(personnel.Id, from_dt, to_dt);
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
                    { "Id", "شماره پرسنلی" },
                    { "PersonnelName", "نام پرسنل" },
                    { "TotalStr", "کل ساعت حظور" },
                    { "TotalAbsenceStr", "کسری کار وغیبت" },
                    { "TotalOvertimeStr", "اضافه کاری" },
                    { "InValidStr", "غیر مجاز" },
                    { "ShiftWorkStr", "نوبت کاری" },
                    { "NightWorkStr", "شب کاری" },
                    { "MissionWorkStr", "ماموریت" },
                    { "HolidayWorkStr", "تعطیل کاری" },
                    { "VacationStr", "مرخصی" },
                    { "TotalValidStr", "کارکرد موظف" },
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

    public class WorkSummary
    {
        public DateTime from { get; set; }
        public DateTime to { get; set; }
    }
}