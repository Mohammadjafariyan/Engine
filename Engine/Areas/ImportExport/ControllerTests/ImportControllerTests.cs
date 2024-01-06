using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Engine.Areas.ImportExport.Controllers;
using Engine.Areas.ImportExport.Service;
using Engine.Areas.ImportExport.ServiceTests;
using Engine.Entities.Data;
using MvcContrib.TestHelper;
using Rhino.Mocks;
using WebAppIDEEngine.Models;
using Xunit;

namespace Engine.Areas.ImportExport.ControllerTests
{
    public class ImportControllerTests
    {
        [Fact]
        public void ImportExcel()
        {
            var controller = Engine.Controllers.AbstractControllers
                    .EngineUtility.InitializeMockControllerContext(new ImportController())
                as ImportController;

            using (var db = new EngineContext())
            {
                var model = db.ExcelStructreTables.FirstOrDefault();

                if (model != null)
                {
                    ViewResult vr =
                        controller.ImportExcel(model.Id) as ViewResult;

                    ExcelStructreTable table = vr.Model as ExcelStructreTable;

                    Assert.NotNull(table);
                    Assert.True(table.Nodes.Count > 0);
                }
                else
                {
                    try
                    {
                        ViewResult vr =
                            controller.ImportExcel(6516465) as ViewResult;
                        Assert.True(false);
                    }
                    catch (Exception e)
                    {
                        Assert.True(true);
                    }
                }
            }
        }

        [Fact]
        public void ImportExcelPreview()
        {
            var imprtController = Engine.Controllers.AbstractControllers
                    .EngineUtility.InitializeMockControllerContext(new ImportController())
                as ImportController;


            using (var db = new EngineContext())
            {
                var model = db.ExcelStructreTables.FirstOrDefault();
                if (model != null)
                {
                    var res = imprtController.ImportExcelPreview
                        (model.Id, true) as ViewResult;
                    Assert.NotNull(res.Model);
                    var table = res.Model as ExcelStructreTable;
                    Assert.NotNull(table);
                    Assert.True(table.Nodes.Count > 0);

                    // assert
                    Assert.NotNull(res
                        .AssertViewRendered().ViewData["ModelsName"]);

                    var list = res
                        .AssertViewRendered().ViewData["ModelsName"] as List<dynamic>;

                    Assert.NotNull(list);
                    Assert.True(list.Count > 0);
                    Assert.Equal(list.GetType().GetProperties().Length, model.Nodes.Count);
                }
                else
                {
                    try
                    {
                        var res = imprtController.ImportExcelPreview
                            (0, true) as ViewResult;
                    }
                    catch (Exception e)
                    {
                        Assert.True(true);
                    }

                    // دیتایی برای تیست نیست
                    Assert.True(false);
                }
            }
        }


        [Fact]
        public void ImportExcelWrongName()
        {
            var _importController = Engine.Controllers.AbstractControllers
                    .EngineUtility.InitializeMockControllerContext(new ImportController())
                as ImportController;
            using (var db = new EngineContext())
            {
                var model = db.ExcelStructreTables.FirstOrDefault();

                if (model != null)
                {
                    try
                    {
                        ViewResult vr = _importController.ImportExcel(model.Id) as ViewResult;
                        ExcelStructreTable m = vr.Model as ExcelStructreTable;
                    }
                    catch (Exception e)
                    {
                        Assert.True(true);
                    }

                    try
                    {
                        ViewResult vr2 = _importController.ImportExcel(65156) as ViewResult;
                    }
                    catch (Exception e)
                    {
                        Assert.True(true);
                    }

                    try
                    {
                        ViewResult vr3 = _importController.ImportExcel(651) as ViewResult;
                    }
                    catch (Exception e)
                    {
                        Assert.True(true);
                    }
                }
            }
        }
    }
}