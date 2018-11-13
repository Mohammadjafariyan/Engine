using System.Collections.Generic;
using Engine.Attributes;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.UiGeneratorModels
{
    
    /// <summary>
    /// جدول
    /// </summary>
    public class EjTable:BaseEntity
    {
        public EjTable()
        {
            UiFormItems = new List<UiFormItem>();
            TableMethods = new List<TableMethod>();
            UiTableForms = new List<UiTableForm>();
        }
        public virtual ICollection<UiTableForm> UiTableForms { get; set; }

        [Text(Name="نام")]
        public override string Name { get; set; }
        
        [Text(Name="ترجمه")]
        public string Translate { get; set; }

        public virtual ICollection<TableMethod> TableMethods { get; set; }



        public virtual ICollection<UiFormItem> UiFormItems { get; set; }

    }
}