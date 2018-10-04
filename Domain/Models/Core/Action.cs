using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class Action : IModel
    {
        [Key]
        public long Id { get; set; }
        public long FormId { get; set; }
        public string Name { get; set; }
        public ActionType ActionType { get; set; }
        public ActionMethodType ActionMethodType { get; set; }
        public Form Form { get; set; }
        public Query Query { get; set; }
        public long? QueryId { get; set; }

        public ICollection<Field> Fields { get; set; }


        public ICollection<Parameter> Parameters { get; set; }


    }
}
