using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Globalization;
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
    public class ForgetCardsController : ApiController
    {
        private ClockService _clockService = new ClockService();
        private SecurityService _securityService = new SecurityService();


        [ActionName("Get")]
        [HttpGet]
        [ResponseType(typeof(ApiResult<dynamic>))]
        public async Task<IHttpActionResult> Get(string from, string to, string userId, bool onlyNotAccepted = true)
        {
            CultureInfo persianCulture = new CultureInfo("fa-IR");


            DateTime to_dt, from_dt;

            bool has_to_dt = DateTime.TryParseExact(to,
                "yyyy/MM/dd", persianCulture, DateTimeStyles.None, out to_dt);

            bool has_from_dt = DateTime.TryParseExact(from,
                "yyyy/MM/dd", persianCulture, DateTimeStyles.None, out from_dt);


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

                if (user.IsAdmin == false)
                {
                    throw new Exception("عدم دسترسی");
                }

                var clocksQuery =
                    db.ClockInViewModels
                        .Where(s => s.BiometricDataTime.IsForgotten ||
                                    (
                                        EntityFunctions.TruncateTime(s.BiometricDataTime.TimeIn)
                                        < EntityFunctions.TruncateTime(DateTime.Now)
                                        && s.BiometricDataTime.TimeOut.HasValue == false))
                        .AsQueryable();

                if (string.IsNullOrEmpty(userId) == false && userId != "undefined" && userId?.ToLower() != "null")
                {
                    clocksQuery = clocksQuery.Where(b =>
                        b.ApplicationUserId == userId);
                }

                if (onlyNotAccepted)
                {
                    clocksQuery = clocksQuery.Where(s => s.IsAccepted == false);
                }

                if (has_from_dt)
                {
                    clocksQuery = clocksQuery.Where(s =>
                        EntityFunctions.TruncateTime(s.datetime) >= EntityFunctions.TruncateTime(from_dt));
                }

                if (has_to_dt)
                {
                    clocksQuery = clocksQuery.Where(s =>
                        EntityFunctions.TruncateTime(s.datetime) <= EntityFunctions.TruncateTime(to_dt));
                }


                clocksQuery = clocksQuery.Include(s => s.ApplicationUser)
                    .Include(s => s.BiometricDataTime);


                var list = clocksQuery.ToList().Select(s => new
                {
                    UserFirstLastName = s.ApplicationUser?.FirstName + " " + s.ApplicationUser?.LastName,
                    UserId = s.ApplicationUserId,
                    TimeIn=ConvertDate(s.BiometricDataTime.TimeIn),
                    TimeOut=ConvertDate(s.BiometricDataTime.TimeOut),
                    s.BiometricDataTime.IsForgotten,
                    s.IsAccepted,
                    s.manualHourOfDay,
                    s.manualMinute,
                    datetime=ConvertDate(s.datetime,true),
                    s.clockType
                }).ToList();

                return Ok(new ApiResult<dynamic>
                {
                    Status = CustomResultType.success,
                    result = list
                });
            }
        }

        private string ConvertDate(DateTime? fromdate,bool dateOnly=false)
        {
            var persianCalendar = new PersianCalendar();

            var time = dateOnly
                ? ""
                : $@"{persianCalendar.GetHour(fromdate.Value)}:{persianCalendar.GetMinute(fromdate.Value)}";
            return
                fromdate.HasValue
                    ? $@" {time} {persianCalendar.GetYear(fromdate.Value)}/{persianCalendar.GetMonth(fromdate.Value)}/{persianCalendar.GetDayOfMonth(fromdate.Value)}"
                    : "";
        }
    }
}