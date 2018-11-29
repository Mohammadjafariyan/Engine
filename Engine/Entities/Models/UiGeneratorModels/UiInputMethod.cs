using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Engine.Attributes;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Entities.Models.UiGeneratorModels
{
    /// <summary>
    /// متد های ورودی
    /// </summary>
    public class UiInputMethod : BaseEntity
    {
        [Text(Name = "نام (استفاده نشده)")]
        public override string Name { get; set; }

        [DropDown(Name = "متد ", Service = GlobalNames.DefineControllerMethodServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long DefineControllerMethodId { get; set; }

        [DropDown(Name = "ورودی ", Service = GlobalNames.UiInputServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiInputId { get; set; }

        public virtual DefineControllerMethod DefineControllerMethod { get; set; }
        public virtual UiInput UiInput { get; set; }
        
        [NotMapped]
        public string SubSystemName { get; set; }

        [NotMapped]
        public string ControllerName { get; set; }
        [NotMapped]
        public string MethodName { get; set; }
    }
}