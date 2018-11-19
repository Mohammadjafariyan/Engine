using Engine.Attributes;
using Engine.DomainLayer.Models.Core.QueryBuild;
using Engine.Service.AbstractControllers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Newtonsoft.Json;
using WebAppIDEEngine.Models.Core.QueryBuild;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    /// <summary>
    /// فیلد های مدل های سیستم
    /// </summary>
    public class Property : BaseEntity
    {
        public Property()
        {
            if (NameInTableAsName == null)
            {
                NameInTableAsName = NameInTable;
            }
        }

        [DropDown(Name = "مدل ", Service = GlobalNames.ModelService, MethodName = GlobalNames.GetDropDownAsync)]
        public long ModelId { get; set; }

        [Text(Name = "نام در مدل")] public string NameInModel { get; set; }


        [Text(Name = "نام در جدول")] public string NameInTable { get; set; }

        [Enum(Name = "نوع ")] public PropertyType PropertyType { get; set; }
        [Enum(Name = "نوع در دیتابیس ")] public PropertyInDatabaseType PropertyInDatabaseType { get; set; }
        [Checkbox(Name = "NotMapped")] public bool NotMapped { get; set; }

        [Text(Name = "نام در جدول")] public string NameInTableAsName { get; set; }

        [Text(Name = "نام  مدل")] public string ModelName { get; set; }

        /// <summary>
        /// سایز در جدول دیتابیس
        /// </summary>
        [Text(Name = "سایز")]
        public int Size { get; set; }

        [Checkbox(Name = "Distinct")] public bool Distinct { get; set; }
        [Checkbox(Name = "Nullable")] public bool Nullable { get; set; }
        [Checkbox(Name = "PK")] public bool PK { get; set; }
        [Checkbox(Name = "FK")] public bool FK { get; set; }

        public override string Name { get; set; }


        [JsonIgnore] [XmlIgnore] public virtual Model Model { get; set; }
        // public ICollection<Column> Columns { get; set; }

        [JsonIgnore] [XmlIgnore] public ICollection<QueryProperty> UsedInQueries { get; set; }

        public NavigationProperty NavigationProperty { get; set; }

        [DropDown(Name = "پروپرتی رابطه", Service = GlobalNames.NavigationPropertiesService,
            MethodName = GlobalNames.GetDropDownAsync)]
        public long? NavigationPropertyId { get; set; }
    }
}