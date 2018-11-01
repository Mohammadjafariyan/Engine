using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.Core.AppGeneration
{
    /// <summary>
    /// متد کنترولر
    /// </summary>
    public class DefineControllerMethod:BaseEntity
    {
        /// <summary>
        /// نام
        /// </summary>
        [Text(Name = "نام متد ")]
        public string Name { get; set; }

        /// <summary>
        /// ترجمه
        /// </summary>
        [Text(Name = "ترجمه ")]
        public string Translate { get; set; }

        /// <summary>
        /// زیر سیستم
        /// </summary>
        [DropDown(Name = " زیر سیستم",
            Service = GlobalNames.SubSystemServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long SubSystemId { get; set; }


        /// <summary>
        /// کنترولر
        /// </summary>
        [DropDown(Name = " کنترولر",Service = GlobalNames.DefineControllerServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long DefineControllerId { get; set; }
        
        /// <summary>
        /// متد سرویس
        /// </summary>
        [DropDown(Name = " متد سرویس",Service = GlobalNames.DefineServiceMethodService, MethodName = GlobalNames.GetDropDownAsync)]
        public  long ServiceMethodId { get; set; }

        

        /// <summary>
        /// مدل اصلی
        /// </summary>
        [DropDown(Name = " مدل اصلی", Service = GlobalNames.FormService, MethodName = GlobalNames.GetDropDownAsync)]
        public long ModelId { get; set; }

        public Model Model { get; set; }



        public virtual DefineController DefineController { get; set; }
        public virtual ServiceMethod ServiceMethod { get; set; }
     
    }
}