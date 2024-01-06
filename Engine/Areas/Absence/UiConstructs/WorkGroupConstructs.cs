using System.Collections.Generic;
using Engine.Areas.Absence.Controllers;
using Engine.Controllers.AbstractControllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.Absence.UiConstructs
{
    public class WorkGroupConstructs : BaseConstructProvider, IFormConstructProvider, ITableConstructProvider
    {
        public override UiForm GetSaveForm()
        {
            return GetForm();
        }
        
        

        private UiForm GetForm()
        {
            var uiform = new UiForm();
            uiform.Name = "SaveWorkGroup";
            uiform.Translate = "ثبت گروه کاری جدید";
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Name", Translate = "نام", FieldType = FieldType.Text}});

            return uiform;
        }

       

        public override UiForm GetDataTableSearchForm()
        {
            return null;
        }
    }
}