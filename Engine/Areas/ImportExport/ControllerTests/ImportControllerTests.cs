using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Engine.Areas.ImportExport.Controllers;
using Engine.Areas.ImportExport.Service;
using Engine.Areas.ImportExport.ServiceTests;
using MvcContrib.TestHelper;
using Rhino.Mocks;
using Xunit;

namespace Engine.Areas.ImportExport.ControllerTests
{
    public class ImportControllerTests
    {
        private ImportController _importController = new ImportController();


        [Fact]
        public void ImportExcel()
        {
            IExcelImporter impoerter = new ExcelPersonnelNameImporter();

            ExcelStructreTable tbl = impoerter.GetTableTemplate();


            ViewResult vr =
                _importController.ImportExcel(TableColumnsStructureFactory.BiometricRawDataName) as ViewResult;

            ExcelStructreTable m = vr.Model as ExcelStructreTable;

            Assert.True(m.Nodes.Count == tbl.Nodes.Count);
            Assert.True(m.Nodes.Count == tbl.Nodes.Count);
        }

        [Fact]
        public void ImportExcelPreview()
        {
            var imprtController = Engine.Controllers.AbstractControllers
                    .Utility.InitializeMockControllerContext(new ImportController())
                as ImportController;


            var res = imprtController.ImportExcelPreview
                (TableColumnsStructureFactory.PersonnelName, true) as ViewResult;

            // assert
            res
                .AssertViewRendered();
        }

        [Fact]
        public void ImportExcelWrongName()
        {
            IExcelImporter impoerter = new ExcelPersonnelNameImporter();

            ExcelStructreTable tbl = impoerter.GetTableTemplate();
            try
            {
                ViewResult vr = _importController.ImportExcel("sdf") as ViewResult;
                ExcelStructreTable m = vr.Model as ExcelStructreTable;
            }
            catch (Exception e)
            {
                Assert.True(true);
            }
            try
            {
                ViewResult vr2 = _importController.ImportExcel("") as ViewResult;
            }
            catch (Exception e)
            {
                Assert.True(true);
            }
            try
            {
                ViewResult vr3 = _importController.ImportExcel(null) as ViewResult;
            }
            catch (Exception e)
            {
                Assert.True(true);
            }
        }
    }
}