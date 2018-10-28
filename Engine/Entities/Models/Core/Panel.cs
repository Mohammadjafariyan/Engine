using Engine.Attributes;
using Engine.Service.AbstractControllers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class Panel : BaseEntity
    {
        [Text(Name="نام")]
        public string Name { get; set; }

        [Text(Name="اولویت")]
        public int Order { get; set; }

        [DropDown(Name = "فرم ها", Service = GlobalNames.FormService, MethodName = GlobalNames.GetDropDownAsync)]
        public long FormId { get; set; }

        [Enum(Name = "نوع پنل")]
        public PanelType Type { get; set; }
        [Enum(Name = "نوع کوئری")]
        public PanelQueryType QueryType { get; set; }
        public Form Form { get; set; }
        public ICollection<Panel> Children{ get; set; }
        public ICollection<Field> Fields{ get; set; }
        public Panel Parent { get; set; }


        [DropDown(Name = "پنل والد", Service = GlobalNames.PanelService, MethodName = GlobalNames.GetDropDownAsync)]
        public long? ParentId { get; set; }

    }
}
