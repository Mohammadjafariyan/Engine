using System;
using System.Data.Entity;
using System.Web.Mvc;
using Engine.Absence.Models;
using Engine.Areas.ReportGenerator.Controllers;
using WebAppIDEEngine.Models;

namespace Engine.Areas.App.Controllers
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
                using (var db = new EngineContext())
                {
                    var obl = db.ObligatedRanges.Find(Id);
                    if (obl == null)
                    {
                        throw new Exception("یافت نشد");
                    }

                    return Json(new CustomResult {result = obl, Status = CustomResultType.fail});
                }
            }
            catch (Exception e)
            {
                return Json(new CustomResult {Message = e.Message, Status = CustomResultType.fail});
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
                        foreach (var weekDay in obligatedRange.ObligatedRangeWeeks)
                        {
                            db.Entry(weekDay).State = EntityState.Modified;

                            foreach (var time in weekDay.ObligatedRangeDayTimes)
                            {
                                if (time.Id == 0)
                                {
                                    db.Entry(weekDay).State = EntityState.Added;
                                }
                                else if (time.IsRemoved)
                                {
                                    db.Entry(weekDay).State = EntityState.Deleted;
                                }
                                else
                                {
                                    db.Entry(weekDay).State = EntityState.Modified;
                                }
                            }
                        }

                        db.Entry(obligatedRange).State = EntityState.Modified;
                    }

                    db.SaveChanges();
                }

                return Json(new CustomResult {Message = "با موفقیت ثبت شد", Status = CustomResultType.success});
            }
            catch (Exception e)
            {
                return Json(new CustomResult {Message = e.Message, Status = CustomResultType.fail});
            }
        }
    }
}