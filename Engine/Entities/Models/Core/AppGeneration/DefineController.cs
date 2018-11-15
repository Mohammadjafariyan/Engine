using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.Core.AppGeneration
{
    /// <summary>
    /// کنترولر
    /// </summary>
    public class DefineController:BaseEntity
    {
        public DefineController()
        {
            this.DefineControllerMethods = new List<DefineControllerMethod>();
        }

        
        /// <summary>
        /// نام
        /// </summary>
        [Text(Name = "نام سرویس ")]
        public override string Name { get; set; }
        

        /// <summary>
        /// ترجمه
        /// </summary>
        [Text(Name = "ترجمه ")]
        public string Translate { get; set; }

        /// <summary>
        /// زیر سیستم
        /// </summary>
        [DropDown(Name = " زیر سیستم",
            Service = GlobalNames.SubSystemServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long SubSystemId { get; set; }

        public virtual SubSystem SubSystem { get; set; }

        /// <summary>
        /// مدل اصلی
        /// </summary>
        [DropDown(Name = " مدل اصلی", Service = GlobalNames.ModelService, MethodName = GlobalNames.GetDropDownAsync)]
        public long ModelId { get; set; }


        [Checkbox(Name = "آیا از نوع فریمورک سیستمی است")]
        public bool IsSystemFramework { get; set; }

        public virtual Model Model { get; set; }

        public virtual ICollection<DefineControllerMethod> DefineControllerMethods { get; set; }
   
     
    }
}