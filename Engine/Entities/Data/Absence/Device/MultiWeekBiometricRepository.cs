using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Engine.Absence.Models;
using Engine.Areas.Absence.Models;
using Engine.Entities.Data;
using WebAppIDEEngine.Models;

namespace Engine.Absence.Device
{
    public class MultiWeekFakeBiometricRepository : IBiometricRepository
    {
        public Personnel personnel;
        public WorkGroupObligatedRange workgroupRange;

        public IQueryable<BiometricData> GetAll()
        {
            using (var db = new EngineContext())
            {
                return db.BiometricDatas;
            }
        }

        public void SetTimesShift(List<ObligatedRangeWeeks> week)
        {
            var sat = week.First(d => d.DayOfWeek == DateTime.Now.DayOfWeek);
            sat.ObligatedRangeDayTimes.Add(new ObligatedRangeDayTimes
            {
                Start = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 8, 0, 0),
                End = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 12, 0, 0),
                RangeType = RangeType.Normal
            });


            sat.ObligatedRangeDayTimes.Add(new ObligatedRangeDayTimes
            {
                Start = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 16, 0, 0),
                End = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 18, 0, 0),
                RangeType = RangeType.Normal
            });


            sat.ObligatedRangeDayTimes.Add(new ObligatedRangeDayTimes
            {
                Start = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 19, 0, 0),
                End = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59),
                RangeType = RangeType.Normal
            });


            sat.ObligatedRangeDayTimes.Add(new ObligatedRangeDayTimes
            {
                Start = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.AddDays(1).Day, 0, 0, 0),
                End = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.AddDays(1).Day, 1, 0, 0),
                RangeType = RangeType.Overtime
            });
        }


        public List<ObligatedRangeWeeks> GetWeek(int weekNumber)
        {
            var l = new List<ObligatedRangeWeeks>();
            l.Add(GetWeek("شبنه", DayOfWeek.Saturday, weekNumber));
            l.Add(GetWeek("یکشنبه", DayOfWeek.Sunday, weekNumber));
            l.Add(GetWeek("دوشنبه", DayOfWeek.Monday, weekNumber));
            l.Add(GetWeek("سه شنبه", DayOfWeek.Tuesday, weekNumber));
            l.Add(GetWeek("چهارشنبه", DayOfWeek.Wednesday, weekNumber));
            l.Add(GetWeek("پنجشنبه", DayOfWeek.Thursday, weekNumber));
            l.Add(GetWeek("جمعه", DayOfWeek.Friday, weekNumber));
            return l;
        }

        public ObligatedRange GetNewObligatedRange()
        {
            var obligatedRangeWeeks = GetWeek(1);
            var w2 = GetWeek(2);
            var w3 = GetWeek(3);
            obligatedRangeWeeks.AddRange(w2);
            obligatedRangeWeeks.AddRange(w3);
            var obligaterange = new ObligatedRange
            {
                Name = "شیف کار",
                OffDay = DayOfWeek.Friday,
                ObligatedRangeWeeks = obligatedRangeWeeks
            };

            return obligaterange;
        }

        public ObligatedRangeWeeks GetWeek(string name, DayOfWeek t, int weekid)
        {
            return new ObligatedRangeWeeks
            {
                Name = name,
                DayOfWeek = t,
                WeekNumber = weekid,
            };
        }

        public void init()
        {
            using (var db = new EngineContext())
            {
                var workgroup = new WorkGroup
                {
                    Name = "شیفت چهار هفته ای",
                };
                db.WorkGroups.Add(workgroup);

                personnel = new Personnel
                {
                    Name = "بهزاد",
                    LastName = "خوشاوند",
                };
                db.Personnels.Add(personnel);

                var machine = new Machine
                {
                    Name = "Samsung"
                };
                db.Machines.Add(machine);


                var machineperson = new PersonnelMachine
                {
                    Machine = machine,
                    Personnel = personnel
                };
                db.PersonnelMachines.Add(machineperson);


                var w1 = GetWeek(1); //روزکار
                var w2 = GetWeek(2); //شب کار

                SetDayShifts(w1);
                SetNightShifts(w2);

                var obligatedRangeWeeks = w1;
                obligatedRangeWeeks.AddRange(w2);
                var obligaterange = new ObligatedRange
                {
                    Name = "شیف کار",
                    OffDay = DayOfWeek.Friday,
                    ObligatedRangeWeeks = obligatedRangeWeeks
                };
                db.ObligatedRanges.Add(obligaterange);

                // SetTimesShift(obligaterange.ObligatedRangeWeeks.ToList());

                DateTime date;
                var bio = GetBiometryDataDays(machineperson, out date);
                var nights = GetBiometryDataNights(machineperson, date);
              
                db.BiometricDatas.AddRange(bio);
                db.BiometricDatas.AddRange(nights);


                var workgroupRange = new WorkGroupObligatedRange
                {
                    ObligatedRange = obligaterange,
                    WorkGroup = workgroup,
                    DateTime = DateTime.Now
                };


                this.workgroupRange = workgroupRange;
                
                db.WorkGroupObligatedRanges.Add(workgroupRange);


                db.SaveChanges();
            }
        }

        private void SetNightShifts(List<ObligatedRangeWeeks> w1)
        {
            foreach (var day in w1)
            {
                var normal = new ObligatedRangeDayTimes();
                normal.Start = new DateTime(2018, 1, 1, 20, 0, 0);
                normal.End = new DateTime(2018, 1, 1, 22, 0, 0);
                normal.RangeType = RangeType.Overtime;

                /*var intime = new ObligatedRangeDayTimes();
                intime.Start = new DateTime(2018, 1, 1, 22, 0, 0);
                intime.End = new DateTime(2018, 1, 1, 0, 0, 0);
                intime.RangeType = RangeType.NightWork;*/

                
                var intime2 = new ObligatedRangeDayTimes();
                intime2.Start = new DateTime(2018, 1, 1, 22, 0, 0);
                intime2.End = new DateTime(2018, 1, 2, 6, 0, 0);
                intime2.RangeType = RangeType.NightWork;
                intime2.IsTwoDay = true;


                day.ObligatedRangeDayTimes.Add(normal);
             //   day.ObligatedRangeDayTimes.Add(intime);
                day.ObligatedRangeDayTimes.Add(intime2);
            }
        }

        private void SetDayShifts(List<ObligatedRangeWeeks> w1)
        {
            foreach (var day in w1)
            {
                var intime = new ObligatedRangeDayTimes();
                intime.Start = new DateTime(2018, 1, 1, 8, 0, 0);
                intime.End = new DateTime(2018, 1, 1, 16, 0, 0);
                intime.RangeType = RangeType.Normal;

                var overwork = new ObligatedRangeDayTimes();
                overwork.Start = new DateTime(2018, 1, 1, 16, 0, 0);
                overwork.End = new DateTime(2018, 1, 1, 18, 0, 0);
                overwork.RangeType = RangeType.Overtime;

                day.ObligatedRangeDayTimes.Add(intime);
                day.ObligatedRangeDayTimes.Add(overwork);
            }
        }

        private List<BiometricData> GetBiometryDataNights
            (PersonnelMachine machineperson, DateTime day)
        {
            List<BiometricData> dates = new List<BiometricData>();
   
           
            //sat
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 20, 30, 20),
                        TimeOut = new DateTime(day.Year, day.Month, day.AddDays(1).Day, 6, 0, 10),
                    }
                }
            });
