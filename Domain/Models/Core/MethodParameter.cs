using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;

namespace WebAppIDEEngine.Models.Core
{
    /// <summary>
    /// پارامتر از نوع جدول
    /// </summary>
    public class MethodParameter
    {
        [Key]
        public long Id { get; set; }
        public long ParameterId { get; set; }
        public long ModelId { get; set; }
        public Parameter Parameter { get; set; }
        public Model Model { get; set; }
    }
}
