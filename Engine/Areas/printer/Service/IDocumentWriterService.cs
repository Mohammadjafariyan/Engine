using System.Collections.Generic;
using Engine.Areas.printer.Models;

namespace Engine.Areas.printer.Service
{
    public interface IDocumentWriterService
    {
        void Write<T>(string url, List<T> data,string exportUrl,ExportType type) where T : IDocData;
    }

    public enum ExportType
    {
        Pdf,Docx,Html,Rtf,
        Txt
    }
}