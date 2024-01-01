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
    public class CommonBiometricRepository : IBiometricRepository
    {
    }

    public class FakeBiometricRepository : IBiometricRepository
    {
        public Personnel personnel;

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


        public List<ObligatedRangeWeeks> GetWeek()
        {
            var l = new List<ObligatedRangeWeeks>();
            l.Add(GetWeek("شبنه", DayOfWeek.Saturday, 1));
            l.Add(GetWeek("یکشنبه", DayOfWeek.Sunday, 1));
            l.Add(GetWeek("دوشنبه", DayOfWeek.Monday, 1));
            l.Add(GetWeek("سه شنبه", DayOfWeek.Tuesday, 1));
            l.Add(GetWeek("چهارشنبه", DayOfWeek.Wednesday, 1));
            l.Add(GetWeek("پنجشنبه", DayOfWeek.Thursday, 1));
            l.Add(GetWeek("جمعه", DayOfWeek.Friday, 1));
            return l;
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
                    Name = "شیفت کار عادی",
                };
                db.WorkGroups.Add(workgroup);
                
                personnel = new Personnel
                {
                    Name = "mohammad",
                    LastName = "Jafaryan",
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

                var obligaterange = new ObligatedRange
                {
                    Name = "شیف کار",
                    OffDay = DayOfWeek.Friday,
                    ObligatedRangeWeeks = GetWeek()
                };
                db.ObligatedRanges.Add(obligaterange);

                SetTimesShift(obligaterange.ObligatedRangeWeeks.ToList());
               
                var bio = GetBiometryData(machineperson);
                db.BiometricDatas.Add(bio);


                var workgroupRange = new WorkGroupObligatedRange
                {
                    ObligatedRange = obligaterange,
                    WorkGroup = workgroup
                };


                db.WorkGroupObligatedRanges.Add(workgroupRange);


                db.SaveChanges();
            }
        }

        private BiometricData GetBiometryData(PersonnelMachine machineperson)
        {
            var bio = new BiometricData();
            bio.Date = DateTime.Now;
            bio.PersonnelMachine = machineperson;
            bio.BiometricDataTimes.Add(new BiometricDataTime
            {
                TimeIn = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 7, 30, 20),
                TimeOut = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 9, 30, 10),
            });


            bio.BiometricDataTimes.Add(new BiometricDataTime
            {
                TimeIn = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 11, 00, 20),
                TimeOut = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 12, 0, 0),
            });


            bio.BiometricDataTimes.Add(new BiometricDataTime
            {
                TimeIn = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 16, 15, 20),
                TimeOut = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 17, 45, 1),
            });

            bio.BiometricDataTimes.Add(new BiometricDataTime
            {
                TimeIn = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 19, 59, 58),
                TimeOut = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.AddDays(1).Day, 1, 0, 0),
            });

            return bio;
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