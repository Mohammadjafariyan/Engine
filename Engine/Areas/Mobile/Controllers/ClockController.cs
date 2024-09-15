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
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Controllers.AbstractControllers;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Newtonsoft.Json;
using TurfCS;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class ClockController : ApiController
    {
        private ClockService _clockService = new ClockService();
        private SecurityService _securityService = new SecurityService();


        [ActionName("Get")]
        [HttpGet]
        [ResponseType(typeof(ApiResult<List<BiometricDataTime>>))]
        public async Task<IHttpActionResult> Get()
        {
            using (var db = new EngineContext())
            {
                // get user
                var user = await db.Users
                    .Where(s => s.UserName == User.Identity.Name)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    throw new Exception("اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید");
                }

                var biometricDate =
                    db.BiometricDatas
                        .Where(b =>
                            b.ApplicationUserId == user.Id &&
                            b.Date.Year == DateTime.Now.Year &&
                            b.Date.Month == DateTime.Now.Month &&
                            b.Date.Day == DateTime.Now.Day
                        ).Include(s => s.BiometricDataTimes).FirstOrDefault();

                var biometricDataTimes = biometricDate?.BiometricDataTimes?.ToList();
                if (biometricDataTimes!=null)
                {
                    foreach (var time in biometricDataTimes)
                    {
                        time.BiometricData = null;
                        time.ClockInViewModels = null;
                        
                    }
                }
                
                return Ok(new ApiResult<List<BiometricDataTime>>
                {
                    Status = CustomResultType.success,
                    result = biometricDataTimes ?? new List<BiometricDataTime>()
                });
            }
        }


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
        public async Task<ClockInViewModelResult> ClockIn([FromBody] ClockInViewModel vm)
        {
            try
            {
                using (var db = new EngineContext())
                {
                    // get user
                    var user = await db.Users
                        .Where(s => s.UserName == User.Identity.Name)
                        .Include(s => s.Personnels)
                        .Include(s => s.Personnels.Select(d => d.WorkplacePersonnels))
                        .Include(s => s.Personnels.Select(d => d.WorkplacePersonnels.Select(w => w.Workplace)))
                        .FirstOrDefaultAsync();

                    if (user == null)
                    {
                        throw new Exception("اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید");
                    }

                    vm.ApplicationUserId = user.Id;
                    
                    var personnel = db.GetCurrentUserPersonnel(user.Id, true);

                    string username = user.UserName; // SecurityService.GetUsernameFromToken(vm.token);


                    //یافتن پرسنل
                    var workplacePersonnels = user.Personnels.SelectMany(s => s.WorkplacePersonnels).ToList();
                    if (workplacePersonnels == null || workplacePersonnels.Any() == false)
                        throw new Exception("کاربر یافت نشد");


                    var workplacePersonnelIds =
                        workplacePersonnels.Select(s => s.Id).ToList();
                    // کلاک ورود
                    // آیا قبلا وارد شده است
                    var biometricDate =
                        db.BiometricDatas
                            .Where(b =>
                                workplacePersonnelIds.Any(id => id == b.WorkplacePersonnelId) &&
                                b.Date.Year == DateTime.Now.Year &&
                                b.Date.Month == DateTime.Now.Month &&
                                b.Date.Day == DateTime.Now.Day
                            ).Include(s => s.BiometricDataTimes).FirstOrDefault();

                    if (biometricDate == null)
                        biometricDate = db.BiometricDatas.Create();

                    var lastBiometricDateTime =
                        biometricDate.BiometricDataTimes.OrderBy(d => d.InsertDateTime).LastOrDefault();


                    biometricDate.ApplicationUserId = user.Id;

                    var workplaces = workplacePersonnels.Select(s => s.Workplace).ToList();
                    bool isInDefinedArea = false;
                    Workplace currWorkplace = null;
                    foreach (Workplace workplace in workplaces)
                    {
                        try
                        {
                            var location = JsonConvert.DeserializeObject<WorkplaceGps>(workplace.Gps);

                            if (location != null)
                            {
                                try
                                {
                                    // var data = JsonConvert.DeserializeObject<PunchModels.MapData>(location.MapData);

                                    var fc = JsonConvert.DeserializeObject<FeatureCollection>(location.MapData);

                                    var point = Turf.Point(new double[]
                                        { vm.punch.point.coordinates[0], vm.punch.point.coordinates[1] });

                                    if (fc?.Features != null)
                                    {
                                        foreach (var fcFeature in fc?.Features)
                                        {
                                            isInDefinedArea = Turf.Inside(point, fcFeature);
                                            if (isInDefinedArea)
                                            {
                                                currWorkplace = workplace;
                                                break;
                                            }
                                        }
                                    }

                                    if (isInDefinedArea)
                                    {
                                        break;
                                    }
                                }
                                catch (Exception e)
                                {
                                    // ignore todo:log
                                }
                            }
                        }
                        catch (Exception e)
                        {
                            // ignore todo:log
                        }
                    }


                    if (!isInDefinedArea || currWorkplace == null)
                        throw new Exception("در محدوده تعیین شده قرار ندارید ");

                    string clocktypestr = "وارد";
                    if (lastBiometricDateTime == null ||
                        (lastBiometricDateTime.TimeIn.HasValue && lastBiometricDateTime.TimeOut.HasValue))
                    {
                        var clocktypes = currWorkplace.UserClockTypes;

                        // ولیدیشن نوع کلاک ها
                        //ValidateClocks(clocktypes, vm, workplacePersonnel, db); todo:clocks

                        // هیچ کلاکی نزده است
                        lastBiometricDateTime = db.BiometricDataTimes.Create();
                        lastBiometricDateTime.ApplicationUserId = user.Id;
                        lastBiometricDateTime.TimeIn = DateTime.Now;
                        lastBiometricDateTime.ClockInViewModels.Add(vm);


                        //ذخیره
                        biometricDate.BiometricDataTimes.Add(lastBiometricDateTime);

                        var workplacePersonnel = currWorkplace.WorkplacePersonnels.FirstOrDefault();
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
                        message = $@" {clocktypestr} در {hour} "
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

                var y = IsInside(new double[] { myLocation.latitude, myLocation.longitude }, arr);
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


    public class PunchModels
    {
        public class Feature
        {
            public string type { get; set; }
            public Map properties { get; set; }
            public Geometry geometry { get; set; }
        }

        public class Geometry
        {
            public string type { get; set; }
            public List<List<List<double>>> coordinates { get; set; }
        }

        public class Properties
        {
            public string name { get; set; }
        }

        public class MapData
        {
            public string type { get; set; }
            public List<Feature> features { get; set; }
        }
    }
}