using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;

namespace WebAppIDEEngine.Models.Core.QueryBuild
{

    /// <summary>
    /// ستون های نتیجه کوئری
    /// </summary>
    public class Result
    {

        [Key]
        public long Id { get; set; }
        public long QueryId { get; set; }
        public long ColumnId { get; set; }
        public Query Query { get; set; }
        public Column Column { get; set; }
        public SqlFunctionType SqlFunctionType { get; set; }
    }
}
