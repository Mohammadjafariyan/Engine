using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.ViewModel;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Engine.ServiceLayer.Engine;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;

namespace Engine.Areas.Mobile.Controllers
{
    public class LastClockController : BaseMobileApiController
    {
        /// <summary>
        ///
        /// scenarios:
        /// obligated: 20:00 - 08:00 for security person
        /// 0- enter at 19:50
        /// 1- exit at 22:00 for some work
        /// 2- exit at 01:00 for specific work
        /// 3- forgot to clock at 9:30
        /// 4- forgot to clock at all 
        /// </summary>
        /// <returns></returns>
        [ActionName("Get")]
        [HttpGet]
        [ResponseType(typeof(LastClock))]
        public ApiResult<LastClock> Get()
        {
            try
            {
                using (var db = new EngineContext())
                {
                    // get user
                    var user = db.Users.FirstOrDefault(s => s.UserName == User.Identity.Name);

                    if (user == null)
                    {
                        return new ApiResult<LastClock>
                        {
                            Message = "اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید"
                        };
                    }


                    // get person object of user
                    var personnelQuery = db.Personnels
                        .Where(s => s.ApplicationUserId == user.Id);

                    var personnel = personnelQuery.FirstOrDefault();
                    if (personnel == null)
                    {
                        personnel = new Personnel()
                        {
                            ApplicationUserId = user.Id,
                            Name = user.FirstName,
                            LastName = user.LastName,
                            Code = user.Code,
                        };
                        db.Personnels.Add(personnel);

                        db.SaveChanges();
                    }


                    var biometricDate =
                        db.BiometricDatas.Where(b =>
                                personnel.WorkplacePersonnels.Any(wp => wp.Id == b.WorkplacePersonnelId)
                                && b.Date.Year == DateTime.Now.Year &&
                                b.Date.Month == DateTime.Now.Month &&
                                b.Date.Day == DateTime.Now.Day
                            ).Include(s => s.BiometricDataTimes)
                            .FirstOrDefault();

                    if (biometricDate == null || biometricDate?.BiometricDataTimes.Count == 0)
                    {
                        return new ApiResult<LastClock>
                        {
                            result = new LastClock
                            {
                                Status = LastClockType.NotYet
                            }
                        };
                    }

                    var last = biometricDate.BiometricDataTimes.OrderByDescending(o => o.TimeIn).FirstOrDefault();

                    if (last == null)
                    {
                        return new ApiResult<LastClock>
                        {
                            result = new LastClock
                            {
                                Status = LastClockType.NotYet
                            }
                        };
                    }


                    LastClockType lastClockType;
                    string message = "";
                    if (!last.TimeIn.HasValue)
                    {
                        lastClockType = LastClockType.NotYet;
                    }
                    else if (last.TimeIn.HasValue && last.TimeOut.HasValue)
                    {
                        lastClockType = LastClockType.Out;
                    }
                    else if (last.TimeIn.HasValue && !last.TimeOut.HasValue)
                    {
                        lastClockType = LastClockType.In;
                    }
                    else
                    {
                        lastClockType = LastClockType.NotYet;
                    }


                    switch (lastClockType)
                    {
                        // NO PROBLEM IN THESE TYPE SO JUST RETURN 
                        case LastClockType.NotYet:
                        case LastClockType.Out:

                            return new ApiResult<LastClock>
                            {
                                result = new LastClock
                                {
                                    Status = lastClockType
                                }
                            };
                        case LastClockType.In:

                            // if clock_in is in today 
                            if (last.TimeIn.HasValue == false || last.TimeIn?.Date == DateTime.Now.Date)
                            {
                                return new ApiResult<LastClock>
                                {
                                    result = new LastClock
                                    {
                                        Status = lastClockType
                                    }
                                };
                            }
                            // if clock_in belongs to yesterday 
                            else if (DateTime.Now.Date.AddDays(-1) == last.TimeIn?.Date)
                            {
                                // if USER HAS ANY DOUBLE DATE IN HIS/HER OBLIGATION 
                                if (isUserHasAnyDoubleDateInHisObligation(db, personnel))
                                {
                                    // if today  is kind of double date 
                                    bool isTodayKindOfDoubleDate = false;
                                    ObligatedRangeWeeks today, yesterday, tomorrow;
                                    GetTodayKindOfDoubleDate(db, personnelQuery, out isTodayKindOfDoubleDate,
                                        out today, out yesterday, out tomorrow);

                                    if (isTodayKindOfDoubleDate)
                                    {

                                        // STATUS IS NOT FORGOTTEN MEANING : IT IS IN OBLIGATED RANGE 
                                        var lastTimeOfYesterDay = yesterday?.ObligatedRangeDayTimes
                                            .Where(s => s.IsTwoDay)
                                            .Max(s => s.End);
                                        
                                        if (lastTimeOfYesterDay.HasValue)
                                        {
                                            
                                            // maximum possible clock out for one day after yesterday 
                                            var clockLimit=lastTimeOfYesterDay.Value.AddDays(1).AddHours(2);
                                            if (DateTime.Now<=clockLimit)
                                            {
                                                // return last clock not yet 
                                                return new ApiResult<LastClock>
                                                {
                                                    result = new LastClock
                                                    {
                                                        Status = LastClockType.In
                                                    }
                                                };
                                            }
                                        }
                                       
                                        // return last clock not yet 
                                        return new ApiResult<LastClock>
                                        {
                                            result = new LastClock
                                            {
                                                Status = LastClockType.NotYet
                                            }
                                        };
                                        
                                    }
                                    // if today is not kind of double date 
                                    else
                                    {
                                        // forget clock
                                        ForgottenClock(db, personnel,biometricDate);
                                        
                                        // return last clock not yet 
                                        return new ApiResult<LastClock>
                                        {
                                            result = new LastClock
                                            {
                                                Status = LastClockType.NotYet
                                            }
                                        };
                                    }
                                }
                                // if clock is not kind of double date
                                else
                                {

                                    // forget clock
                                    ForgottenClock(db, personnel, biometricDate);
                                        
                                    // return last clock not yet 
                                    return new ApiResult<LastClock>
                                    {
                                        result = new LastClock
                                        {
                                            Status = LastClockType.NotYet
                                        }
                                    };
                                }

                            }
                            else
                            {
                                // then SET CLOCK OUT Automatically for forget clock  

                                // forget clock
                                ForgottenClock(db, personnel , biometricDate);
                                        
                                // return last clock not yet 
                                return new ApiResult<LastClock>
                                {
                                    result = new LastClock
                                    {
                                        Status = LastClockType.NotYet
                                    }
                                };
                                
                            }

                            break;
                    }


                    /*var obligatedRangeWeek = db.ObligatedRangeWeekss.SqlQuery(
                            $@"select ObligatedRangeWeeks.* from WorkGroups  
                    inner join Personnels on WorkGroups.Id = Personnels.WorkGroupId

                    inner join WorkGroupObligatedRanges on WorkGroups.Id = WorkGroupObligatedRanges.WorkGroupId 

                    inner join ObligatedRanges on  WorkGroupObligatedRanges.ObligatedRangeId =  ObligatedRanges.Id 

                    inner join ObligatedRangeWeeks  on  ObligatedRangeWeeks .ObligatedRangeId =  ObligatedRanges.Id 

                    inner join ObligatedRangeDayTimes  on  ObligatedRangeDayTimes .ObligatedRangeWeekId =  ObligatedRangeWeeks.Id 

                    where Personnels.Id={personnel.Id} and  ObligatedRangeDayTimes.IsTwoDay=1")
                        .FirstOrDefault();*/


                    return new ApiResult<LastClock>
                    {
                        result = new LastClock
                        {
                            Status = lastClockType,
                            Message = ""
                        }
                    };
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        private void ForgottenClock(EngineContext db, Personnel personnel, BiometricData biometricDate)
        {
            var biometricDataTime = biometricDate.BiometricDataTimes.Where(s => s.TimeIn.HasValue && !s.TimeOut.HasValue)
                .OrderByDescending(s=>s.TimeIn).FirstOrDefault();

            if (biometricDataTime!=null)
            {
                biometricDataTime.TimeOut =DateTime.Now;
                biometricDataTime.IsForgotten = true;

                db.Entry(biometricDataTime).Property(s => s.TimeOut).IsModified = true;
                db.Entry(biometricDataTime).Property(s => s.IsForgotten).IsModified = true;

                db.SaveChanges();
            }
            
        }

        private void GetTodayKindOfDoubleDate(EngineContext db, IQueryable<Personnel> personnelQuery,
            out bool isTodayKindOfDoubleDate, out ObligatedRangeWeeks _today, out ObligatedRangeWeeks _yesterday,
            out ObligatedRangeWeeks _tomorrow)
        {
            personnelQuery = personnelQuery
                .Include(s => s.WorkGroup)
                .Include(s => s.WorkGroup.WorkGroupObligatedRanges)
                .Include(s => s.WorkGroup.WorkGroupObligatedRanges.Select(d => d.ObligatedRange))
                .Include(s =>
                    s.WorkGroup.WorkGroupObligatedRanges.Select(d => d.ObligatedRange.ObligatedRangeWeeks))
                .Include(s => s.WorkplacePersonnels)
                .Include(s => s.WorkplacePersonnels.Select(d => d.Workplace));


            var personnel = personnelQuery.FirstOrDefault();

            if (personnel == null)
            {
                isTodayKindOfDoubleDate = false;
                _today = null;
                _yesterday = null;
                _tomorrow = null;
                return;
            }

            // OBLIGATED RANGE 
            var obligatedRange = personnel.WorkGroup?.WorkGroupObligatedRanges?.Select(s => s.ObligatedRange)
                .FirstOrDefault();

            var startDate = personnel.WorkGroup?.WorkGroupObligatedRanges?.Select(s => s.DateTime)
                .FirstOrDefault();

            if (obligatedRange != null && startDate != null)
            {
                // WHICH INTERVAL IS TODAY AND NOW ?
                int daysToSubstract = (int)startDate?.DayOfWeek - (int)DayOfWeek.Saturday;

                DateTime start = DateTime.Now.AddDays(-daysToSubstract);
                DateTime end = start.AddDays(obligatedRange.ObligatedRangeWeeks.Count * 7);

                bool isInInterval = DateTime.Now.Date >= start && DateTime.Now.Date <= end;

                // TIME OF START IS NOT REACHED YET 
                if (start < DateTime.Now)
                {
                    while (!isInInterval)
                    {
                        start = end;

                        end = start.AddDays(obligatedRange.ObligatedRangeWeeks.Count * 7);

                        isInInterval = DateTime.Now.Date >= start && DateTime.Now.Date <= end;
                    }
                }

                // BE CAREFUL TO DUBLE DAYS 
                // WHICH DAY OF SELECTED INTERVAL IS TODAY ?
                int dayIndexInInterval = (int)(start.Date - DateTime.Now.Date).TotalDays;

               
                obligatedRange.ObligatedRangeWeeks =
                    obligatedRange.ObligatedRangeWeeks.OrderByDescending(o => o.DayOfWeek).ToList();

                var today = obligatedRange.ObligatedRangeWeeks[dayIndexInInterval];

                var linkedList = new LinkedList<ObligatedRangeWeeks>(obligatedRange.ObligatedRangeWeeks);

                LinkedListNode<ObligatedRangeWeeks> currentNode = linkedList.Find(today);

                
                var yesterday = currentNode?.Previous;
                var tomorrow = currentNode?.Next;

               
                _today = today;
                _yesterday = yesterday?.Value ?? linkedList.Last?.Value;
                _tomorrow = tomorrow?.Value ?? linkedList?.First?.Value;

                
                if (_yesterday?.ObligatedRangeDayTimes != null)
                {
                    var timesList = _yesterday.ObligatedRangeDayTimes.Where(o => o.IsTwoDay == true).ToList();
                 
                    foreach (var time in timesList)
                    {
                        var now = DateTime.Now;
                        time.Start = time.Start.AddDays(-1);

                        if (time.Start >= now && time.End <= now)
                        {
                            isTodayKindOfDoubleDate = true;
                            return;
                        }
                    }
                }
            }

            isTodayKindOfDoubleDate = false;
            _today = null;
            _yesterday = null;
            _tomorrow = null;
        }

        private bool isUserHasAnyDoubleDateInHisObligation(EngineContext db, Personnel personnel)
        {
            return db.WorkGroups
                .Any(s =>
                    s.Personnels.Any(p => p.Id == personnel.Id) &&
                    s.WorkGroupObligatedRanges.Any(o => o.ObligatedRange.ObligatedRangeWeeks
                        .Any(ow => ow.ObligatedRangeDayTimes
                            .Any(d => d.IsTwoDay))));
        }
    }


    public class LastClock
    {
        public LastClockType Status { get; set; }
        public string Message { get; set; }
    }

    public enum LastClockType
    {
        NotYet = 0,
        In = 1,
        Out = 2
    }
}