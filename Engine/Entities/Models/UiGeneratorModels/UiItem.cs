using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Engine.Attributes;
using Engine.Entities.Models.ICore;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Entities.Models.UiGeneratorModels
{
    /// <summary>
    /// آیتم های سیستم
    /// </summary>
    public class UiItem : BaseEntity
    {
        public UiItem()
        {
            UiTableItems = new List<UiTableItem>();
            UiFormItems = new List<UiFormItem>();
        }


        public virtual ICollection<UiTableItem> UiTableItems { get; set; }
        public virtual ICollection<UiFormItem> UiFormItems { get; set; }

        [Text(Name = "نام")] public override string Name { get; set; }

        [Enum(Name = "نوع")]

        public UiItemType UiItemType { get;set;}


        [Text(Name = "Icon")]
        public string Icon { get; set; }

        [Text(Name = "نام جدول")]
        public string TableName { get; set; }


        [Text(Name = "نام فرم")]
        public string FormName { get; set; }

        [NotMapped]
        [DropDown(Name = "نام فرم جهت انتخاب ", Service = GlobalNames.UiFormServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiFormId { get; set; }

        [NotMapped]
        [DropDown(Name = "نام جدول جهت انتخاب ", Service = GlobalNames.TablesServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiTable { get; set; }

        public string CustomUrl { get; set; }
        public ActionMethodType MethodType { get; set; }
    }
}

public enum UiItemType
{
    GoToSave,Delete,Custom,Form,Table,//OpenFormInModal,OpenTableInModal
    Link
}