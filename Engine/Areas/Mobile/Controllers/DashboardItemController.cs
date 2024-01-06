using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.ViewModel;
using Engine.Controllers.AbstractControllers;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class DashboardItemController : BaseMobileApiController
    {
        [ActionName("GetAll")]
        [HttpPost]
        [ResponseType(typeof(List<PersonnelClockStatusViewModel>))]
        public List<PersonnelClockStatusViewModel> GetAll(ObjectPostViewModel vm)
        {
            
                if (vm == null || vm.obj == null)
                    throw new Exception("اطلاعات ارسالی نال است");

                using (var db = new EngineContext())
                {
                    var workplacePersonnel = GetWorkplacePersonnelFromToken(db, vm.token);

                    // پرسنل هایی که در آن گروه کاری هستند
                    var dt = db.WorkplacePersonnels.Where(w => w.WorkplaceId == workplacePersonnel.WorkplaceId);



                    //فقط خودش
                    if (!workplacePersonnel.IsAdmin)
                    {
                        dt = dt.Where(d => d.PersonnelId == workplacePersonnel.PersonnelId);
                    }

                    var dates = dt.SelectMany(d => d.BiometricDatas
                        .Where(day => day.Date.Year == DateTime.Now.Year &&
                                      day.Date.Month == DateTime.Now.Month &&
                                      day.Date.Day == DateTime.Now.Day)).OrderBy(d => d.Date);


                    List<PersonnelClockStatusViewModel> list = new List<PersonnelClockStatusViewModel>();

                    foreach (var biometricData in dates)
                    {


                    if (vm.obj == null || vm.obj as long? == 0)
                    {
                        // قسمت داشبورد
                        var time = biometricData.BiometricDataTimes.OrderBy(d => d.InsertDateTime).LastOrDefault();
                        list.Add(new PersonnelClockStatusViewModel
                        {
                            lastClockIn = time != null && time.TimeIn.HasValue
                                ? EngineUtility.ConvertTimeSpanToStr(time.TimeIn.Value.TimeOfDay)
                                : "-",
                            lastClockOut = time != null && time.TimeOut.HasValue
                                ? EngineUtility.ConvertTimeSpanToStr(time.TimeOut.Value.TimeOfDay)
                                : "-",
                            name = biometricData.WorkplacePersonnel.Personnel.Name + " " +
                                   biometricData.WorkplacePersonnel.Personnel.LastName,
                            status = GetStatus(time),
                            color = GetColor(time),
                            personnelId = biometricData.WorkplacePersonnel.Personnel.Id

                        });
                    }
                    else
                    {
                        // قسمت جزئیات تردد پرسنل
                        var ordered = biometricData.BiometricDataTimes.OrderBy(d => d.InsertDateTime);
                        foreach (var time in ordered)
                        {
                            list.Add(new PersonnelClockStatusViewModel
                            {
                                lastClockIn = time != null && time.TimeIn.HasValue
                               ? EngineUtility.ConvertTimeSpanToStr(time.TimeIn.Value.TimeOfDay)
                               : "-",
                                lastClockOut = time != null && time.TimeOut.HasValue
                               ? EngineUtility.ConvertTimeSpanToStr(time.TimeOut.Value.TimeOfDay)
                               : "-",
                                name = biometricData.WorkplacePersonnel.Personnel.Name + " " +
                                  biometricData.WorkplacePersonnel.Personnel.LastName,
                                status = GetStatus(time),
                                color = GetColor(time),
                                personnelId= biometricData.WorkplacePersonnel.Personnel.Id

                            });
                        }
                       
                    }
                     
                    }

                    return list;
                }
        }
        public static int GetColor(BiometricDataTime time)
        {
            if (time == null)
                return 1;
            else if (time.TimeIn.HasValue && time.TimeOut.HasValue)
                return 1;//red
            else if (time.TimeIn.HasValue && !time.TimeOut.HasValue)
                return 2; //green
            else if (!time.TimeIn.HasValue && !time.TimeOut.HasValue)
                return 1;

            return 1;
        }
        public static string GetStatus(BiometricDataTime time)
        {
            if (time == null)
                return "ساعت نزده است";
            else if (time.TimeIn.HasValue && time.TimeOut.HasValue)
                return "خارج شده";
            else if (time.TimeIn.HasValue && !time.TimeOut.HasValue)
                return "وارد شده";
            else if (!time.TimeIn.HasValue && !time.TimeOut.HasValue)
                return "ساعت نزده است";

            return "نامعلوم";
        }
    }
}