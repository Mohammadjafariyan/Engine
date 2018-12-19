using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Engine.Areas.ImportExport.Service;
using Engine.Areas.ImportExport.ServiceTests;
using WebAppIDEEngine.Models;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.ImportExport.Controllers
{
    public class ImportController : Controller
    {
        public const string Error = "Error";
        public const string Success = "Success";

        public ActionResult ImportExcel(string tableName)
        {

            IExcelImporter impoerter = new TableColumnsStructureFactory().GetImporter(tableName);

            ExcelStructreTable tbl = impoerter.GetTableTemplate();
            return View(tbl);
        }

        public ActionResult ImportExcelSave(string tableName,bool confirmed)
        {
            try
            {
                IExcelImporter impoerter = new TableColumnsStructureFactory().GetImporter(tableName);
                ImportExcel(impoerter,confirmed);

                impoerter.Save();
                ExcelStructreTable tbl2 = impoerter.GetTableTemplate();
                ViewData[Success] = "با موفقیت ثبت شد";
                return View("ImportExcel", tbl2);
            }
            catch (Exception e)
            {
                ViewData[Error] = e.Message;
                return View("ImportExcel");
            }
        }


        private void ImportExcel(IExcelImporter impoerter,bool Confirmed)
        {
            if (impoerter == null)
                throw new Exception("impoerter ارسالی نال است ");

            var tbl = impoerter.GetTableTemplate();
            if (tbl == null)
                throw new Exception("tbl ارسالی نال است ");
            if (Request.Files.Count == 0)
                throw new Exception("هیچ فایلی ارسال نشده است ");

            tbl.Confirmed = Confirmed;

            var file = Request.Files[0];
            if (file == null)
                throw new Exception("فایل ارسال شده نال است ");

            Stream stream = file.InputStream;

            impoerter.ImportExcel(stream, tbl);

            impoerter.ValidateModels();
        }

        public ActionResult ImportExcelPreview(string tableName,bool confirmed )
        {
            try
            {
                IExcelImporter impoerter = new TableColumnsStructureFactory().GetImporter(tableName);
                ImportExcel(impoerter,confirmed);

                return View(impoerter.GetModels());
            }
            catch (Exception e)
            {
                ViewData[Error] = e.Message;
                return View();
            }
        }
    }
}