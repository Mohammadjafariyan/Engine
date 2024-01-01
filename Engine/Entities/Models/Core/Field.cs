using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Engine.Entities.Models.ICore;
using WebAppIDEEngine.Models.CoreEnum;

namespace WebAppIDEEngine.Models.Core
{
    public class Field : BaseEntity
    {
        public override string Name { get; set; }
        public string TName { get; set; }

        public FieldType FieldType { get; set; }
        public int Size { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }
        public string Regex { get; set; }
        public int Width { get; set; }
        public int Order { get; set; }
        public InputType InputType { get; set; }
        public InputShowType InputShowType { get; set; }
        public InputDisableType InputDisableType { get; set; }

        public ICollection<Field> UpdateOnChange { get; set; }
        public Field UpdateOnChangeParent { get; set; }
        public long? UpdateOnChangeParentId { get; set; }
        public long? HideOnSelectParentId { get; set; }
        public Field HideOnSelectParent { get; set; }
        public ICollection<Field> HideOnSelect { get; set; }

        /// <summary>
        /// اکشن آن اگر از نوع dropdown و غیره باشد
        /// </summary>
        public Action Action { get; set; }
        public long? ActionId { get; set; }

        /// <summary>
        /// اگر از نوع جدول باشد
        /// </summary>
        public Panel OpenInModalPanel { get; set; }
        public long? OpenInModalPanelId { get; set; }

        /// <summary>
        /// پنلی که دارای این فیلد است
        /// </summary>
        public Panel Panel { get; set; }
        public long PanelId { get; set; }

        /// <summary>
        /// ستون کد (وقتی جدول است و انتخاب میشود کدام نمایش و کدام مقدار دهی شود) ب
        /// </summary>
        public string IdColumnName { get; set; }

        /// <summary>
        /// ستون مقدار (وقتی جدول است و انتخاب میشود کدام نمایش و کدام مقدار دهی شود) ب
        /// </summary>
        public string ValueColumnName { get; set; }


    }
}
