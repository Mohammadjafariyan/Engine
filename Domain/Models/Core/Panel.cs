using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class Panel : IModel
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }

        public int Order { get; set; }
        public long FormId { get; set; }
        public PanelType Type { get; set; }
        public PanelQueryType QueryType { get; set; }
        public Form Form { get; set; }
        public ICollection<Panel> Children{ get; set; }
        public ICollection<Field> Fields{ get; set; }
        public Panel Parent { get; set; }
        public long? ParentId { get; set; }

    }
}
