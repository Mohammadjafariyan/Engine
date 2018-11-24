using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Engine.Attributes;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.UiGeneratorModels
{
    public class UiInput :BaseEntity
    {
        public UiInput()
        {
            UiFormInputs = new List<UiFormInput>();
            UiInputMethods = new List<UiInputMethod>();
        }


        [Text(Name = "توضیحات نمایشی در فرم")]
        public string Description { get; set; }

        public virtual ICollection<UiFormInput> UiFormInputs { get; set; }
        public virtual ICollection<UiInputMethod> UiInputMethods { get; set; }

        
        
        [Text(Name="نام")]
        public override string Name { get; set; }

        [Text(Name="ترجمه")]
        public string Translate { get; set; }

        [Text(Name= "اندازه")]
        public int? Size { get; set; }

        [Text(Name= "Min")]
        public int? Min { get; set; }

        [Text(Name= "Max")]
        public int? Max { get; set; }

        [Text(Name= "Regex")]
        public string Regex { get; set; }

        public int Order { get; set; }

        [Enum(Name= "نوع نمایش")]
        public InputShowType InputShowType { get; set; }

        [Enum(Name= "نوع فعالی")]
        public InputDisableType InputDisableType { get; set; }


        [Enum(Name = "InputType")]
        public InputType InputType { get; set; }
        [Enum(Name = "FieldType")]
        public FieldType FieldType { get; set; }


        [DropDown(Name = "نام پروپرتی استفاده نشده", Service = GlobalNames.PropertyServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        [NotMapped]
        public long? PropertyId { get; set; }


    }
}