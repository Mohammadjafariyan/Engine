using System;
using System.IO;
using System.Linq;
using System.Web.Http.Validation;
using Engine.Areas.ImportExport.Service;
using Engine.Entities.Data;
using ServiceLayer.Base;
using WebAppIDEEngine.Models;
using Xunit;

namespace Engine.Areas.ImportExport.ServiceTests
{
    public class ImportTests
    {
        [Fact]
        public void TableColumnsStructureRepositoryGetInterfaceTest()
        {
            var tblRep = new TableColumnsStructureFactory();
            var o = tblRep.GetImporter(TableColumnsStructureFactory.BiometricRawDataName);

            Assert.True(o is ExcelBiometryDataImporter);
            try
            {
                var o2 = tblRep.GetImporter("sfd");
                Assert.True(false);
            }
            catch (ExcelImporterException e)
            {
                Assert.True(true);
            }

            try
            {
                var o2 = tblRep.GetImporter(null);
                Assert.True(false);
            }
            catch (ExcelImporterException e)
            {
                Assert.True(true);
            }
        }

        /// <summary>
        /// فایل گروه کاری نال دارد ، و کاربر تایید نکرده است که گروه کاری جدید ثبت شود
        /// </summary>
        [Fact]
        public void ImportExcelToBiometryDataTestNotConfirmed()
        {
            IExcelImporter impoerter = new ExcelPersonnelNameImporter();

            ExcelStructreTable tbl = impoerter.GetTableTemplate();

            var exelUrl = "D:\\temp\\work\\personnel.xlsx";
            Stream stream = File.OpenRead(exelUrl);

            impoerter.ImportExcel(stream, tbl);
            try
            {
                impoerter.ValidateModels();
                Assert.True(false);
            }
            catch (ExcelImporterException e)
            {
                Assert.True(true);
            }
    }

        [Fact]
        public void ImportExcelToPersonnelWrongGroupIds()
        {
            IExcelImporter impoerter = new ExcelPersonnelNameImporter();

            ExcelStructreTable tbl = impoerter.GetTableTemplate();

            var exelUrlWithWrongGroupids = "D:\\temp\\work\\personnel.xlsx";
            Stream stream = File.OpenRead(exelUrlWithWrongGroupids);

            tbl.Confirmed = true;
            impoerter.ImportExcel(stream, tbl);

            try
            {
                impoerter.ValidateModels();
                Assert.True(false);
            }
            catch (ExcelImporterException e)
            {
                Assert.True(true);
            }


        }

        [Fact]
        public void ImportExcelToPersonnelTest()
        {
            IExcelImporter impoerter = new ExcelPersonnelNameImporter();

            ExcelStructreTable tbl = impoerter.GetTableTemplate();

            var exelUrlWithWrongGroupids = "D:\\temp\\work\\personnel - Copy.xlsx";
            Stream stream = File.OpenRead(exelUrlWithWrongGroupids);

            tbl.Confirmed = true;
            impoerter.ImportExcel(stream, tbl);
            
            impoerter.ValidateModels();
         
            
            var WorkGroupscount = 0;
            var personnelcount = 0;
            using (var db=new EngineContext())
            {
                WorkGroupscount= db.WorkGroups.Count();
                personnelcount=  db.Personnels.Count();
            }
         
            impoerter.Save();
             
            // آیا ذخیره می کند
            using (var db=new EngineContext())
            {
                Assert.True(WorkGroupscount<=db.WorkGroups.Count());
                Assert.True(personnelcount<=db.Personnels.Count());
                WorkGroupscount= db.WorkGroups.Count();
                personnelcount=  db.Personnels.Count();
            }
            
            impoerter.Save();
            // باید اگر دوباره ذخیره کردیم ، باید اپدییت کند و جدید ذخیره نکند
            using (var db=new EngineContext())
            {
                Assert.True(WorkGroupscount==db.WorkGroups.Count());
                Assert.True(personnelcount==db.Personnels.Count());
            }
            
        }
        
        
      
         
        [Fact]
        public void ImportExcelToPersonnelTestWrongFileStructure()
        {
            try
            {
                IExcelImporter impoerter = new ExcelPersonnelNameImporter();

                ExcelStructreTable tbl = impoerter.GetTableTemplate();

                var exelUrl = "D:\\temp\\work\\wrong.xlsx";
                Stream stream = File.OpenRead(exelUrl);

                impoerter.ImportExcel(stream, tbl);
                Assert.True(false);
            }
            catch (ExcelImporterException E)
            {
                Assert.True(true);
            }
        }
        
        
    }
}