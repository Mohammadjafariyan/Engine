using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Engine.Absence.Models;
using Engine.Areas.Absence.Models;
using Engine.Areas.Library.Controllers;
using ServiceLayer.Systems;
using WebAppIDEEngine.Models;
using WebGrease.Css.Extensions;

namespace Engine.Areas.Absence.Service
{
    public class PersonnelTaradodInfoService
    {
        public ObligatedRange GetObligatedRange(long personnelId)
        {
            using (EngineContext db = new EngineContext())
            {
                var obligatedRanges = db.ObligatedRanges.Include(d => d.ObligatedRangeWeeks)
                    .Include(d => d.ObligatedRangeWeeks.Select(s => s.ObligatedRangeDayTimes)).Where(o =>
                        o.WorkGroupObligatedRanges.Any(w => w.WorkGroup.Personnels.Any(p => p.Id == personnelId)));
                var obligatedRange = obligatedRanges.First();

                return obligatedRange;
            }
        }

        public List<BiometryCalculatedDetail> CompareAndJoin(DateTime fromDate,
            DateTime toDate, List<BiometricData> biometricData,
            ObligatedRange obligatedRange)
        {
            var totalDays = (toDate.Date - fromDate.Date).TotalDays;
            List<BiometryCalculatedDetail> data = new List<BiometryCalculatedDetail>();
            var firstDay = fromDate;

            for (int i = 0; i < totalDays; i++)
            {
                var vm = new BiometryCalculatedDetail();
                vm.Date = i == 0 ? fromDate : fromDate.AddDays(1);
                fromDate = vm.Date;

                // در کدام روز بازه موظفی قرار دارد ؟
                ObligatedRangeWeeks whichDayInInterval =
                    DetermineDate(firstDay, vm.Date, obligatedRange.ObligatedRangeWeeks);


                // بازه موظفی امروز را بده
                var obligatedRangeDayTimeses =
                    whichDayInInterval.ObligatedRangeDayTimes.OrderBy(t => t.Start.Hour).ToList();

                
                // تاریخ های بازه را به همان روزی می برد که میخواهیم مقایسه های ساعت هارا انجام دهیم
                for (var index = 0; index < obligatedRangeDayTimeses.Count; index++)
                {
                    obligatedRangeDayTimeses[index].Start = new DateTime(vm.Date.Year
                        , vm.Date.Month
                        , vm.Date.Day
                        , obligatedRangeDayTimeses[index].Start.TimeOfDay.Hours
                        , obligatedRangeDayTimeses[index].Start.TimeOfDay.Minutes,
                        obligatedRangeDayTimeses[index].Start.TimeOfDay.Seconds);


                    var enddate = new DateTime(vm.Date.Year
                        , vm.Date.Month
                        , vm.Date.Day
                        , obligatedRangeDayTimeses[index].End.TimeOfDay.Hours
                        , obligatedRangeDayTimeses[index].End.TimeOfDay.Minutes,
                        obligatedRangeDayTimeses[index].End.TimeOfDay.Seconds);

                    // اگر بازه دو روزه ای باشد ، تاریخ پایان یک روز آن طرف تر می رود
                    if (obligatedRangeDayTimeses[index].IsTwoDay)
                    {
                        enddate = enddate.AddDays(1);
                    }

                    obligatedRangeDayTimeses[index].End = enddate;
                }

                // کارکرد امروز را بده
                var workday = biometricData.FirstOrDefault(d => d.Date.Date == vm.Date.Date);


                if (workday == null)
                {
                    // هیچ کارکردی نیست پس کل ان غیبت
                    obligatedRangeDayTimeses.ForEach(o => vm.Times.Add(
                        new BiometryCalculatedDetailTime
                        {
                            RangeTimeIn = o.Start,
                            RangeTimeOut = o.End,
                            TimeIn = o.Start,
                            TimeOut = o.End,
                            Absence = o.End - o.Start,
                            Type = BiometryCalculatedDetailTimeType.Absence
                        }
                    ));
                    CalculateTotalForADay(vm);
                    data.Add(vm);
                    continue;
                }
                // کارکرد دارد

                // کل حضور
                workday.BiometricDataTimes.ForEach(b => vm.Total += b.TimeOut - b.TimeIn);

                // تمامی رنج ساعت های حظور و عدم حظور
                List<DateTime?> intervals =
                    IntervalHelper.ToOneOrderedTimeList(workday.BiometricDataTimes, obligatedRangeDayTimeses);


                // بازه های  حظور و عدم حظور
                List<BiometryCalculatedDetailTime> calculatedIntervals = new List<BiometryCalculatedDetailTime>();
                /*if (intervals.Count % 2 != 0)
                {
                    throw new Exception("اشکال در سیستم تعداد بازه یافت شده زوج نیست");
                }*/

                for (int j = 0; j < intervals.Count; j++)
                {
                    if (j + 1 != intervals.Count)
                    {
                        ObligatedRangeDayTimes range = IntervalHelper.IsInRanges(intervals[j], intervals[j + 1],
                            obligatedRangeDayTimeses);

                        bool isInRange = range != null;

                        BiometricDataTime biometricDataTime =
                            IntervalHelper.IsInWorkTimes(intervals[j], intervals[j + 1], workday.BiometricDataTimes);

                        bool isInWorkTimes = biometricDataTime != null;

                        var detailTime = new BiometryCalculatedDetailTime
                        {
                            TimeIn = intervals[j],
                            TimeOut = intervals[j + 1]
                        };

                        // در ساعات بازه موظفی حضور دارد
                        if (isInRange && isInWorkTimes)
                        {
                            switch (range.RangeType)
                            {
                                case RangeType.Normal:
                                    detailTime.Type = BiometryCalculatedDetailTimeType.Valid;
                                    break;
                                case RangeType.Overtime:
                                    detailTime.Type = BiometryCalculatedDetailTimeType.Overtime;
                                    break;
                                default:
                                    detailTime.Type = BiometryCalculatedDetailTimeType.Valid;
                                    break;
                            }
                        }
                        // در ساعات موضفی حظور ندارد
                        else if (isInRange && !isInWorkTimes)
                        {
                            detailTime.Type = BiometryCalculatedDetailTimeType.Absence;
                        }
                        // حظور دارد اما بازه موظفی نیست
                        else if (!isInRange && isInWorkTimes)
                        {
                            detailTime.Type = BiometryCalculatedDetailTimeType.NotValid;
                        }
                        // نه حظور دارد و نه بازه موظفی است
                        // این مورد نباید پیش بیاید چون تمامی زمان های محاسبه از بازه ها و کارکرد گرفته شده اند
                        else if (!isInRange && !isInWorkTimes)
                        {
                            //throw new Exception("کاربر حضور ندارد و در رنج نیست");
//                           detailTime.Type = BiometryCalculatedDetailTimeType.NotValid;
                            continue;
                        }

                        calculatedIntervals.Add(detailTime);
                    }
                }

                var temp = vm.Times.ToList();
                temp.AddRange(calculatedIntervals);
                vm.Times = temp;
                vm.BiometricData = workday;
                data.Add(vm);
            }


            return data;
        }

