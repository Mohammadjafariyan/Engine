using System;
using System.ComponentModel;
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
        public static string ConvertTimeSpanToStr(TimeSpan time)
        {
            return $@"{Math.Round(time.TotalHours)}:{time.Minutes}:{time.Seconds}";
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
            string date = $@"{from.Year}/{from.Month}/{from.Day}";
            return date;
        }
        public static string ConvertToShamsiDate(DateTime @from, bool withtime
            , bool withweekday)
        {
            var pc = new PersianCalendar();

            string date = $@"{pc.GetYear(@from)}/{pc.GetMonth(@from)}/{pc.GetDayOfMonth(@from)}";
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