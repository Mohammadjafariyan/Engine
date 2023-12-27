using System;
using System.ComponentModel;
using System.Data.Entity.Infrastructure;
using System.Globalization;
using System.IO;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using System.Web.Routing;
using Rhino.Mocks;
using Xunit;

namespace Engine.Controllers.AbstractControllers
{
    public class EngineUtility
    {
        public static readonly bool IsDebugMode = System.Diagnostics.Debugger.IsAttached;

        public static string ContextName()
        {
            string domainName = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);

            if (string.IsNullOrEmpty(domainName))
                throw new Exception("domainName is null");

            if (domainName.Contains("sobhansystems"))
            {
                return "EngineContext";
            }
            else if (domainName.Contains("localhost"))
            {
                return "EngineContextSomee";// "EngineContextDebug";
            }
            else if (domainName.Contains("somee"))
            {
                return "EngineContextSomee";
            }
            else
                throw new Exception("not recognise domain name " + domainName);

        }

        public static string AuthenticationContextName()
        {
            string domainName = HttpContext.Current?.Request?.Url?.GetLeftPart(UriPartial.Authority) ?? "localhost";

            if (string.IsNullOrEmpty(domainName))
                throw new Exception("domainName is null");

            if (domainName.Contains("sobhansystems"))
            {
                return "DefaultConnection";
            }
            else if (domainName.Contains("localhost"))
            {
                return "EngineContextSomee";// "EngineContextDebug";
           //     return "DefaultConnectionDebug";
            }
            else if (domainName.Contains("somee"))
            {
                return "DefaultConnectionSomee";
            }
            else
                throw new Exception("authen, not recognise domain name " + domainName);
        }

        public static string ConvertTimeSpanToStr(TimeSpan time)
        {
            var TotalHours = time.TotalHours < 0 ? time.TotalHours * -1 : time.TotalHours;
            var Minutes = time.Minutes < 0 ? time.Minutes * -1 : time.Minutes;
            var Seconds = time.Seconds < 0 ? time.Seconds * -1 : time.Seconds;
            return $@"{(int) Math.Floor(TotalHours)}:{Minutes}:{Seconds}";
        }

        public static Controller InitializeMockControllerContext(Controller controller)
        {
            var context = MockRepository.GenerateStub<HttpContextBase>();
            var request = MockRepository.GenerateStub<HttpRequestBase>();
            var files = MockRepository.GenerateStub<HttpFileCollectionBase>();
            var file = MockRepository.GenerateStub<HttpPostedFileBase>();

            request.Stub(r => r.ApplicationPath).Return("");

            var exelUrlWithWrongGroupids = "D:\\temp\\work\\personnel - Copy.xlsx";
            Stream stream = File.OpenRead(exelUrlWithWrongGroupids);

            file.Stub(x => x.InputStream).Return(stream);
            files.Stub(x => x.Count).Return(5);
            context.Stub(x => x.Request.AppRelativeCurrentExecutionFilePath).Return("~/Home/Index");

            var routes = new RouteCollection();
            RouteConfig.RegisterRoutes(routes);
            RouteData routeDate = routes.GetRouteData(context);
            routeDate.DataTokens.Add("area", "Admin");


            files.Stub(x => x[0]).Return(file);
            //  request.Stub(x => x.Files).Return(files);
            context.Stub(c => c.Request.Files).Return(files);
            controller.ControllerContext = new ControllerContext(context, routeDate, controller);

            // var f=context.Request.Files[0];
            return controller;
        }

        public static string GetDescription(Type type)
        {
            var descriptions = (DescriptionAttribute[])
                type.GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (descriptions.Length == 0)
            {
                return null;
            }

            return descriptions[0].Description;
        }

        public static string GetTranslate(DayOfWeek dayOfWeek)
        {
            switch (dayOfWeek)
            {
                case DayOfWeek.Saturday:
                    return "شنبه";
                    break;
                case DayOfWeek.Sunday:
                    return "یکشنبه";
                    break;
                case DayOfWeek.Monday:
                    return "دوشنبه";
                    break;
                case DayOfWeek.Tuesday:
                    return "سه شنبه";
                    break;
                case DayOfWeek.Wednesday:
                    return "چهارشنبه";
                    break;
                case DayOfWeek.Thursday:
                    return "پنجشنبه";
                    break;
                case DayOfWeek.Friday:
                    return "جمعه";
                    break;
            }

            throw new Exception("cant determine");
        }

        public static string GaregorianToDateOnlyFormat(DateTime @from)
        {
            var month = from.Month < 10 ? "0" + from.Month : from.Month + "";

            var day = from.Day < 10 ? "0" + from.Day : from.Day + "";
            string date = $@"{from.Year}/{month}/{day}";
            return date;
        }

        public static string ConvertToShamsiDate(DateTime @from, bool withtime
            , bool withweekday)
        {
            var pc = new PersianCalendar();


            var tmp = pc.GetDayOfMonth(@from);
            var day = tmp < 10 ? "0" + tmp : tmp + "";

            var monthtmp = pc.GetMonth(@from);
            var month = monthtmp < 10 ? "0" + monthtmp : monthtmp + "";

            string date = $@"{pc.GetYear(@from)}/{month}/{day}";
            if (withtime)
            {
                date += $@" - {@from.TimeOfDay}";
            }

            if (withweekday)
            {
                date += $@" - {GetTranslate(pc.GetDayOfWeek(@from))}";
            }

            return date;
        }
    }
}