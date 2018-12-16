using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Web.Mvc;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Controllers.AbstractControllers.ObjectBased
{
    public abstract class BaseConstructProvider : ITableConstructProvider, IFormConstructProvider
    {


        public string CurrentArea { get; set; }
        public string CurrentController { get; set; }
        public string CurrentAction { get; set; }
        
        public virtual UiForm GetSaveForm()
        {
            return null;
        }


        public  virtual UiForm GetDataTableSearchForm()
        {
            return null;
        }
        public  string GetEnumDescription<T>(T t)
        {
            FieldInfo fi = t.GetType().GetField(t.ToString());

            DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute), false);

            if (attributes != null && attributes.Length > 0) return attributes[0].Description;
            else return t.ToString();
        }
        
        protected SelectList GetEnumSelectList<T>() 
        {
            var sitems = new List<SelectListItem>();
            var vals = Enum.GetValues(typeof(T));
            foreach (var val in vals)
            {

                var enumVal = GetEnumDescription(val);

                var value=enumVal ?? val.ToString();
                sitems.Add(new SelectListItem
                {
                    Text = value,
                    Value = ((int) val).ToString()
                });
            }

            return new SelectList(sitems, "Value", "Text");
        }
        protected UiFormInput GetDropDownInput( string inputName, string inputTranslate
            , FieldType fieldType,SelectList selectList)
        {
            var inpt = new UiInput
            {
                Name = inputName,
                Translate = inputTranslate,
                FieldType = fieldType
            };
            return new UiFormInput
                {UiInput = inpt,SelectList=selectList};
        }

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

            GetTableUiItems(ejtable);
           
            return ejtable;
        }

        public virtual void GetTableUiItems(EjTable ejtable)
        {
            var GoToSave = new UiItem {Name = "ثبت جدید", UiItemType = UiItemType.GoToSave};
            var Delete = new UiItem {Name = "حذف", UiItemType = UiItemType.Delete};
            var items = new List<UiItem>();

            GoToSave.CustomUrl = $@"/{CurrentArea}/{CurrentController}/ForEdit";
        //    Delete.CustomUrl =$@"/{CurrentArea}/Api/{CurrentController}Api/Delete";;
            Delete.CustomUrl =$@"/{CurrentArea}/{CurrentController}/Delete";;

            items.Add(GoToSave);
            items.Add(Delete);

            ejtable.UiTableItems.Add(new UiTableItem {EjTable = ejtable, UiItem = GoToSave});
            ejtable.UiTableItems.Add(new UiTableItem {EjTable = ejtable, UiItem = Delete});

        }
    }
}