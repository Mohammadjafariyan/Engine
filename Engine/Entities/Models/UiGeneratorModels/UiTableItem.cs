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
    /// آیتم های جدول
    /// </summary>
    public class UiTableItem : BaseEntity
    {
        [Text(Name = "نام آیتم در جدول")]
        public override string Name { get; set; }

        [DropDown(Name = "جدول ", Service = GlobalNames.TablesServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long EjTableId { get; set; }

        [DropDown(Name = "آیتم ", Service = GlobalNames.UiItemsServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long UiItemId { get; set; }

        public virtual EjTable EjTable { get; set; }
        public virtual UiItem UiItem { get; set; }
    }
}