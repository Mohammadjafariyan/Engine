using Engine.Attributes;
using Engine.Service.AbstractControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Entities.Models.ICore;
using WebAppIDEEngine.Models.Core;

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

        public virtual Model Model { get; set; }

        public virtual ICollection<ServiceMethod> ServiceMethods { get; set; }

    }
}