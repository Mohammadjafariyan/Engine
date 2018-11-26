using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Engine.Absence.Models;
using Engine.Areas.ReportGenerator.Controllers;
using Newtonsoft.Json;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Absence.Controllers
{
    public class ObligatedRangeController : Controller
    {
        public static readonly string Error = "Error";

        // GET
        public ActionResult Index(long? Id)
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
                    var obl = db.ObligatedRanges.Find(Id);
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
                using (var db = new EngineContext())
                {
                    if (obligatedRange.Id == 0)
                    {
                        db.ObligatedRanges.Add(obligatedRange);
                    }
                    else
                    {
                        var record=db.ObligatedRanges.Find(obligatedRange.Id);
                        db.Entry(record).CurrentValues.SetValues(obligatedRange);
                        
                        
                        
                        foreach (var weekDay in obligatedRange.ObligatedRangeWeeks)
                        {

                            var recordWeekDay=record.ObligatedRangeWeeks.First(w => w.Id == weekDay.Id);

                            db.Entry(recordWeekDay).CurrentValues.SetValues(weekDay);
                            
                            foreach (var time in weekDay.ObligatedRangeDayTimes)
                            {
                                if (time.Id == 0)
                                {
                                    recordWeekDay.ObligatedRangeDayTimes.Add(time);
                                }
                                else if (time.IsRemoved)
                                {
                                    var existTime=recordWeekDay.ObligatedRangeDayTimes.First(t => t.Id == time.Id);
                                    db.Entry(existTime).State = EntityState.Deleted;
                                }
                                else
                                {
                                    var existTime=recordWeekDay.ObligatedRangeDayTimes.First(t => t.Id == time.Id);
                                    db.Entry(existTime).CurrentValues.SetValues(time);
                                    db.Entry(existTime).State = EntityState.Modified;
                                }
                            }                      
                            db.Entry(recordWeekDay).State = EntityState.Modified;

                        }

                        db.Entry(record).State = EntityState.Modified;
                    }

                    db.SaveChanges();
                }

                return Json(new CustomResult {result =obligatedRange.Id, Message = "با موفقیت ثبت شد", Status = CustomResultType.success},JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new CustomResult {result =obligatedRange.Id,Message = e.Message, Status = CustomResultType.fail},JsonRequestBehavior.AllowGet);
            }
        }
    }
}