using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.Core.AppGeneration
{
    /// <summary>
    /// زیر سیستم
    /// </summary>
    public class SubSystem:BaseEntity
    {
        /// <summary>
        /// نام
        /// </summary>
        [Text(Name="نام")]
        public string Name { get; set; }

        /// <summary>
        /// ترجمه
        /// </summary>
        [Text(Name = "ترجمه")]
        public string Translate { get; set; }



        /// <summary>
        /// نصب شده یا خیر
        /// </summary>
        [Checkbox(Name="نصب شده")]
        public bool IsInstalled { get; set; }


        public virtual ICollection<DefineService> DefineServices { get; set; }
        public virtual ICollection<DefineController> DefineControllers { get; set; }
        
    }
}