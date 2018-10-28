using Engine.Attributes;
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

    public class Query : BaseEntity
    {
        public string SQL { get; set; }
        public string LinQ { get; set; }
        [DataTable]
        public string LinQJoin { get; set; }
        public QueryType QueryType { get; set; }
        public ICollection<Action> Actions{ get; set; }
        public ICollection<Where> Wheres { get; set; }
        public ICollection<Sort> Sorts { get; set; }
        public ICollection<Result> Results { get; set; }
        public ICollection<SelectColumn> SelectColumns { get; set; }
        public ICollection<Parameter> Parameters { get; set; }
    }
}
