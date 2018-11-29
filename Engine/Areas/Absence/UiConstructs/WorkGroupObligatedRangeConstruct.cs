using System.Collections.Generic;
using Engine.Areas.Absence.Controllers;
using Engine.Controllers.AbstractControllers;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.Absence.UiConstructs
{
    public class WorkGroupObligatedRangeConstruct : BaseTableConstructProvider, IFormConstructProvider,
        ITableConstructProvider
    {
        public UiForm GetSaveForm()
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
                "ObligatedRangeId", "بازه موظفی", FieldType.DropDown);

            uiform.UiFormInputs.Add(WorkGroupId);
            uiform.UiFormInputs.Add(ObligatedRangeId);

            return uiform;
        }


        public UiForm GetDataTableSearchForm()
        {
            return GetForm();
        }
    }
}