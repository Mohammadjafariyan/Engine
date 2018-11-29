using System.Collections.Generic;
using Engine.Areas.Absence.Controllers;
using Engine.Controllers.AbstractControllers;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.Absence.UiConstructs
{
    public class PersonnelConstructs : BaseTableConstructProvider, IFormConstructProvider, ITableConstructProvider
    {
        public UiForm GetSaveForm()
        {
            return GetForm();
        }

        private UiForm GetForm()
        {
            var uiform = new UiForm();
            uiform.Name = "SavePersonnel";
            uiform.Translate = "ثبت پرسنل جدید";
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Name", Translate = "نام", FieldType = FieldType.Text}});
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "LastName", Translate = "نام خانوادگی", FieldType = FieldType.Text}});
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Code", Translate = "کد ملی", FieldType = FieldType.Text}});


            UiFormInput input = GetDropDownInput("WorkGroup", MethodType.GetDropDown, "Absence",
                "WorkGroupId", "گروه کاری", FieldType.DropDown);


            uiform.UiFormInputs.Add(input);


            return uiform;
        }

        public UiForm GetDataTableSearchForm()
        {
            return GetForm();
        }
    }
}