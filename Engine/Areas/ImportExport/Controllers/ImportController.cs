using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Engine.Areas.ImportExport.Service;
using Engine.Areas.ImportExport.ServiceTests;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.ImportExport.Controllers
{
    public class ImportController : Controller
    {
        public static string Error = "Error";
        public static string Success = "Success";


        public ActionResult Index()
        {
            using (var db = new EngineContext())
            {
                return View(db.ExcelStructreTables.ToList());
            }
        }

        public ActionResult ImportExcel(long id)
        {
            using (var db = new EngineContext())
            {
                var model = db.ExcelStructreTables.Include("Nodes").Where(d => d.Id == id).FirstOrDefault();
                if (model == null)
                {
                    EBaseAppController<ExcelStructreTable, CommonParameter>
                        .GenErrorMessage(ViewData, "مدل یافت نشد");
                    return View("Index");
                }
                else
                {
                    return View("ImportExcel", model);
                }
            }
        }

        public ActionResult ImportExcelSave(long id, bool confirmed)
        {
            try
            {
                return  ImportExcelHelper(id, confirmed, true, "با موفقیت ثبت شد","ImportExcelPreview");
            }
            catch (Exception e)
            {
                EBaseAppController<ExcelStructreTable, CommonParameter>
                    .GenErrorMessage(ViewData, e.Message);
                return View("ImportExcel");
            }
        }


        private void ImportExcelMainFunction(IExcelImporter impoerter, ExcelStructreTable tbl, bool Confirmed)
        {
            if (impoerter == null)
                throw new Exception("impoerter ارسالی نال است ");

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

        private ActionResult ImportExcelHelper(long id, 
            bool confirmed, bool isSave,
            string msg,string viewName)
        {
            using (var db = new EngineContext())
            {
                var model = db.ExcelStructreTables.Find(id);
                if (model == null)
                {
                    EBaseAppController<ExcelStructreTable, CommonParameter>
                        .GenErrorMessage(ViewData, "ساختار اکسل یافت نشد");
                    return View("ImportExcel");
                }

                if (!model.Table.HasValue)
                {
                    EBaseAppController<ExcelStructreTable, CommonParameter>
                        .GenErrorMessage(ViewData, "نوع جدولی یافت نشد");
                    return View("ImportExcel");
                }

                var table = new TableColumnsStructureFactory();
                IExcelImporter impoerter = table.GetImporter(table
                    .GetImporterName(model.Table.Value));

                ImportExcelMainFunction(impoerter, model, confirmed);
                var models = impoerter.GetModels();

                ViewData["ModelsName"] = models;


                if (isSave)
                {
                    impoerter.Save();
                }

                ViewData[Success] = msg;
                return View(viewName,model);
            }
        }

        public ActionResult ImportExcelPreview(long id, bool confirmed)
        {
            try
            {
                return ImportExcelHelper(id, confirmed, false,
                    "دیتای زیر از فایل وارد شده استخراج گردیده است و جهت پیش نمایش می باشد",
                    "ImportExcelPreview");
            }
            catch (Exception e)
            {
                EBaseAppController<ExcelStructreTable, CommonParameter>
                    .GenErrorMessage(ViewData, e.Message);
                return ImportExcel(id);
            }
        }
    }
}