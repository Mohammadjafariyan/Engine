using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Engine.Attributes;
using Engine.Entities.Models.ICore;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Entities.Models.UiGeneratorModels
{
    /// <summary>
    /// اتصال فرم های جدول
    /// </summary>
    public class UiTableForm : BaseEntity
    {
        [Text(Name = "نام فرم جدول")]
        public override string Name { get; set; }

        [Text(Name = "ترجمه فرم جدول")]
        public  string Translate { get; set; }

        [DropDown(Name = "جدول ", Service = GlobalNames.TablesServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long EjTableId { get; set; }

        [DropDown(Name = "فرم ", Service = GlobalNames.UiFormServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiFormId { get; set; }

        public virtual EjTable EjTable { get; set; }
        public virtual UiForm UiForm { get; set; }
    }
}