using System;
using System.Collections;
using System.Linq;
using Engine.Absence.Models;
using WebAppIDEEngine.Models;

namespace Engine.Absence.Device
{
    public class CommonBiometricRepository:IBiometricRepository
    {
        
        
    }

    public class FakeBiometricRepository : IBiometricRepository
    {

        public IQueryable<BiometricData> GetAll()
        {
            using (var db = new EngineContext())
            {
                return db.BiometricDatas;
            }
        }

        public void init()
        {
            using (var db = new EngineContext())
            {

                var datetimein = DateTime.Now;
                var datetimeout = DateTime.Now;
                while (db.BiometricDatas.Any(d => d.Date == datetimein))
                {
                    datetimein= datetimein.AddDays(1);
                }
                TimeSpan insde = new TimeSpan(8, 0, 0);
                TimeSpan outside = new TimeSpan(17, 0, 0);
                datetimein = datetimein.Date + insde;
                datetimeout = datetimeout.Date + outside;
                
                db.BiometricDatas.Add(new BiometricData
                {
                    Date = datetimein, Time = datetimein, Type = BiometricDataType.In, MachineId = 655, UserId = 1
                });
                
                db.BiometricDatas.Add(new BiometricData
                {
                    Date = datetimeout, Time = datetimein, Type = BiometricDataType.Out, MachineId = 655, UserId = 1
                });
                
                db.BiometricDatas.Add(new BiometricData
                {
                    Date = datetimein, Time = datetimein, Type = BiometricDataType.In, MachineId = 655, UserId = 2
                });
                
                db.BiometricDatas.Add(new BiometricData
                {
                    Date = datetimeout, Time = datetimeout, Type = BiometricDataType.Out, MachineId = 655, UserId = 2
                });
                
                db.SaveChanges();
            }
        }

        public IQueryable<BiometricData>  GetBetween(long userId,DateTime now, DateTime addDays)
        {
            using (var db = new EngineContext())
            {
                var dt=db.BiometricDatas.AsQueryable();
                
                dt=  dt.Where(d=>d.UserId==userId);
                dt=  dt.Where(d=>d.Date>=now);
                dt=  dt.Where(d=>d.Date<addDays);
                return dt;
            }
        }
    }
}