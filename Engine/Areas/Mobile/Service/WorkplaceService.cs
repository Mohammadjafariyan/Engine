using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Engine.Areas.Mobile.Models;
using Engine.Entities.Data;
using Engine.Service.AbstractControllers;
using ServiceLayer.Absence;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Service
{
    public class WorkplaceService : BaseEngineService<Workplace>
    {
        public override Dictionary<string, string> GetPropertyNames<M>()
        {
            var dic = new Dictionary<string, string>();
            var wp = new Workplace();
            

            dic.Add("Id", "کد");
            dic.Add(nameof(wp.oneDeviceEnabled), "ثبت کار از یک دستگاه");
            dic.Add(nameof(wp.IsNotificationsEnabled), "اطلاع رسانی به ادمین");
            dic.Add(nameof(wp.Name), "نام");

            return dic;
        }

        protected override void ValidateDelete(EngineContext db, Workplace entity)
        {
            if (entity.WorkplacePersonnels.Count() > 0)
                throw new JServiceException(
                    "این رکورد دارای پرسنل است و قابل حذف نیست ، لطفا ابتدا پرسنل های آن را تعیین تکلیف نمایید");


            if (entity?.Locations != null)
                foreach (var location in entity?.Locations?.ToList())
                {
                    db.Entry(location).State = EntityState.Deleted;
                }

            if (entity?.WorkplaceSettings != null)
                foreach (var setting in entity?.WorkplaceSettings?.ToList())
                {
                    if (setting?.location != null)
                        foreach (var myLocation in setting?.location?.ToList())
                        {
                            db.Entry(myLocation).State = EntityState.Deleted;
                        }

                    if (setting?.scanResults != null)
                        foreach (var result in setting?.scanResults?.ToList())
                        {
                            db.Entry(result).State = EntityState.Deleted;
                        }

                    db.Entry(setting).State = EntityState.Deleted;
                }

            if (entity?.UserClockTypes != null)
                foreach (var clockType in entity?.UserClockTypes?.ToList())
                {
                    db.Entry(clockType).State = EntityState.Deleted;
                }
        }
    }
}