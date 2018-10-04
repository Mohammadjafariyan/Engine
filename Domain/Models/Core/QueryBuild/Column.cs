using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppIDEEngine.Models.Core.QueryBuild
{
    /// <summary>
    /// ستون یا خروجی کوئری
    /// </summary>
    public class Column
    {
        [Key]
        public long Id { get; set; }
        public long? PropertyId { get; set; }
        public long? NavigationPropertyId { get; set; }
        public string Name { get; set; }
        public string TName { get; set; }
        public int Order { get; set; }
        public Property Property { get; set; }
        public NavigationProperty NavigationProperty { get; set; }
    }
}
