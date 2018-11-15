using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Attributes;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.UiGeneratorModels
{
    public class UiFormControllerMethod : BaseEntity
    {
        [Text(Name = "نام")]
        public override string Name { get; set; }
        [Text(Name = "ترجمه")]
        public  string Translate { get; set; }

        [DropDown(Name = "متد کنترولر ", Service = GlobalNames.DefineControllerMethodServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long DefineControllerMethodId { get; set; }

        [DropDown(Name = "فرم ", Service = GlobalNames.UiFormServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiFormId { get; set; }
        public virtual UiForm UiForm { get; set; }
        public virtual DefineControllerMethod DefineControllerMethod { get; set; }

        [Enum(Name = "نوع")]
        public UiFormControllerMethodType Type { get; set; }
    }

    public enum UiFormControllerMethodType
    {
        Save,Search
    }
}