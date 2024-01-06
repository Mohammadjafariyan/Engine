using System;
using System.Web.Mvc;
using WebAppIDEEngine.Models.Core;

namespace Engine.Areas.ReportGenerator.Controllers
{
    public class CustomResult
    {
        public object result;

        public string Message { get; set; }
        public CustomResultType Status { get; set; }
    } 
    
    public class ApiResult<T>
    {
        public T result;

        public string Message { get; set; }
        public CustomResultType Status { get; set; }
        public int total { get; set; }
        public int totalPages { get; set; }
    }

    public enum CustomResultType
    {
        success, fail
    }
}