using System;
using System.ComponentModel;
using System.IO;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Rhino.Mocks;
using Xunit;

namespace Engine.Controllers.AbstractControllers
{
    public class Utility
    {
        
      
        public static Controller InitializeMockControllerContext(Controller controller)
        {
            var context = MockRepository.GenerateStub<HttpContextBase>();
            var request = MockRepository.GenerateStub<HttpRequestBase>();
            var files = MockRepository.GenerateStub<HttpFileCollectionBase>();
            var file = MockRepository.GenerateStub<HttpPostedFileBase>();

            var exelUrlWithWrongGroupids = "D:\\temp\\work\\personnel - Copy.xlsx";
            Stream stream = File.OpenRead(exelUrlWithWrongGroupids);

            file.Stub(x => x.InputStream).Return(stream);
            
            context.Stub(x => x.Request).Return(request);
            files.Stub(x => x.Count).Return(5);
            
            
            files.Stub(x => x[0]).Return(file);
            request.Stub(x => x.Files).Return(files);
            controller.ControllerContext = new ControllerContext(context, new RouteData(), controller);

            //files[0]=MockRepository.GenerateStub<HttpFileCollectionBase>();
            
            return controller;

            /*// act
            var actual = controller.Index();

            // assert
            Assert.IsInstanceOfType(actual, typeof(ViewResult));
            var viewResult = actual as ViewResult;
            Assert.IsInstanceOfType(viewResult.ViewData.Model, typeof(int));
            Assert.AreEqual(5, viewResult.ViewData.Model);*/
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
    }
}