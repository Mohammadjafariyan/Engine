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
    /// فیلد های مدل های سیستم
    /// </summary>
    public class Property : IModel
    {
        [Key]
        public long Id { get; set; }
        public long ModelId { get; set; }
        public string NameInModel { get; set; }
        public string NameInTable { get; set; }

        public PropertyType PropertyType { get; set; }
        public PropertyInDatabaseType PropertyInDatabaseType { get; set; }
        public bool NotMapped { get; set; }

        /// <summary>
        /// سایز در جدول دیتابیس
        /// </summary>
        public int Size { get; set; }
        public bool Distinct { get; set; }
        public bool Nullable { get; set; }
        public bool PK { get; set; } 
        public bool FK { get; set; }

        public Model Model { get; set; }
        public ICollection<Column> Columns { get; set; }
        public NavigationProperty NavigationProperty { get; set; }
        public long? NavigationPropertyId { get; set; }
    }
}
