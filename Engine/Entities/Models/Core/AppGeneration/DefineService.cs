using Engine.Attributes;
using Engine.Service.AbstractControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.Core.AppGeneration
{
    /// <summary>
    /// سرویس  زیر سیستم    
    /// </summary>
    public class DefineService : BaseEntity
    {

        public DefineService()
        {
            this.ServiceMethods = new List<ServiceMethod>();
        }
        /// <summary>
        /// نام
        /// </summary>
        [Text(Name = "نام سرویس ")]
        public string Name { get; set; }

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

        public SubSystem SubSystem { get; set; }

        /// <summary>
        /// مدل اصلی
        /// </summary>
        [DropDown(Name = " مدل اصلی", Service = GlobalNames.FormService, MethodName = GlobalNames.GetDropDownAsync)]
        public long ModelId { get; set; }

        public Model Model { get; set; }

        public virtual ICollection<ServiceMethod> ServiceMethods { get; set; }

    }
}