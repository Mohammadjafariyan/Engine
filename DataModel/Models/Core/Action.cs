using Engine.Attributes;
using Engine.Service.AbstractControllers;
using Engine.Utility;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class Action :  BaseEntity
    {

        [DropDown(Name = "فرم| ها", Service = GlobalNames.FormService, MethodName = GlobalNames.GetDropDownAsync)]
        public long FormId { get; set; }
        [Text(Name="نام")]
        public string Name { get; set; }

        [Enum(Name = "نوع نمایش اکشن ها")]
        public ActionType ActionType { get; set; }

        [Enum(Name = "نوع متد اکشن ها")]
        public ActionMethodType ActionMethodType { get; set; }

        public Form Form { get; set; }

        public Query Query { get; set; }

        [DropDown(Name = "کوئری", Service = GlobalNames.ActionService, MethodName = GlobalNames.GetDropDownAsync)]
        public long? QueryId { get; set; }

        public ICollection<Field> Fields { get; set; }


        public ICollection<Parameter> Parameters { get; set; }


    }
}
