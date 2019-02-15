using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.ViewModel;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class SettingsController : BaseMobileApiController
    {
        public VoidResultViewModel SaveSetting
        (ObjectPostViewModel vm,
            Func<WorkplaceSetting, WorkplacePersonnel, EngineContext, WorkplaceSetting, bool> f
        )
        {
            try
            {
                if (vm == null || vm.obj == null)
                    throw new Exception("اطلاعات ارسالی نال است");


                using (var db = new EngineContext())
                {
                    var workplacePersonnel = GetWorkplacePersonnelFromToken(db, vm.token);

                    var @default = workplacePersonnel.WorkplaceSettings.LastOrDefault();
                    if (@default == null)
                      {  @default = db.WorkplaceSettings.Create();

workplacePersonnel.WorkplaceSettings.Add(@default);
                      }else{
                            db.Entry(@default).State=EntityState.Modified;
                        }

                    var @defaultWorkplace = workplacePersonnel.Workplace.WorkplaceSettings.LastOrDefault();
                    if (@defaultWorkplace == null)
                        {@defaultWorkplace = db.WorkplaceSettings.Create();
                        workplacePersonnel.Workplace.WorkplaceSettings.Add(@defaultWorkplace);
                        }else{
                            db.Entry(@defaultWorkplace).State=EntityState.Modified;
                        }

                    //todo:modified;
                    

                    f(@default, workplacePersonnel, db, @defaultWorkplace);


                    return new VoidResultViewModel
                    {
                        success = true
                    };
                }
            }
            catch (Exception e)
            {
                return new VoidResultViewModel
                {
                    message = e.Message,
                    success = false
                };
            }
        }


        [HttpPost]
        [ResponseType(typeof(VoidResultViewModel))]
        public VoidResultViewModel SavePersonImage(ObjectPostViewModel vm)
        {
            return SaveSetting(vm, (workplaceSetting, WorkplacePersonnel
                , dbContext, @defaultWorkplace) =>
            {
                var image = vm.obj as byte[];
                if (image == null)
                    throw new Exception("نوع فایل ارسالی اشتباه و نال است");

                workplaceSetting.bitmapdata = image;
                SaveOrUpdateSetting(@defaultWorkplace, dbContext);
                return true;
            });
        }

        [HttpPost]
        [ResponseType(typeof(VoidResultViewModel))]
        public VoidResultViewModel SaveSelectedWifi(ObjectPostViewModel vm)
        {
            return SaveSetting(vm, (personWp, WorkplacePersonnel
                , dbContext, @defaultWorkplace) =>
            {
                var image = vm.obj as ScanResult;
                if (image == null)
                    throw new Exception("نوع فایل ارسالی اشتباه و نال است");


                @defaultWorkplace.scanResults.Add(image);
                SaveOrUpdateSetting(@defaultWorkplace, dbContext);
                return true;
            });
        }

        [HttpPost]
        [ResponseType(typeof(VoidResultViewModel))]
        public VoidResultViewModel SaveIsOneDeviceEnabled(ObjectPostViewModel vm)
        {
            return SaveSetting(vm, (personWp, WorkplacePersonnel
                , dbContext, @defaultWorkplace) =>
            {
                var image = (vm.obj as bool?) ?? false;
                if (vm.obj as bool? == null)
                    throw new Exception("نوع فایل ارسالی اشتباه و نال است");


                WorkplacePersonnel.Workplace.oneDeviceEnabled = image;
                SaveOrUpdateSetting(@defaultWorkplace, dbContext);
                return true;
            });
        }
        
        [HttpPost]
        [ResponseType(typeof(VoidResultViewModel))]
        public VoidResultViewModel SaveFaceRecognation(ObjectPostViewModel vm)
        {
            return SaveSetting(vm, (personWp, WorkplacePersonnel
                , dbContext, @defaultWorkplace) =>
            {

                var image = (vm.obj as bool?) ?? false;
                if (vm.obj as bool? == null)
                    throw new Exception("نوع فایل ارسالی اشتباه و نال است");


                WorkplacePersonnel.Workplace.IsFaceRecognationEnabled = image;
                SaveOrUpdateSetting(@defaultWorkplace, dbContext);
                return true;
            });
        }
        
        
        [HttpPost]
        [ResponseType(typeof(VoidResultViewModel))]
        public VoidResultViewModel SaveNotificationsEnabled(ObjectPostViewModel vm)
        {
            return SaveSetting(vm, (personWp, WorkplacePersonnel
                , dbContext, @defaultWorkplace) =>
            {
                var image = (vm.obj as bool?) ?? false;
                if (vm.obj as bool? == null)
                    throw new Exception("نوع فایل ارسالی اشتباه و نال است");


                WorkplacePersonnel.Workplace.IsNotificationsEnabled = image;
                SaveOrUpdateSetting(@defaultWorkplace, dbContext);
                return true;
            });
        }

        private void SaveOrUpdateSetting(
            WorkplaceSetting defaultWorkplace, EngineContext db)
        {
            if (defaultWorkplace.Id == 0)
            {
                db.WorkplaceSettings.Add(@defaultWorkplace);
            }
            else
            {
                db.Entry(defaultWorkplace).State = EntityState.Modified;
            }

            db.SaveChanges();
        }


        private void SaveOrUpdateSetting(
            Workplace defaultWorkplace, EngineContext db)
        {
            if (defaultWorkplace.Id == 0)
            {
                db.Workplaces.Add(@defaultWorkplace);
            }
            else
            {
                db.Entry(defaultWorkplace).State = EntityState.Modified;
            }

            db.SaveChanges();
        }
    }
}