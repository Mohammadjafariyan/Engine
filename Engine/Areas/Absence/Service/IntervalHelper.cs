using System;
using System.Collections.Generic;
using System.Linq;
using Engine.Absence.Models;
using Engine.Areas.Absence.Models;
using Microsoft.Ajax.Utilities;
using WebGrease.Css.Extensions;

namespace Engine.Areas.Absence.Service
{
    public class IntervalHelper
    {
        public static List<DateTime?> ToOneOrderedTimeList(ICollection<BiometricDataTime> workdayBiometricDataTimes,
            List<ObligatedRangeDayTimes> obligatedRangeDayTimeses)
        {
            List<BiometryCalculatedDetailTime> orderedList = new List<BiometryCalculatedDetailTime>();

            List<DateTime?> orderedTimes = new List<DateTime?>();
            foreach (var obligatedRangeDayTimese in obligatedRangeDayTimeses)
            {
                orderedList.Add(IntervalHelper.ToInterval(obligatedRangeDayTimese));
            }

            foreach (var worktime in workdayBiometricDataTimes)
            {
                orderedList.Add(IntervalHelper.ToInterval(worktime));
            }

            orderedList.ForEach(o =>
            {
                orderedTimes.Add(o.TimeIn);
                orderedTimes.Add(o.TimeOut);
            });
            
            orderedTimes = orderedTimes.Where(o => o.HasValue).DistinctBy(o=>o.Value).OrderBy(o => o.Value).ToList();

       //     orderedTimes.Add(new DateTime(orderedTimes.ElementAt(0).Value.Ticks));
            return orderedTimes;
        }

        public static BiometryCalculatedDetailTime ToInterval(BiometricDataTime obligationRange)
        {
            return new BiometryCalculatedDetailTime
            {
                TimeIn = obligationRange.TimeIn,
                TimeOut = obligationRange.TimeOut,
            };
        }

        public static BiometryCalculatedDetailTime ToInterval(ObligatedRangeDayTimes obligationRange)
        {
            return new BiometryCalculatedDetailTime
            {
                TimeIn = obligationRange.Start,
                TimeOut = obligationRange.End,
                RangeTimeIn = obligationRange.Start,
                RangeTimeOut = obligationRange.End,
            };
        }

        public static ObligatedRangeDayTimes IsInRanges(DateTime? from, DateTime? to,
            List<ObligatedRangeDayTimes> obligatedRangeDayTimeses)
        {
            if (!from.HasValue || !to.HasValue)
            {
                throw new Exception("تاریخ بازه از یا تا نال است ");
            }
            
            foreach (var dayTimese in obligatedRangeDayTimeses)
            {
                if (dayTimese.Start <= from.Value && dayTimese.End >= to.Value)
                {
                    return dayTimese;
                }
            }

            return null;
        }

        public static BiometricDataTime IsInWorkTimes(DateTime? from, DateTime? to,
            ICollection<BiometricDataTime> workdayBiometricDataTimes)
        {
            if (!from.HasValue || !to.HasValue)
            {
                throw new Exception("تاریخ بازه از یا تا نال است ");
            }
            foreach (var dayTimese in workdayBiometricDataTimes)
            {
                /*bool isTwoDay = false;
                var daydiff=(dayTimese.TimeOut.Date - dayTimese.TimeIn.Date).Days;
                if(daydiff>1)
                    throw new Exception("اطلاعات ورود و خروج اشتباه است و بیش از یک روز را نشان می دهد");
                if (daydiff == 1)
                    isTwoDay = true;
                if (!isTwoDay)
                {*/
                    if (dayTimese.TimeIn <= from.Value && dayTimese.TimeOut >= to.Value)
                    {
                        return dayTimese;
                    }
                /*}
                else
                {
                    var s1 = dayTimese.TimeIn.TimeOfDay;
                    var e1=new DateTime(2018,1,1,23,59,59).AddDays(1);

                    var s2=new DateTime(2018,1,1,0,0,0).AddDays(1);
                    var e2=dayTimese.TimeOut.TimeOfDay;

                    if (s1 <= from.Value.TimeOfDay && e1.TimeOfDay >= to.Value.TimeOfDay)
                    {
                        return dayTimese;
                    }else if (s2.TimeOfDay <= from.Value.TimeOfDay && e2 >= to.Value.TimeOfDay)
                    {
                        return dayTimese;
                    }
                }*/

              
               
            }
            return null;
        }
    }
}