using System.Collections.Generic;
using Engine.Attributes;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.UiGeneratorModels
{
    
    /// <summary>
    /// جدول
    /// </summary>
    public class Table:BaseEntity
    {
        [Text(Name="نام")]
        public override string Name { get; set; }
        
        [Text(Name="ترجمه")]
        public string Translate { get; set; }

        public virtual ICollection<TableMethod> TableMethods { get; set; }

    }
}