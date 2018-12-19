using System.Collections.Generic;

namespace Engine.Areas.ImportExport.ServiceTests
{
    public class ExcelStructreTable
    {
        public ExcelStructreTable()
        {
            Nodes = new List<ExcelStructreTableNode>();
        }
        public int StartRow { get; set; }
        public int StartColumn { get; set; }
        public List<ExcelStructreTableNode> Nodes { get; set; }
        
        /// <summary>
        /// در صورت نیاز برای گرفتن تایید کاربر بکار میرود
        /// </summary>
        public bool Confirmed { get; set; }
    }
}