using System.Collections.Generic;
using Engine.Attributes;
using Engine.Entities.Models.ICore;
using Engine.Entities.Models.UiGeneratorModels;

namespace WebAppIDEEngine.Models.UiGeneratorModels
{
    
    /// <summary>
    /// جدول
    /// </summary>
    public class EjTable:BaseEntity
    {
        public EjTable()
        {
            UiTableItems = new List<UiTableItem>();
            TableMethods = new List<TableMethod>();
            UiTableForms = new List<UiTableForm>();
        }
        public virtual ICollection<UiTableForm> UiTableForms { get; set; }

        [Text(Name="نام")]
        public override string Name { get; set; }
        
        [Text(Name="ترجمه")]
        public string Translate { get; set; }

        public virtual ICollection<TableMethod> TableMethods { get; set; }



        public virtual ICollection<UiTableItem> UiTableItems { get; set; }

    }
}