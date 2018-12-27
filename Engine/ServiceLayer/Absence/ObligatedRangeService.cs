using System;
using System.Linq;
using ServiceLayer.Systems;
using System.Collections.Generic;
using System.Data.Entity;
using ViewModel.ActionTypes;
using System.Data.SqlClient;
using Engine.Absence.Models;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Controllers.AbstractControllers;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.ICore;

namespace ServiceLayer.Absence
{
    /// <summary>
    /// WorkGroupService
    /// WorkGroupService
    /// </summary>
    public class ObligatedRangesService : CommonService<ObligatedRange>
    {
        public override void Save(ObligatedRange obligatedRange)
        {
            using (var db = new EngineContext())
            {
                if (obligatedRange.Id == 0)
                {
                    db.ObligatedRanges.Add(obligatedRange);
                }
                else
                {
                    var record = db.ObligatedRanges.Find(obligatedRange.Id);

                    if (record == null)
                    {
                        throw new JServiceException("رکورد موجود نیست");
                    }

                    db.Entry(record).CurrentValues.SetValues(obligatedRange);


                    foreach (var weekDay in obligatedRange.ObligatedRangeWeeks)
                    {
                        if (weekDay.Id == 0)
                        {
                            record.ObligatedRangeWeeks.Add(weekDay);
                        }
                        else
                        {
                            ObligatedRangeWeeks recordWeekDay = null;
                            recordWeekDay = record.ObligatedRangeWeeks.First(w => w.Id == weekDay.Id);


                            db.Entry(recordWeekDay).CurrentValues.SetValues(weekDay);
                            if (weekDay.IsRemoved)
                            {
                                foreach (var dayTimese in recordWeekDay.ObligatedRangeDayTimes)
                                {
                                    db.Entry(dayTimese).State = EntityState.Deleted;
                                }

                                db.Entry(recordWeekDay).State = EntityState.Deleted;

                                continue;
                            }


                            foreach (var time in weekDay.ObligatedRangeDayTimes)
                            {
                                if (time.Id == 0)
                                {
                                    recordWeekDay.ObligatedRangeDayTimes.Add(time);
                                }
                                else if (time.IsRemoved)
                                {
                                    var existTime = recordWeekDay.ObligatedRangeDayTimes.First(t => t.Id == time.Id);
                                    db.Entry(existTime).State = EntityState.Deleted;
                                }
                                else
                                {
                                    var existTime = recordWeekDay.ObligatedRangeDayTimes.First(t => t.Id == time.Id);
                                    db.Entry(existTime).CurrentValues.SetValues(time);
                                    db.Entry(existTime).State = EntityState.Modified;
                                }
                            }

                            db.Entry(recordWeekDay).State = EntityState.Modified;
                        }
                    }

                    db.Entry(record).State = EntityState.Modified;
                }

                db.SaveChanges();
            }
        }

     

        public override IDataTable GetDataTable(ObligatedRange p)
        {
            using (var db = new EngineContext())
            {
                var dict = new Dictionary<string, string>
                {
                    {"Id", "کد"},
                    {"Name", "نام"},
                    {"OffDay", "روز تعطیلی"},
                };

                var dt = db.ObligatedRanges.ToList();

                var list = dt.Select(s =>
                    new
                    {
                        Id = s.Id,
                        Name = s.Name,
                        OffDay = EngineUtility.GetTranslate(s.OffDay)
                    }
                ).Cast<dynamic>().ToList();

                var dyna = new DynaDataTable
                {
                    Headers = dict,
                    RecordsList = list
                };

                return dyna;
            }
        }

        public override void Delete(long id)
        {
            using (var EngineContext = new EngineContext())
            {
                var record = EngineContext.ObligatedRanges.Find(id);
                if (record == null)
                {
                    throw new JServiceException("رکورد موجود نیست");
                }

                if (record.WorkGroupObligatedRanges.Any())
                {
                    throw new JServiceException("این رکورد در گروه های کاری مورد استفاده قرار گرفته و امکان حذف نیست");
                }

                var times = record.ObligatedRangeWeeks.SelectMany(o => o.ObligatedRangeDayTimes);
                foreach (var w in times.ToList())
                {
                    EngineContext.Entry(w).State = EntityState.Deleted;
                }

                foreach (var w in record.ObligatedRangeWeeks.ToList())
                {
                    EngineContext.Entry(w).State = EntityState.Deleted;
                }

                EngineContext.Entry(record).State = EntityState.Deleted;
                EngineContext.SaveChanges();
            }
        }
    }

   

    
}