using System.Collections.Generic;
using Engine.Areas.Absence.Controllers;
using Engine.Controllers.AbstractControllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.Absence.UiConstructs
{
    public class PersonnelConstructs : BaseConstructProvider, IFormConstructProvider, ITableConstructProvider
    {
        public override UiForm GetSaveForm()
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

        public override UiForm GetDataTableSearchForm()
        {
            return GetForm();
        }

        /*public override void GetTableUiItems(EjTable ejtable)
        {
            base.GetTableUiItems(ejtable);
            var GoToSave = new UiItem {Name = "دسترسی از طریق موبایل", UiItemType = UiItemType.GoToSave};

            GoToSave.CustomUrl = $@"/Mobile/WorkplacePersonnel/Create";
            //    Delete.CustomUrl =$@"/{CurrentArea}/Api/{CurrentController}Api/Delete";;


            ejtable.UiTableItems.Add(new UiTableItem {EjTable = ejtable, UiItem = Delete});
        }*/
    }
}