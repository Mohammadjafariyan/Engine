using System.Collections.Generic;
using System.ComponentModel;
using Engine.Areas.ImportExport.Models;
using Engine.Areas.ImportExport.Service;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Areas.ImportExport.ServiceTests
{
    public class ExcelStructreTable:IModel,IRemovable<ExcelStructreTableNode>
    {
        public ExcelStructreTable()
        {
            Nodes = new List<ExcelStructreTableNode>();
        }
        
        [DisplayName(" انتخاب جدول")]
        public ExcelStructureTableNames? Table { get; set; }
        public virtual List<ExcelStructreTableNode> Nodes { get; set; }
        
        /// <summary>
        /// در صورت نیاز برای گرفتن تایید کاربر بکار میرود
        /// </summary>
        [DisplayName("اگر آبجکت های وابسته صفر باشد ایجاد شود")]
        public bool Confirmed { get; set; }

        public long Id { get; set; }
        [DisplayName(" نام ساختار")]
        public string Name { get; set; }
    }
}