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
            foreach (var dayTimese in obligatedRangeDayTimeses)
            {
                if (dayTimese.Start <= from && dayTimese.End >= to)
                {
                    return dayTimese;
                }
            }

            return null;
        }

        public static BiometricDataTime IsInWorkTimes(DateTime? from, DateTime? to,
            ICollection<BiometricDataTime> workdayBiometricDataTimes)
        {
            foreach (var dayTimese in workdayBiometricDataTimes)
            {
                if (dayTimese.TimeIn <= from && dayTimese.TimeOut >= to)
                {
                    return dayTimese;
                }
            }
            return null;
        }
    }
}