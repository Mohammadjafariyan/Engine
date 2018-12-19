using System.Collections.Generic;
using System.IO;
using Spire.Pdf.Exporting.XPS.Schema;

namespace Engine.Areas.ImportExport.ServiceTests
{
    public interface IExcelImporter
    {
        ExcelStructreTable GetTableTemplate();
        void ImportExcel(Stream stream, ExcelStructreTable tbl);
        List<dynamic> GetModels();
        void Save();
         void ValidateModels();
    }
}