        private void CalculateTotalForADay(BiometryCalculatedDetail vm)
        {
            vm.Times.ForEach(t => vm.TotalValid += t.Valid);
            vm.Times.ForEach(t => vm.TotalAbsence += t.Absence);
            vm.Times.ForEach(t => vm.TotalOvertime += t.Overtime);
            vm.Times.ForEach(t => vm.TotalDelayIn += t.DelayIn);
            vm.Times.ForEach(t => vm.TotalHurryOut += t.HurryOut);
        }


        /// <summary>
        /// چندمین روز هفته بازه موظفی است 
        /// </summary>
        private ObligatedRangeWeeks DetermineDate(DateTime firstDay, DateTime today,
            ICollection<ObligatedRangeWeeks> weekInterval)
        {
            var interval = weekInterval.Count / 7;
            var dayofweek = (int) firstDay.DayOfWeek;

            //بازه یک هفته ای
            if (interval == 1)
            {
                return weekInterval.First(w => w.DayOfWeek == today.DayOfWeek);
            }

            // بازه بیش از یک هفته
            // درچندمین هفته هستیم ؟
            var totalDays = (int) Math.Round((today - firstDay).TotalDays);
            // جهت محاسبه 5*1/2
            var week = totalDays / 7;
            var dayInNewWeek = totalDays % 7;

            // اگر بیش از یک هفته بود مثلا دو هفته گذشته پس هفته کنونی باید هفته سوم باشد
            if (dayInNewWeek != 0 && totalDays >= 7)
                week += 1;

            // اگر کمتر از هفت بود یعنی حتی یک هفته نشده است
            if (totalDays <= 7)
                week = 0;

            //در هفته اول
            if (week == 0)
            {
                var firstWeek = weekInterval.Where(w => w.WeekNumber == 1).OrderBy(o => o.DayOfWeek).ToList();
                if (firstWeek.Count() < 7)
                {
                    throw new Exception("تعداد روز های هفته درست نیست");
                }

                return firstWeek.First(w => w.DayOfWeek == today.DayOfWeek);
            }
            else
            {
                //در هفته دوم یا سوم یا ... 

                // باقی مانده تقصیم به هفته ها
                var whichDay = totalDays % 7;

                //چند هفته ای است ؟
                var max = weekInterval.Count / 7;

                // تعداد کل هفته گذشته بر چند هفته ای بودن 
                // چندمین هفته است ؟
                var whichWeekIsNow = week % max;


                // اگر باقی مانده هفته کنونی بر ماکس هفته ها صفر باشد یعنی در هفته اخر هستیم
                if (whichWeekIsNow == 0)
                    whichWeekIsNow = max;

                // اگر هفته کمتر از ماکس باشد یعنی حتی یک دور کامل هم نشده است 
                if (week < max)
                    whichWeekIsNow = week;


                var whichWeek = weekInterval.Where(w => w.WeekNumber == whichWeekIsNow).OrderBy(o => o.DayOfWeek)
                    .ToList();

                return whichWeek.First(w => (int) w.DayOfWeek == whichDay);
            }
        }

