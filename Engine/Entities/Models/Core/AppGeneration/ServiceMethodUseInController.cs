using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.Core.AppGeneration
{
    /// <summary>
    /// اتصال متد های سرویس ها به کنترولر ها
    /// </summary>
    public class ServiceMethodUseInController:BaseEntity
    {
        /// <summary>
        /// کنترولر
        /// </summary>
        [DropDown(Name = " کنترولر",
            Service = GlobalNames.DefineControllerServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public virtual long DefineControllerId { get; set; }
        public virtual DefineController DefineController { get; set; }
        
        /// <summary>
        /// متد سرویس
        /// </summary>
        [DropDown(Name = " متد سرویس",
            Service = GlobalNames.DefineServiceMethodService, MethodName = GlobalNames.GetDropDownAsync)]
        public virtual long ServiceMethodId { get; set; }

        public virtual ServiceMethod ServiceMethod { get; set; }

    }
}