using System.Collections.Generic;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Controllers.AbstractControllers
{
    public abstract class BaseTableConstructProvider : ITableConstructProvider
    {
        

        protected UiFormInput GetDropDownInput(string controller,
            MethodType type, string area
            , string inputName, string inputTranslate, FieldType fieldType)
        {

            //باید لیست باشد
            var uiinputmethosd = new List<UiInputMethod>();

            //خود ورودی
            var WorkgroupId = new UiInput
            {
                Name = inputName,
                Translate = inputTranslate,
                FieldType = fieldType, UiInputMethods = uiinputmethosd
            };
            
            // متد اتصال ورودی
            var uiinputMethod = new UiInputMethod
            {
                ControllerName = controller,
                MethodName = type.ToString(),
                SubSystemName = area,
                UiInput = WorkgroupId,
                DefineControllerMethod = new DefineControllerMethod {MethodType = type}
            };

            uiinputmethosd.Add(uiinputMethod);

            return new UiFormInput
                {UiInput = WorkgroupId};
        }
        
        public EjTable GetDataTable(string actionName)
        {
            EjTable ejtable = new EjTable();
            ejtable.Name = actionName;
            ejtable.Translate = Utility.GetDescription(this.GetType());
            ejtable.TableMethods.Add(new TableMethod
            {
                EjTable = ejtable,
                DefineControllerMethod = new DefineControllerMethod
                    {Name = actionName, MethodType = MethodType.GetDataTable,}
            });


            var GoToSave = new UiItem {Name = "ثبت جدید", UiItemType = UiItemType.GoToSave};
            var Delete = new UiItem {Name = "حذف", UiItemType = UiItemType.Delete};
            var items = new List<UiItem>();

            items.Add(GoToSave);
            items.Add(Delete);

            ejtable.UiTableItems.Add(new UiTableItem {EjTable = ejtable, UiItem = GoToSave});
            ejtable.UiTableItems.Add(new UiTableItem {EjTable = ejtable, UiItem = Delete});

            return ejtable;
        }
    }
}