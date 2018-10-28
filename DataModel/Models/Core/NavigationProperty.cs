using Engine.Attributes;
using Engine.Service.AbstractControllers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.Core.QueryBuild;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    /// <summary>
    /// نشان دهنده روابط جداول
    /// </summary>
    public class NavigationProperty : BaseEntity
    {
        [DropDown(Name = "مدل ", Service = GlobalNames.ModelService, MethodName = GlobalNames.GetDropDownAsync)]
        public long ModelId { get; set; }

        /// <summary>
        /// کد قبلی
        /// </summary>
        [DropDown(Name = "قبلی ", Service = GlobalNames.NavigationPropertiesService, MethodName = GlobalNames.GetDropDownAsync)]
        public long? PrevId { get; set; }
        [Text(Name="نام")]
        public string Name { get; set; }
        public Model Model { get; set; }

        /// <summary>
        ///  کدام پروپرتی را نشان می دهد
        /// </summary>
        public Property Property { get; set; }
        [Enum(Name = "نوع ")]
        public NavigationPropertyType NavigationPropertyType { get; set; }
        public ICollection<Column> Columns { get; set; }

        public List<NavigationProperty> Next { get; set; }
        public NavigationProperty Prev { get; set; }
    }
}
