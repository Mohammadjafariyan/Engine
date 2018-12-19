using System.Collections.Generic;
using System.IO;
using System.Security.AccessControl;
using Engine.Areas.printer.Models;
using Engine.Areas.printer.Service;
using Xunit;

namespace Engine.Areas.printer.ServiceTests
{
    public class SautinsoftDocumentWriterServiceTests
    {
        [Fact]
        public void AddSecurity()
        {
            string url = @"d://Doc1.docx";
            string exporturl = @"d://TestExport";
            FileSecurityService.AddDirectorySecurity(url,
                @"MYDOMAIN\BALAJIBASKAR",
                FileSystemRights.ReadData,
                AccessControlType.Allow);
        }

        [Fact]
        public void ExportTest()
        {
            var writer = new SautinsoftDocumentWriterService();
            string url = @"d://Doc1.docx";
            string exporturl = @"d://TestExport";

            var data = new DocData
            {
                Name = "@title",
                Value = "سلام دنیا",
                DocType = DocType.Text
            };
            
            List<DocData> list=new List<DocData>
            {
                data
            };
            writer.Write(url,list,exporturl,ExportType.Pdf);
            writer.Write(url,list,exporturl,ExportType.Docx);
            
            
            var text=File.ReadAllText(url);
            Assert.True(text.IndexOf(data.Value)!=-1);
        }
    }
}