// sun
            day = day.AddDays(1);
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 19, 45, 20),
                        TimeOut = new DateTime(day.Year, day.Month, day.AddDays(1).Day, 6, 0, 15),
                    }
                }
            });

//mon
            day = day.AddDays(1);
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 20, 17, 20),
                        TimeOut = new DateTime(day.Year, day.Month, day.AddDays(1).Day, 6, 0, 1),
                    }
                }
            });

            /*
            // tue
            day= day.AddDays(1);
            bio.BiometricDataTimes.Add(new BiometricDataTime
            {
                TimeIn = new DateTime(day.Year, day.Month, day.Day, 21, 59, 48),
                TimeOut = new DateTime(day.Year, day.Month,day.AddDays(1).Day, 5, 59, 0),
            });
            */

            // wed
            day = day.AddDays(1);
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 22, 0, 58),
                        TimeOut = new DateTime(day.Year, day.Month, day.AddDays(1).Day, 6, 0, 0),
                    }
                }
            });
            // th
            day = day.AddDays(1);
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 18, 30, 58),
                        TimeOut = new DateTime(day.Year, day.Month, day.AddDays(1).Day, 6, 10, 0),
                    }
                }
            });

            //frid

            day = day.AddDays(1);
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 18, 0, 58),
                        TimeOut = new DateTime(day.Year, day.Month, day.AddDays(1).Day, 6, 0, 0),
                    }
                }
            });

            return dates;
        }

        private List<BiometricData> GetBiometryDataDays(PersonnelMachine machineperson, out DateTime dateTime)
        {

            List<BiometricData> dates = new List<BiometricData>();
            var day = DateTime.Now;
   
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 8, 30, 20),
                        TimeOut = new DateTime(day.Year, day.Month, day.Day, 18, 30, 10),
                    }
                }
            });

// sun
            day = day.AddDays(1);
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 8, 0, 20),
                        TimeOut = new DateTime(day.Year, day.Month, day.Day, 17, 59, 15),
                    }
                }
            });
            
//mon
            day = day.AddDays(1);
            
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 8, 17, 20),
                        TimeOut = new DateTime(day.Year, day.Month, day.Day, 18, 45, 1),
                    }
                }
            });

            // tue
            day = day.AddDays(1);
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 7, 59, 58),
                        TimeOut = new DateTime(day.Year, day.Month, day.Day, 17, 0, 0),
                    }
                }
            });

            // wed
            day = day.AddDays(1);
            
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 7, 59, 58),
                        TimeOut = new DateTime(day.Year, day.Month, day.Day, 17, 0, 0),
                    }
                }
            });
            // th
            day = day.AddDays(1);
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 7, 30, 58),
                        TimeOut = new DateTime(day.Year, day.Month, day.Day, 18, 10, 0),
                    }
                }
            });

            //frid

            day = day.AddDays(1);
            
            dates.Add(new BiometricData
            {
                Date = day,
                PersonnelMachine = machineperson,
                BiometricDataTimes=new List<BiometricDataTime>
                {
                    new BiometricDataTime
                    {
                        TimeIn = new DateTime(day.Year, day.Month, day.Day, 9, 0, 58),
                        TimeOut = new DateTime(day.Year, day.Month, day.Day, 18, 0, 0),
                    }
                }
            });

            dateTime = day;

            return dates;
        }

        public IQueryable<BiometricData> GetBetween(long userId, DateTime now, DateTime addDays)
        {
            using (var db = new EngineContext())
            {
                var dt = db.BiometricDatas.AsQueryable();

                dt = dt.Where(d => d.UserId == userId);
                dt = dt.Where(d => d.Date >= now);
                dt = dt.Where(d => d.Date < addDays);
                return dt;
            }
        }
    }
}