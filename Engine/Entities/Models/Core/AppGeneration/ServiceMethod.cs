using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Entities.Models.ICore;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.CoreEnum;

namespace Engine.Entities.Models.Core.AppGeneration
{
    /// <summary>
    /// متد سرویس
    /// </summary>
    public class ServiceMethod:BaseEntity
    {
        /// <summary>
        /// نام
        /// </summary>
        [Text(Name="نام")]
        public override string Name { get; set; }
        
        /*
        /// <summary>
        /// سرویس زیر سیستم
        /// </summary>
        [DropDown(Name = " سرویس زیر سیستم",
            Service = GlobalNames.SubSystemServiceServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long SubSystemServiceClassId { get; set; }

*/

        /// <summary>
        /// کوئری
        /// </summary>
        [DropDown(Name = " کوئری",
            Service = GlobalNames.QueryServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long? QueryId { get; set; }
        
        
        /// <summary>
        /// سرویس
        /// </summary>
        [DropDown(Name = " سرویس",Service = GlobalNames.DefineServiceServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long DefineServiceId { get; set; }

        
        /// <summary>
        /// نوع خروجی متد
        /// </summary>
        [Enum(Name = " نوع خروجی متد")]
        public ServiceReturnMethodType ServiceReturnMethodType { get; set; }

        
        /// <summary>
        /// نوع خروجی متد
        /// </summary>
        [Enum(Name = " نوع مقدار خروجی متد")]
        public ServiceItemReturnType ServiceItemReturnType { get; set; }


        /// <summary>
        /// ترجمه
        /// </summary>
        [Text(Name="ترجمه")]
        public string Translate { get; set; }

        public virtual DefineService DefineService { get; set; }
        public virtual Query Query { get; set; }
        
        public virtual ICollection<DefineControllerMethod> DefineControllerMethods { get; set; }

        [Enum(Name="ترجمه")]
        public MethodType MethodType { get; set; }
    }
}