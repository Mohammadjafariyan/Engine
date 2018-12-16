using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Engine.Attributes;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.UiGeneratorModels
{
    public class UiFormInput : BaseEntity
    {
        [Text(Name = "نام ارسالی به فرم")] public override string Name { get; set; }


        [Text(Name = "نام نمایشی در فرم")] public string Translate { get; set; }

        [Text(Name = "توضیحات نمایشی در فرم")] public string Description { get; set; }


        [DropDown(Name = "ورودی ", Service = GlobalNames.UiInputServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiInputId { get; set; }

        [DropDown(Name = "فرم ", Service = GlobalNames.UiFormServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiFormId { get; set; }

        public virtual UiForm UiForm { get; set; }
        public virtual UiInput UiInput { get; set; }

        [DropDown(Name = "نام پروپرتی (غیر ثبتی)", Service = GlobalNames.PropertyServiceName,
            MethodName = GlobalNames.GetDropDownAsync)]
        [NotMapped]
        public long? PropertyId { get; set; }


        [Text(Name = "آپدیت مقادیر در تغییر این ورودی جدا با کاما (,)")]
        public string OnChangeUpdate { get; set; }


        [Text(Name = "script تغییر")] public string ChangeScript { get; set; }


        [Text(Name = "Css کلاس های  ")] public string Css { get; set; }


        [NotMapped] public SelectList SelectList { get; set; }
        [NotMapped] 
        public string DateGroupId { get; set; }

        [NotMapped] 
        public bool IsFromDate { get; set; }

        [NotMapped] 
        public bool IsToDate { get; set; }
    }
}