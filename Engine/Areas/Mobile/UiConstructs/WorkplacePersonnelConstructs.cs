using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.ViewModel;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.Absence.UiConstructs
{
    public class WorkplacePersonnelConstructs : BaseConstructProvider, IFormConstructProvider, ITableConstructProvider
    {
        public override UiForm GetSaveForm()
        {
            return GetForm();
        }
        

        private UiForm GetForm()
        {
            var uiform = new UiForm();
            uiform.Name = "Workplaces";
            uiform.Translate = "دسترسی موبایلی به پرسنل";

            WorkplacePersonnel sp;
            UiFormInput input = GetDropDownInput("personnel", MethodType.GetDropDown, "Absence",
                "PersonnelId", "پرسنل", FieldType.DropDown);
                
            uiform.UiFormInputs.Add(input);
            
            UiFormInput workplaceinput = GetDropDownInput("Workplaces", MethodType.GetDropDown, "Mobile",
                "WorkplaceId", "محل کار", FieldType.DropDown);
                
            uiform.UiFormInputs.Add(workplaceinput);
  
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "ApplicationUserUserName", Translate = "نام ادمین", FieldType = FieldType.Text}});

            
            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Username", Translate = "نام کاربری", FieldType = FieldType.Text,PlaceHolder="پیشفرض کد ملی پرسنل"}});

            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Password", Translate = "رمز عبور", FieldType = FieldType.Text,PlaceHolder="پیشفرض کد ملی پرسنل"}});

            
            uiform.UiFormInputs.Add(new UiFormInput
            {
                UiInput = new UiInput
                {
                    Name = "IsAdmin", Translate = "آیا ادمین محل کاری است ؟ ",
                    FieldType = FieldType.Text, InputType = InputType.Checkbox
                }
            });
            



            return uiform;
        }

        public override UiForm GetDataTableSearchForm()
        {
            return null;
        }
    }
}