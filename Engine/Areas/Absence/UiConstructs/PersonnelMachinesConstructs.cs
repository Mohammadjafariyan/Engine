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
    public class PersonnelMachinesConstructs : BaseConstructProvider, IFormConstructProvider, ITableConstructProvider
    {
        public override UiForm GetSaveForm()
        {
            return GetForm();
        }

        private UiForm GetForm()
        {
            
            
        /*public  long MachineId{ get; set; }
        public long   PersonnelId{ get; set; }
        public long   UserIdInMachine{ get; set; }*/
            var uiform = new UiForm();
            uiform.Name = "SavePersonnel";
            uiform.Translate = "ثبت پرسنل جدید";
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "UserIdInMachine"
                    , Translate = "کد کاربر در دستگاه", FieldType = FieldType.Text}});


            UiFormInput input = GetDropDownInput("Machines", MethodType.GetDropDown, "Absence",
                "MachineId", "دستگاه", FieldType.DropDown);
           
            UiFormInput PersonnelId = GetDropDownInput("Personnel", MethodType.GetDropDown, "Absence",
                "PersonnelId", "پرسنل", FieldType.DropDown);
            
            uiform.UiFormInputs.Add(input);
            uiform.UiFormInputs.Add(PersonnelId);


            return uiform;
        }

        public override UiForm GetDataTableSearchForm()
        {
            return null;
        }
    }
}