        public BiometryCalculatedDetail CalculateTotal(List<BiometryCalculatedDetail> taradodInfo)
        {
            var bioDetail = new BiometryCalculatedDetail();
            foreach (var detail in taradodInfo)
            {
                bioDetail.Total += detail.Total;
                bioDetail.TotalValid += GetTotal(detail.Times, BiometryCalculatedDetailTimeType.Valid);
                bioDetail.TotalAbsence += GetTotal(detail.Times, BiometryCalculatedDetailTimeType.Absence);
                bioDetail.InValid += GetTotal(detail.Times, BiometryCalculatedDetailTimeType.NotValid);
                bioDetail.TotalOvertime += GetTotal(detail.Times, BiometryCalculatedDetailTimeType.Overtime);
            }

            return bioDetail;
        }

        private TimeSpan GetTotal(ICollection<BiometryCalculatedDetailTime> detailTimes
            , BiometryCalculatedDetailTimeType type)
        {
            TimeSpan totalValid = default(TimeSpan);
            /*if (detailTimes.Where(t=>t.Type==type).Any(t => !t.TimeOut.HasValue || !t.TimeIn.HasValue))
            {
                throw  new Exception("زمان ورود یا خروج نال است");
            }*/
            
            detailTimes.Where(t => t.Type == type)
                .ForEach(t => totalValid += (t.TimeOut-t.TimeIn).Value);

            /*
            if (type == BiometryCalculatedDetailTimeType.Valid)
            {
                detailTimes.Where(t => t.Type == type)
                    .ForEach(t => totalValid += t.Valid);
            }
            else if (type == BiometryCalculatedDetailTimeType.Absence)
            {
                detailTimes.Where(t => t.Type == type)
                    .ForEach(t => totalValid += t.Absence);
            }
            else if (type == BiometryCalculatedDetailTimeType.Overtime)
            {
                detailTimes.Where(t => t.Type == type)
                    .ForEach(t => totalValid += t.Overtime);
            }
            else if (type == BiometryCalculatedDetailTimeType.NotValid)
            {
                detailTimes.Where(t => t.Type == type).Where(t => t.TimeOut.HasValue && t.TimeIn.HasValue)
                    .ForEach(t => totalValid += t.TimeOut.Value - t.TimeIn.Value);
            }
            else
            {
                throw new Exception("not implemented type");
            }
*/


            return totalValid;
        }


        public List<BiometricData> GetBiometricData(long personnelId,
            DateTime fromDate, DateTime toDate)
        {
            using (EngineContext db = new EngineContext())
            {
                var dt = db.BiometricDatas.Include("BiometricDataTimes").AsQueryable();
                dt = dt.Where(b => b.Date > fromDate);
                dt = dt.Where(b => b.Date < toDate);
                dt = dt.Where(b => b.PersonnelMachine.PersonnelId == personnelId);

                return dt.ToList();
            }
        }
    }
}