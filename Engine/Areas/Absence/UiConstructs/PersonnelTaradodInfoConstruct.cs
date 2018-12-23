using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.Absence.UiConstructs
{
    public class PersonnelTaradodInfoConstruct : BaseConstructProvider, IFormConstructProvider, ITableConstructProvider
    {
        public override UiForm GetSaveForm()
        {
            return null;
        }
        
        public override void GetTableUiItems(EjTable ejtable)
        {
            
        }

        private UiForm GetForm()
        {
            /*long personnelId, DateTime fromdate, DateTime dateto*/
            var uiform = new UiForm();
            uiform.Name = "SearchPersonnel";
            uiform.Translate = "فیلتر";

            /*
            UiFormInput PersonnelId = GetDropDownInput("Personnel", MethodType.GetDropDown, "Absence",
                "personnelId", "پرسنل", FieldType.DropDown);

            uiform.UiFormInputs.Add(PersonnelId);
*/


            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "from", Translate = "تاریخ از", FieldType = FieldType.Date}});

            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "to", Translate = "تاریخ تا", FieldType = FieldType.Date}});


            return uiform;
        }

        public override UiForm GetDataTableSearchForm()
        {
            return GetForm();
        }
    }
}