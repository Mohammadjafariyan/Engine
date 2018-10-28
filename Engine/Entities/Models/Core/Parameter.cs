using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    /// <summary>
    /// پارامتر های اکشن ها
    /// </summary>
    public class Parameter: BaseEntity
    {
        public string Name { get; set; }
        public bool IsNullable { get; set; }
        public Action Action { get; set; }
        public long ActionId { get; set; }
        public Query Query { get; set; }
        public long? QueryId { get; set; }
        public MethodParameterType MethodParameterType { get; set; }
        public ICollection<MethodParameter> MethodParameters { get; set; }
        

    }
}
