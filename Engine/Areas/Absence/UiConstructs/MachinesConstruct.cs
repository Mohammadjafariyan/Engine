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
    public class MachinesConstructs : BaseConstructProvider, IFormConstructProvider, ITableConstructProvider
    {
        public override UiForm GetSaveForm()
        {
            return GetForm();
        }

        private UiForm GetForm()
        {
            /*IP: string;
            MachineId: number;
            Name: string;
            PersonnelMachines: PersonnelMachine[];
            Port: string;*/
            var uiform = new UiForm();
            uiform.Name = "SaveMachine";
            uiform.Translate = "ثبت دستگاه";
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Name", Translate = "نام", FieldType = FieldType.Text}});
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "IP", Translate = "IP", FieldType = FieldType.Text}});
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Port", Translate = "Port", FieldType = FieldType.Text}});

            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "MachineId", Translate = "کد دستگاه", FieldType = FieldType.Text}});

            return uiform;
        }

        public override UiForm GetDataTableSearchForm()
        {
            return null;
        }
    }
}