using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Engine.Entities.Models.ICore;
using Spire.Pdf.Exporting.XPS.Schema;
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


    public class IRelatedModel<T> 
    {
        public long oneId { get; set; }
        public string oneTitle { get; set; }
        public List<T> sourceModels { get; set; }
        public List<T> targetModels { get; set; }
    }

    public enum CustomResultType
    {
        success,
        fail
    }
}