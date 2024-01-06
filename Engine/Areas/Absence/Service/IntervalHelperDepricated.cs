using System.Collections.Generic;
using System.Linq;
using Engine.Areas.Absence.Models;
using Engine.Entities.Data.Absence.Models;

namespace Engine.Areas.Absence.Service
{
    public class IntervalHelperDepricated
    {
        public static List<BiometryCalculatedDetailTime> RemoveInterval(BiometryCalculatedDetailTime detailTime,
            BiometryCalculatedDetailTime remain)
        {
            List<BiometryCalculatedDetailTime> generated = new List<BiometryCalculatedDetailTime>();

            //تایم ورود و خروج و بازه برابر 
            if (detailTime.TimeIn == remain.TimeIn && detailTime.TimeOut == remain.TimeOut)
            {
                detailTime.Type = BiometryCalculatedDetailTimeType.Valid;
                generated.Add(detailTime);
            }

            BiometryCalculatedDetailTime bigger;
            BiometryCalculatedDetailTime small;
            // detailTime is bigger
            //کارکرد بزرگتر از بازه
            if (detailTime.TimeIn <= remain.TimeIn && detailTime.TimeOut >= remain.TimeOut)
            {
                bigger = detailTime;
                small = remain;

                var s1 = new BiometryCalculatedDetailTime
                {
                    TimeIn = bigger.TimeIn,
                    TimeOut = small.TimeIn,
                    Type = BiometryCalculatedDetailTimeType.HurryUp
                };


                var s2 = new BiometryCalculatedDetailTime
                {
                    TimeIn = small.TimeOut,
                    TimeOut = bigger.TimeOut,
                    Type = BiometryCalculatedDetailTimeType.Overtime
                };

                if (s1.TimeIn != s1.TimeOut)
                    generated.Add(s1);
                generated.Add(small);
                if (s2.TimeIn != s2.TimeOut)
                    generated.Add(s2);
            }
            // remain is bigger
            // بازه بزرگ تر از کارکرد
            else if (remain.TimeIn <= detailTime.TimeIn && remain.TimeOut >= detailTime.TimeOut)
            {
                bigger = remain;
                small = detailTime;

                //قبل - ورود 
                var s1 = new BiometryCalculatedDetailTime
                {
                    TimeIn = bigger.TimeIn,
                    TimeOut = small.TimeIn,
                    Type = BiometryCalculatedDetailTimeType.Delay
                };

                // بعد - خروج
                var s2 = new BiometryCalculatedDetailTime
                {
                    TimeIn = small.TimeOut,
                    TimeOut = bigger.TimeOut,
                    Type = BiometryCalculatedDetailTimeType.HurryUp
                };

                if (s1.TimeIn != s1.TimeOut)
                    generated.Add(s1);
                generated.Add(small);
                if (s2.TimeIn != s2.TimeOut)
                    generated.Add(s2);
            }
            // timein bewteen in and out  is bigger
            // ورودی یا خروجی بازه موظفی کوچک در داخل بازه کارکرد قرار دارد 
            else if (detailTime.TimeIn <= remain.TimeIn &&
                     detailTime.TimeOut >= remain.TimeIn)
            {
                //قبل - ورود 
                var s1 = new BiometryCalculatedDetailTime
                {
                    TimeIn = remain.TimeIn,
                    TimeOut = detailTime.TimeOut,
                    Type = BiometryCalculatedDetailTimeType.Valid
                };

                // بعد - خروج
                var s2 = new BiometryCalculatedDetailTime
                {
                    TimeIn = detailTime.TimeIn,
                    TimeOut = remain.TimeIn,
                    Type = BiometryCalculatedDetailTimeType.NotValid
                };

                // بعد - خروج
                var s3 = new BiometryCalculatedDetailTime
                {
                    TimeIn = detailTime.TimeOut,
                    TimeOut = remain.TimeOut,
                    Type = BiometryCalculatedDetailTimeType.Absence
                };

                generated.Add(s1);
                if (s3.TimeIn != s3.TimeOut)
                    generated.Add(s3);
                if (s2.TimeIn != s2.TimeOut)
                    generated.Add(s2);
            }
            else if (detailTime.TimeIn <= remain.TimeOut &&
                     detailTime.TimeOut >= remain.TimeOut)
            {
                //قبل - ورود 
                var s1 = new BiometryCalculatedDetailTime
                {
                    TimeIn = remain.TimeIn,
                    TimeOut = detailTime.TimeIn,
                    Type = BiometryCalculatedDetailTimeType.NotValid
                };

                // بعد - خروج
                var s2 = new BiometryCalculatedDetailTime
                {
                    TimeIn = detailTime.TimeIn,
                    TimeOut = remain.TimeOut,
                    Type = BiometryCalculatedDetailTimeType.Valid
                };

                // بعد - خروج
                var s3 = new BiometryCalculatedDetailTime
                {
                    TimeIn = remain.TimeOut,
                    TimeOut = detailTime.TimeOut,
                    Type = BiometryCalculatedDetailTimeType.Absence
                };

                if (s1.TimeIn != s1.TimeOut)
                    generated.Add(s1);
                generated.Add(s3);
                if (s2.TimeIn != s2.TimeOut)
                    generated.Add(s2);
            }
            else
            {
            }

            return generated;
        }

