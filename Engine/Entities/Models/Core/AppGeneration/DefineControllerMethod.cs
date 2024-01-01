using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Entities.Models.ICore;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Entities.Models.Core.AppGeneration
{
    /// <summary>
    /// متد کنترولر
    /// </summary>
    public class DefineControllerMethod:BaseEntity
    {
        public DefineControllerMethod()
        {
            TableMethods = new List<TableMethod>();
            UiFormControllerMethods = new List<UiFormControllerMethod>();
            UiInputMethods = new List<UiInputMethod>();
        }
        
        
        public virtual ICollection<UiInputMethod> UiInputMethods { get; set; }


        /// <summary>
        /// نام
        /// </summary>
        [Text(Name = "نام متد ")]
        public override string Name { get; set; }

        /// <summary>
        /// ترجمه
        /// </summary>
        [Text(Name = "ترجمه ")]
        public string Translate { get; set; }
        
        /// <summary>
        /// در کلاس پدر است
        /// </summary>
        [Checkbox(Name = "در کلاس پدر است ")]
        public bool InParent { get; set; }

        /*/// <summary>
        /// زیر سیستم
        /// </summary>
        [DropDown(Name = " زیر سیستم",
            Service = GlobalNames.SubSystemServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long SubSystemId { get; set; }
*/


        /// <summary>
        /// کنترولر
        /// </summary>
        [DropDown(Name = " کنترولر",Service = GlobalNames.DefineControllerServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long DefineControllerId { get; set; }
        
        /// <summary>
        /// متد سرویس
        /// </summary>
        [DropDown(Name = " متد سرویس",Service = GlobalNames.DefineServiceMethodService, MethodName = GlobalNames.GetDropDownAsync)]
        public  long? ServiceMethodId { get; set; }

        public virtual ICollection<UiFormControllerMethod> UiFormControllerMethods { get; set; }

/*

                /// <summary>
                /// مدل اصلی
                /// </summary>
                [DropDown(Name = " مدل اصلی", Service = GlobalNames.ModelService, MethodName = GlobalNames.GetDropDownAsync)]
                public long ModelId { get; set; }

                public Model Model { get; set; }*/



        public virtual DefineController DefineController { get; set; }
        public virtual ServiceMethod ServiceMethod { get; set; }
        public ICollection<TableMethod> TableMethods { get; set; }

        [Enum(Name = "نوع ثابت سیستم")]
        public MethodType MethodType { get; set; }
    }


    public enum MethodType
    {
        Save,Delete,GetForEdit, GetDataTable,Details, GetDropDown, GetDataTableDataAsync,
        GetTreeDataAsync, GetMultiSelectDataAsync
    }
}