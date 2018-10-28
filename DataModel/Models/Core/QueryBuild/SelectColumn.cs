using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppIDEEngine.Models.Core.QueryBuild
{

    /// <summary>
    /// ستون هایی که با کوئری بدست می آیند
    /// </summary>
    public class SelectColumn
    {
        [Key]
        public long Id { get; set; }
        public long QueryId { get; set; }
        public long ColumnId { get; set; }
        public Query Query { get; set; }
        public Column Column { get; set; }

    }
}
