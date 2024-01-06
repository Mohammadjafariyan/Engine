using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Areas.Mobile.ViewModel;
using Engine.Controllers.AbstractControllers;
using Engine.Entities.Data;
using Newtonsoft.Json;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class ClockController : ApiController
    {
        private ClockService _clockService = new ClockService();
        private SecurityService _securityService = new SecurityService();


        /*[ActionName("ClockOut")]
        [HttpPost]
        [ResponseType(typeof(ClockInViewModelResult))]
        public async Task<ClockInViewModelResult> ClockOut(ClockInViewModel vm)
        {
            try
            {
                using (var db = new EngineContext())
                {
                    string username = SecurityService.GetUsernameFromToken(vm.token);


                    //یافتن پرسنل
                    var workplacePersonnel = db.WorkplacePersonnels.FirstOrDefault(p => p.Username == username);
                    if (workplacePersonnel == null)
                        throw new Exception("کاربر یافت نشد");


                    // کلاک خروج
                    // آیا قبلا وارد شده است
                    var biometricDate =
                        db.BiometricDatas.FirstOrDefault(b => b.WorkplacePersonnelId == workplacePersonnel.Id);

                    if (biometricDate == null)
                        throw new Exception("شما قبلا ساعت ورود نزده اید");

                    var lastBiometricDateTime =
                        biometricDate.BiometricDataTimes.OrderBy(d => d.InsertDateTime).LastOrDefault();
                    if (lastBiometricDateTime == null)
                    {
                        throw new Exception("شما قبلا ساعت ورود نزده اید");
                    }
                    else
                    {
                        if (lastBiometricDateTime.TimeOut.HasValue)
                        {
                            throw new Exception("شما قبلا ساعت خروج زده اید");
                        }

                        // هیچ کلاکی نزده است
                        lastBiometricDateTime.TimeOut = DateTime.Now;
                    }

                    //ذخیره

                    db.Entry(lastBiometricDateTime).State = EntityState.Modified;


                    await db.SaveChangesAsync();

                    var hour = EngineUtility.ConvertTimeSpanToStr(lastBiometricDateTime.TimeOut.Value.TimeOfDay);
                    return await Task.FromResult(new ClockInViewModelResult
                    {
                        success = true,
                        message = $@" خارج شده اید{hour}  شما در ساعت "
                    });
                }
            }
            catch (Exception e)
            {
                return await Task.FromResult(new ClockInViewModelResult
                {
                    success = false,
                    message = e.Message
                });
                throw;
            }
        }*/

        [ActionName("ClockIn")]
        [HttpPost]
        [ResponseType(typeof(ClockInViewModelResult))]
        public async Task<ClockInViewModelResult> ClockIn(ClockInViewModel vm)
        {
            try
            {
                using (var db = new EngineContext())
                {
                    string username = SecurityService.GetUsernameFromToken(vm.token);


                    //یافتن پرسنل
                    var workplacePersonnel = db.WorkplacePersonnels.FirstOrDefault(p => p.Username == username);
                    if (workplacePersonnel == null)
                        throw new Exception("کاربر یافت نشد");


                    // کلاک ورود
                    // آیا قبلا وارد شده است
                    var biometricDate =
                        db.BiometricDatas.FirstOrDefault(b =>
                        b.WorkplacePersonnelId == workplacePersonnel.Id && 
                        b.Date.Year==DateTime.Now.Year &&
                        b.Date.Month==DateTime.Now.Month &&
                        b.Date.Day==DateTime.Now.Day 
                        );

                    if (biometricDate == null)
                        biometricDate = db.BiometricDatas.Create();

                    var lastBiometricDateTime =
                        biometricDate.BiometricDataTimes.OrderBy(d => d.InsertDateTime).LastOrDefault();


                    string clocktypestr = "وارد";
                    if (lastBiometricDateTime == null ||
                        (lastBiometricDateTime.TimeIn.HasValue && lastBiometricDateTime.TimeOut.HasValue))
                    {
                        var clocktypes = workplacePersonnel.Workplace.UserClockTypes;

                        // ولیدیشن نوع کلاک ها
                        ValidateClocks(clocktypes, vm, workplacePersonnel, db);

                        // هیچ کلاکی نزده است
                        lastBiometricDateTime = db.BiometricDataTimes.Create();
                        lastBiometricDateTime.TimeIn = DateTime.Now;
                        lastBiometricDateTime.ClockInViewModels.Add(vm);


                        //ذخیره
                        biometricDate.BiometricDataTimes.Add(lastBiometricDateTime);
                        workplacePersonnel.BiometricDatas.Add(biometricDate);

                        db.Entry(workplacePersonnel).State = EntityState.Modified;


                        await db.SaveChangesAsync();
                    }
                    else
                    {
                        // throw new Exception("شما قبلا ساعت ورود زده اید");

                        if (lastBiometricDateTime.TimeOut.HasValue)
                        {
                            throw new Exception("شما قبلا ساعت خروج زده اید");
                        }

                        // هیچ کلاکی نزده است
                        lastBiometricDateTime.TimeOut = DateTime.Now;

                        //ذخیره

                        db.Entry(lastBiometricDateTime).State = EntityState.Modified;
                        clocktypestr = "خارج";
                        await db.SaveChangesAsync();
                    }


                    var hour = EngineUtility.ConvertTimeSpanToStr(lastBiometricDateTime.TimeIn.Value.TimeOfDay);
                    return await Task.FromResult(new ClockInViewModelResult
                    {
                        success = true,
                        message = $@" {clocktypestr } در {hour} "
                    });
                }
            }
            catch (Exception e)
            {
                return await Task.FromResult(new ClockInViewModelResult
                {
                    success = false,
                    message = e.Message
                });
                throw;
            }
        }

        private void ValidateClocks(List<UserClockTypeViewModel> clocktypes
            , ClockInViewModel vm, WorkplacePersonnel workplacePersonnel, EngineContext db)
        {
            foreach (var clocktype in clocktypes)
            {
                switch (clocktype.type)
                {
                    case ClockType.Wifi:
                        if (vm.scanResults != null && vm.scanResults.Count == 0)
                            throw new Exception("هیچ دستگاه wifi ای شناسایی نشد");
                        DetectWifiDevice(workplacePersonnel.Workplace, vm.scanResults);

                        break;
                    case ClockType.CameraSelfie:
                        if (vm.bitmapdata != null && vm.bitmapdata.Length == 0)
                            throw new Exception("هیچ تصویری دریافت نگردید");
                        break;
                    case ClockType.GPS:
                        if (vm.location == null)
                            throw new Exception("اطلاعات gps خالی است");
                        IsInsideGPSArea(workplacePersonnel.Workplace, vm.location);
                        break;

                    case ClockType.QRCode:
                        if (vm.qRCodeContent == null)
                            throw new Exception("اطلاعات QRCode خالی است");

                        CompareQRCode(workplacePersonnel, vm.qRCodeContent);
                        break;
                }
            }
        }

        private bool CompareQRCode(WorkplacePersonnel workplacePersonnel, string vmQRCodeContent)
        {
            var @default = workplacePersonnel.WorkplaceSettings.FirstOrDefault();
            if (@default == null)
            {
                throw new Exception("تنظیمات  صدور کد QR جهت شناسایی پرسنل یافت نشد");
            }

            if (@default.qRCodeContent == vmQRCodeContent)
                return true;

            throw new Exception("کد QR شناسایی نشد");
        }

        private bool DetectWifiDevice(Workplace workplacePersonnelWorkplace, List<ScanResult> vmScanResults)
        {
            var @default = workplacePersonnelWorkplace.WorkplaceSettings.FirstOrDefault();
            if (@default == null)
            {
                throw new Exception("هیچ تنظیماتی برای این محل کاری یافت نشد جهت شناسایی وای فای");
            }

            if (vmScanResults.Count == 0)
                throw new Exception("هیچ دستگاه وای فای ای شناسایی نشد");

            if (@default.scanResults.Count == 0)
                throw new Exception("هیچ دستگاه وای فای ای تنظیم نشده است");


            foreach (var scanResult in @default.scanResults)
            {
                if (vmScanResults.Any(v => v.BSSID == scanResult.BSSID))
                    return true;
            }

            throw new Exception(
                " دستگاه وای فای شناسایی نشد اگر در نزدیکی دستگاه هستید لطفا مکان خود را تغییر دهید تا در محدوده آن قرار گیرید سپس دوباره امتحان نمایید ");
        }

        private bool IsInsideGPSArea(Workplace workplacePersonnelWorkplace, List<MyLocation> vmLocation)
        {
            if (string.IsNullOrEmpty(workplacePersonnelWorkplace.Gps))
                throw new Exception("مکان محل کاری مشخص نشده است");

            var workplaceGps = JsonConvert.DeserializeObject<WorkplaceGps>(workplacePersonnelWorkplace.Gps);


            var myLocation = vmLocation.First();


            foreach (var datum in workplaceGps.Data)
            {
                var dt = datum[0];

                var arr = dt.Select(t => new double[]
                {
                    t.Lat,
                    t.Lng
                }).ToArray();

                var y = IsInside(new double[] {myLocation.latitude, myLocation.longitude}, arr);
                if (y)
                    return true;
            }

            throw new Exception("شما در داخل محدوده تعیین شده محل کار نیستید");


           // throw new NotImplementedException();
        }

        public bool IsInside(double[] point, double[][] vs)
        {
            // ray-casting algorithm based on
            // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

            var x = point[0];
            var y = point[1];

            var inside = false;
            var j = vs.Length - 1;
            for (var i = 0; i < vs.Length; j = i++)
            {
                var xi = vs[i][0];
                var yi = vs[i][1];
                var xj = vs[j][0];
                var yj = vs[j][1];

                var intersect = ((yi > y) != (yj > y))
                                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }

            return inside;
        }
    }
}