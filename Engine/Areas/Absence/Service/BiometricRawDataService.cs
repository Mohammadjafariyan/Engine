using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using Antlr.Runtime.Misc;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using ServiceLayer.Absence;
using ServiceLayer.Systems;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Absence.Service
{
    public class BiometricRawDataService : CommonService<BiometricRawData>
    {
        public override void Save(BiometricRawData model)
        {
            using (var db = new EngineContext())
            {
                // ثبت جدید 
                var todaytimes = db.BiometricRawDatas
                    .Where(d => d.Date == model.Date).OrderBy(o => o.Time.Value)
                    .ToList();

                var lasttime = todaytimes.LastOrDefault();


                // ویرایش است و نوع آن را تغییر داده است
                if (model.Id != 0 && lasttime?.Type != model.Type 
                    // یا ثبت تازه می کند 
                    || model.Id==0)
                {
                    // ورود ندارد و خروج ثبت می کند 
                    if (lasttime != null && lasttime.Type==model.Type)
                    {
                        if (model.Type == lasttime.Type)
                        {
                            if (lasttime.Type == BiometricDataType.Out)
                                throw new JServiceException("کاربر ورود ندارد و امکان ثبت خروج نیست");
                            else
                                throw new JServiceException("کاربر خروج ندارد و امکان ثبت ورود نیست");
                        }
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

            base.Save(model);
        }

        public override IDataTable GetDataTable(BiometricRawData p, global::System.Func<IQueryable<BiometricRawData>, IQueryable<BiometricRawData>> whereExpression = null)
        {
            using (var db = new EngineContext())
            {
                var dict = new Dictionary<string, string>
                {
                    {"Id", "کد"},
                    {"Date", "تاریخ"},
                    {"Time", "زمان"},
                    {"Type", "نوع"},
                    {"UserId", "پرسنل"},
                };

                var dt = db.BiometricRawDatas.Where(b => b.IsManual).Include(d => d.PersonnelMachine)
                    .Include(d => d.PersonnelMachine.Personnel).ToList();
                PersianCalendar pc = new PersianCalendar();

                var list = dt.Select(s =>
                    new
                    {
                        Id = s.Id,
                        Name = s.Name,
                        Date = s.Date.HasValue
                            ? $@"{pc.GetYear(s.Date.Value)}/{pc.GetMonth(s.Date.Value)}/{pc.GetDayOfMonth(s.Date.Value)}"
                            : "-",
                        Time = s.Time.HasValue ? $@"{s.Time.Value.Hour}:{s.Time.Value.Minute}" : "-",
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