using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Attributes;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.UiGeneratorModels
{
    public partial class UiForm:BaseEntity
    {
        public UiForm()
        {
            this.UiFormControllerMethods = new List<UiFormControllerMethod>();
            UiFormInputs = new List<UiFormInput>();
            UiFormItems = new List<UiFormItem>();
            UiTableForms = new List<UiTableForm>();
        }



        
        public virtual ICollection<UiTableForm> UiTableForms { get; set; }
        public virtual ICollection<UiFormItem> UiFormItems { get; set; }

        [Text(Name = "نام")]
        public override string Name { get; set; }

        [Text(Name = "ترجمه")]
        public  string Translate { get; set; }


        [RelatedEntitiesLink(Name=GlobalNames.UiFormControllerMethodController, InverseFieldName= "UiFormId")]
        public virtual ICollection<UiFormControllerMethod> UiFormControllerMethods { get; set; }

        public virtual ICollection<UiFormInput> UiFormInputs { get; set; }
    }
}