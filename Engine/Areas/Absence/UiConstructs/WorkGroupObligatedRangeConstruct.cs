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
    public class WorkGroupObligatedRangeConstruct : BaseConstructProvider, IFormConstructProvider,
        ITableConstructProvider
    {
        public override UiForm GetSaveForm()
        {
            return GetForm();
        }

        private UiForm GetForm()
        {
            var uiform = new UiForm();
            uiform.Name = "WorkGroupObligatedRange";
            uiform.Translate = "بازه موظفی گروه کاری";

            UiFormInput WorkGroupId = GetDropDownInput("WorkGroup", MethodType.GetDropDown, "Absence",
                "WorkGroupId", "گروه کاری", FieldType.DropDown);
           
            
            
            
            UiFormInput ObligatedRangeId = GetDropDownInput("ObligatedRanges", MethodType.GetDropDown, "Absence",
                "ObligatedRangeId", "بازه موظفی", FieldType.Date);

            uiform.UiFormInputs.Add(WorkGroupId);
            uiform.UiFormInputs.Add(ObligatedRangeId);
            
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "DateTime", Translate = "تاریخ شروع به کار", FieldType = FieldType.Date}});


            return uiform;
        }


        public override UiForm GetDataTableSearchForm()
        {
            return null;
        }
    }
}