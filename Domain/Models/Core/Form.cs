using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class Form : IModel
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }

        public string UrlName { get; set; }
        public long? ModelId { get; set; }
        public Model Model { get; set; }
        public ICollection<Action> Actions { get; set; }
        public ICollection<Panel> Panels { get; set; }

    }
}
