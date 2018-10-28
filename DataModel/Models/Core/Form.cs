using Engine.Attributes;
using Engine.Service.AbstractControllers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class Form : BaseEntity
    {

        [Text(Name="نام")]
        public string Name { get; set; }

        [Text(Name="آدرس")]
        public string UrlName { get; set; }
        public long? ModelId { get; set; }
        public Model Model { get; set; }

        public ICollection<Action> Actions { get; set; }

        public ICollection<Panel> Panels { get; set; }

    }
}
