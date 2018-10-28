using System;
using System.Web.Mvc;
using WebAppIDEEngine.Models.Core;

namespace ReportGenerator.Controllers
{
    public class CustomResult
    {
        public object result;

        public string Message { get; set; }
        public CustomResultType Status { get; set; }
    }

    public enum CustomResultType
    {
        success, fail
    }
}