using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Newtonsoft.Json;
using ServiceLayer.Absence;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Absence.Controllers
{
    public class ObligatedRangeController : EBaseAppController<ObligatedRange,CommonParameter>
    {
        public static readonly string Error = "Error";

        public ObligatedRangeController()
        {
            _engineService=new ObligatedRangesService();
        }

        // GET
        public ActionResult Index()
        {
            return View();
        }
        
        


        [HttpGet]
        public ActionResult GetById(long Id)
        {
            try
            {
                var  json="";
                using (var db = new EngineContext())
                {
                    var obl = db.ObligatedRanges.Where(f=>f.Id== Id)
                        .Include(s=>s.ObligatedRangeWeeks)
                        .Include(s=>s.ObligatedRangeWeeks.Select(d=>d.ObligatedRangeDayTimes))
                        .FirstOrDefault();
                    if (obl == null)
                    {
                        throw new Exception("یافت نشد");
                    }

                     json=JsonConvert.SerializeObject(obl,new JsonSerializerSettings
                     {
                         ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                     }) ;
                }

                var obj = JsonConvert.DeserializeObject<ObligatedRange>(json);

                return Json(new CustomResult {result = obj, Status = CustomResultType.success},JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new CustomResult {Message = e.Message, Status = CustomResultType.fail},JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult Save(ObligatedRange obligatedRange)
        {
            try
            {
             _engineService.Save(obligatedRange);
                return Json(new CustomResult {result =obligatedRange.Id, Message = "با موفقیت ثبت شد", Status = CustomResultType.success},JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new CustomResult {result =obligatedRange.Id,Message = e.Message, Status = CustomResultType.fail},JsonRequestBehavior.AllowGet);
            }
        }
    }
}