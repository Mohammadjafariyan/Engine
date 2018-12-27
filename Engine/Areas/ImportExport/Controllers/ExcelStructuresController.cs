using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Engine.Areas.ImportExport.Models;
using Engine.Areas.ImportExport.Service;
using Engine.Areas.ImportExport.ServiceTests;
using Engine.Areas.ImportExport.UiConstructs;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Service.AbstractControllers;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.ImportExport.Controllers
{
    public class ExcelStructuresController : EBaseAppController<ExcelStructreTable, CommonParameter>
    {
        public ExcelStructuresController()
        {
            _engineService = new ExcelStructreTableService();
            TableConstructProvider = new ExcelStructreTableConstruct();
            FormConstructProvider = new ExcelStructreTableConstruct();
        }

        public override async  Task<ActionResult> Save(ExcelStructreTable model)
        {
            if (!model.Table.HasValue)
            {
               throw new Exception("نوع جدولی یافت نشد");
            }
            
            return await base.Save(model);
        }


        public override async Task<ActionResult> ForEdit(long? id)
        {
            return Create(null, id);
        }

        public ActionResult Create(long? Table, long? id)
        {
            var postedModel =
                ViewData[GlobalNames.PostedModel] as Engine.Areas.ImportExport.ServiceTests.ExcelStructreTable;
            if (postedModel != null)
            {
                Table = (long) postedModel.Table ;
            }

            if (id.HasValue)
            {
                using (var db = new EngineContext())
                {
                    var table = db.ExcelStructreTables.Include("Nodes").FirstOrDefault(d => d.Id == id);
                    if (table == null)
                        throw new Exception("ساختار جدول یافت نشد");
                    return View("Create", table);
                }
            }

            try
            {
                if (Table.HasValue)
                {
                    ExcelStructureTableNames type = 0;
                    try
                    {
                        type = (ExcelStructureTableNames) Table.Value;
                    }
                    catch (Exception e)
                    {
                        throw new Exception("شماره نوع جدول اشتباه است");
                    }

                    var factory = new TableColumnsStructureFactory();
                    IExcelImporter impoerter = factory.GetImporter(factory.GetImporterName(type));

                    ExcelStructreTable tbl = impoerter.GetTableTemplate();
                    return View("Create", tbl);
                }
                else
                {
                    return View("Create", new ExcelStructreTable());
                }
            }
            catch (Exception e)
            {
                ViewData[GlobalNames.MVCResponseMessage] = new CustomResult
                {
                    Message = e.Message,
                    Status = CustomResultType.fail
                };

                return View("Create", new ExcelStructreTable());
            }
        }
    }
}