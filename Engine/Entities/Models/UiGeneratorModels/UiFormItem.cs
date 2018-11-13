using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Attributes;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Entities.Models.UiGeneratorModels
{
    /// <summary>
    /// آیتم های فرم
    /// </summary>
    public class UiFormItem : BaseEntity
    {
        [Text(Name = "نام آیتم در فرم")]
        public override string Name { get; set; }

        [DropDown(Name = "فرم ", Service = GlobalNames.UiFormServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiFormId { get; set; }

        [DropDown(Name = "آیتم ", Service = GlobalNames.UiItemsServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiItemId { get; set; }

        public virtual UiForm UiForm { get; set; }
        public virtual UiItem UiItem { get; set; }
    }
}