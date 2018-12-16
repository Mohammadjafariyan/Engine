using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using Engine.Absence.Models;
using ServiceLayer.Absence;
using ServiceLayer.Systems;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Absence.Service
{
    public class BiometricRawDataService :CommonService<BiometricRawData>
    {
        public override void Save(BiometricRawData model)
        {
            using (var db = new EngineContext())
            {
                var todaytimes = db.BiometricRawDatas
                    .Where(d => d.Date == model.Date).OrderBy(o => o.Time.Value)
                    .ToList();

                var lasttime = todaytimes.LastOrDefault();

                // ورود ندارد و خروج ثبت می کند 
                if (lasttime == null)
                {
                    if (model.Type == BiometricDataType.Out)
                    {
                        throw new JServiceException("کاربر ورود ندارد و امکان ثبت خروج نیست");
                    }
                }
                // خروج دارد و خروج ثبت می کند
                else
                {
                    if (lasttime.Type == BiometricDataType.Out)
                    {
                        throw new JServiceException("قبلا خروج ثبت شده است");
                    }
                }


                var personnel = db.Personnels.Find(model.UserId);
                if (personnel == null)
                {
                    throw new JServiceException("پرسنل یافت نشد");
                }

                var personnelMachine = personnel.PersonnelMachines.FirstOrDefault();
                if (personnelMachine == null)
                {
                    throw new JServiceException("این پرسنل دستگاه تعریف نشده است");
                }

                model.PersonnelMachineId = personnelMachine.Id;
                model.IsManual = true;
            }
        }

        public override IDataTable GetDataTable(BiometricRawData p)
        {
            using (var db = new EngineContext())
            {
                var dict=new Dictionary<string,string>
                {
                    {"Id","کد"},
                    {"Date","تاریخ"},
                    {"Time","زمان"},
                    {"Type","نوع"},
                    {"UserId","پرسنل"},
                };

                var dt = db.BiometricRawDatas.Where(b=>b.IsManual).Include(d=>d.PersonnelMachine).Include(d=>d.PersonnelMachine.Personnel).ToList();
                PersianCalendar pc=new PersianCalendar();
                
                var list=dt.Select(s =>
                    new
                    {
                        Id = s.Id,
                        Name = s.Name,
                        Date = s.Date.HasValue  ? 
                            $@"{pc.GetYear(s.Date.Value)}/{pc.GetMonth(s.Date.Value)}/{pc.GetDayOfMonth(s.Date.Value)}" : "-",
                        Time =  s.Time.HasValue  ?  $@"{s.Time.Value.Hour}:{s.Time.Value.Minute}" : "-",
                        Type = s.Type == BiometricDataType.In ? "ورود" : "خروج",
                        PersonnelMachineId = s.PersonnelMachineId,
                        UserId = s.PersonnelMachine?.Personnel?.Name + " " + s.PersonnelMachine?.Personnel?.LastName
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
    }
}