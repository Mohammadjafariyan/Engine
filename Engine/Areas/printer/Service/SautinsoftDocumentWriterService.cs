using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Engine.Areas.printer.Models;
using SautinSoft.Document;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.printer.Service
{
    public class SautinsoftDocumentWriterService : IDocumentWriterService
    {
        /// <summary>
        /// از روی template یک داکیومنت می سازد
        /// </summary>
        public void Write<T>(string url, List<T> data
            , string exportUrl, ExportType type) where T : IDocData
        {
            if (!File.Exists(url))
            {
                throw new Exception("فایل موجود نیست");
            }

            if (File.Exists(exportUrl))
            {
                throw new Exception("دایرکتوری برای خروجی یک فایل است باید دایرکتوری باشد");
            }

            string name = GenerateName(5);
            var dir = Path.GetDirectoryName(url);

            var newName = dir + Path.PathSeparator + name + ".docx";
            while (File.Exists(newName))
            {
                newName = GenerateName(5);

                newName = dir + Path.DirectorySeparatorChar + newName + ".docx";
            }

            File.Copy(url, newName);

            DocumentCore dc = DocumentCore.Load(newName);


            foreach (var docData in data)
            {
                switch (docData.DocType)
                {
                    case DocType.Text:
                        ReplaceText(dc, docData.Name, docData.Value);
                        break;
                }
            }

            var saveName = exportUrl + Path.DirectorySeparatorChar + name+ ".pdf";

            switch (type)
            {
                case ExportType.Pdf:
                    dc.Save(saveName , SaveOptions.PdfDefault);
                    break;
                case ExportType.Html:
                    dc.Save(exportUrl, SaveOptions.HtmlFlowingDefault);
                    break;
                case ExportType.Docx:
                    dc.Save(exportUrl, SaveOptions.DocxDefault);
                    break;
                case ExportType.Rtf:
                    dc.Save(exportUrl, SaveOptions.RtfDefault);
                    break;
                case ExportType.Txt:
                    dc.Save(exportUrl, SaveOptions.TxtDefault);
                    break;
                default:
                    dc.Save(exportUrl, SaveOptions.PdfDefault);
                    break;
            }
        }

        private void ReplaceText(DocumentCore dc, string @docDataName, string @toReplace)
        {
            Regex regex = new Regex(@docDataName, RegexOptions.IgnoreCase);
            foreach (ContentRange item in dc.Content.Find(regex))
            {
                item.Replace(@toReplace);
            }
        }


        public static string GenerateName(int len)
        {
            Random r = new Random();
            string[] consonants =
            {
                "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "l", "n", "p", "q", "r", "s", "sh", "zh", "t", "v",
                "w", "x"
            };
            string[] vowels = {"a", "e", "i", "o", "u", "ae", "y"};
            string Name = "";
            Name += consonants[r.Next(consonants.Length)].ToUpper();
            Name += vowels[r.Next(vowels.Length)];
            int
                b = 2; //b tells how many times a new letter has been added. It's 2 right now because the first two letters are already in the name.
            while (b < len)
            {
                Name += consonants[r.Next(consonants.Length)];
                b++;
                Name += vowels[r.Next(vowels.Length)];
                b++;
            }

            return Name;
        }
    }
}