        public static List<BiometryCalculatedDetailTime> CompareAndGetIntervals(ICollection<BiometricDataTime>
                workdayTimes,
            List<ObligatedRangeDayTimes> obligationRanges)
        {
            List<BiometryCalculatedDetailTime> allWorkDayTimes = new List<BiometryCalculatedDetailTime>();
            foreach (var obligationRange in obligationRanges)
            {
                List<BiometryCalculatedDetailTime> allWorkTimesInRange =
                    IntervalHelperDepricated.GetAllRelatdIntervals(obligationRange, workdayTimes);


                BiometryCalculatedDetailTime remain = IntervalHelperDepricated.ToInterval(obligationRange);
                var res = IntervalHelperDepricated.RemoveFromRangeAndGetRemain(remain, allWorkTimesInRange);


                allWorkDayTimes.AddRange(res);
            }

            return allWorkDayTimes;
        }

        private static List<BiometryCalculatedDetailTime> RemoveFromRangeAndGetRemain(
            BiometryCalculatedDetailTime remain
            , List<BiometryCalculatedDetailTime> allWorkTimesInRange)
        {
            List<BiometryCalculatedDetailTime> _remain = new List<BiometryCalculatedDetailTime>();
            List<BiometryCalculatedDetailTime> intervals = new List<BiometryCalculatedDetailTime>();
            _remain.Add(remain);

            foreach (var detailTime in allWorkTimesInRange)
            {
                foreach (var rm in _remain.ToList())
                {
                    var res = IntervalHelperDepricated.RemoveInterval(detailTime, rm);

                    intervals.AddRange(res);

                    if (res.Count > 0)
                        _remain.Remove(rm);
                    _remain.AddRange( intervals.Where(i => i.Type == BiometryCalculatedDetailTimeType.NotValid ||
                                                   i.Type == BiometryCalculatedDetailTimeType.HurryUp ||
                                                   i.Type == BiometryCalculatedDetailTimeType.Delay ||
                                                   i.Type == BiometryCalculatedDetailTimeType.Absence ||
                                                   i.Type == BiometryCalculatedDetailTimeType.Overtime).ToList());
                    intervals = intervals.Where(i => i.Type == BiometryCalculatedDetailTimeType.Valid).ToList();
                }
            }

            return intervals;
        }

        private static BiometryCalculatedDetailTime ToInterval(ObligatedRangeDayTimes obligationRange)
        {
            return new BiometryCalculatedDetailTime
            {
                TimeIn = obligationRange.Start,
                TimeOut = obligationRange.End,
                RangeTimeIn = obligationRange.Start,
                RangeTimeOut = obligationRange.End,
            };
        }

        private static List<BiometryCalculatedDetailTime> GetAllRelatdIntervals
        (ObligatedRangeDayTimes obligationRange
            , ICollection<BiometricDataTime> workdayTimes)
        {
            List<BiometryCalculatedDetailTime> list = new List<BiometryCalculatedDetailTime>();

            ///در داخل بازه است یا خیر

            foreach (var t in workdayTimes)
            {
                var interval = new BiometryCalculatedDetailTime();

                if (obligationRange.Start <= t.TimeIn && obligationRange.End >= t.TimeIn
                    || obligationRange.Start <= t.TimeOut && obligationRange.End >= t.TimeOut)
                {
                    interval.TimeIn = t.TimeIn;
                    interval.TimeOut = t.TimeOut;
                    interval.RangeTimeIn = obligationRange.Start;
                    interval.RangeTimeOut = obligationRange.End;
                }
                else if (t.TimeIn <= obligationRange.Start && t.TimeOut >= obligationRange.Start
                         || t.TimeIn <= obligationRange.End && t.TimeOut >= obligationRange.End)
                {
                    interval.TimeIn = t.TimeIn;
                    interval.TimeOut = t.TimeOut;
                    interval.RangeTimeIn = obligationRange.Start;
                    interval.RangeTimeOut = obligationRange.End;
                }
                else
                {
                    interval.TimeIn = t.TimeIn;
                    interval.TimeOut = t.TimeOut;
                    interval.Type = BiometryCalculatedDetailTimeType.NotValid;
                }

                list.Add(interval);
            }

            return list;
        }
    }
}