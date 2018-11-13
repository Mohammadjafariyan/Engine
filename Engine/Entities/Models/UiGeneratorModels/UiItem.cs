using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Attributes;
using WebAppIDEEngine.Models.ICore;
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

        [Text(Name = "نام")]
        public override string Name { get; set; }
    }
}