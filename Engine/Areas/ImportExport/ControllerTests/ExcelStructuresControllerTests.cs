using System;
using System.Linq;
using System.Web.Mvc;
using Engine.Areas.ImportExport.Controllers;
using Engine.Areas.ImportExport.Models;
using Engine.Areas.ImportExport.ServiceTests;
using WebAppIDEEngine.Models;
using Xunit;

namespace Engine.Areas.ImportExport.ControllerTests
{
    public class ExcelStructuresControllerTests
    {

        [Fact]
        public void CreateTest()
        {
            var controller = Engine.Controllers.AbstractControllers
                    .EngineUtility.InitializeMockControllerContext(new ExcelStructuresController())
                as ExcelStructuresController;
            controller.MockAreaName = "absence";

            var res=controller.Create((long) ExcelStructureTableNames.Personnel, null) as ViewResult;
            Assert.NotNull(res.Model);
            Assert.NotNull(res.Model as ExcelStructreTable);
            var model = res.Model as ExcelStructreTable;
            Assert.True(model.Nodes.Count!=0);
            try
            {
                var res2=controller.Create((long) ExcelStructureTableNames.Personnel, 651651) as ViewResult;

                Assert.True(false);
            }
            catch (Exception e)
            {
                Assert.True(true);
            }

            using (var db=new EngineContext())
            {
                var f=db.ExcelStructreTables.FirstOrDefault();
                if (f != null)
                {
                    var res3=controller.Create((long) ExcelStructureTableNames.Personnel, f.Id) as ViewResult;
                    Assert.NotNull(res3.Model);
                    Assert.NotNull(res3.Model as ExcelStructreTable);
                    var model2 = res3.Model as ExcelStructreTable;
                    Assert.True(model2.Nodes.Count!=0);
                    Assert.NotNull(model2.Table);

                }
            }
            
            
        }

        [Fact]
        public void SaveTest()
        {
            
            var controller = Engine.Controllers.AbstractControllers
                    .EngineUtility.InitializeMockControllerContext(new ExcelStructuresController())
                as ExcelStructuresController;
            controller.MockAreaName = "absence";
            
            var str = new ExcelStructreTable();
            str.Table = ExcelStructureTableNames.Personnel;
            str.Name = "test";
            str.Nodes.Add(new ExcelStructreTableNode
            {
                ColumnName = "Id",
                NumberInExcel = 0
            });
            str.Nodes.Add(new ExcelStructreTableNode
            {
                ColumnName = "Name",
                NumberInExcel = 1
            });

            controller.Save(str) ;

            
           

            Assert.True(str.Id != 0);
            Assert.True(!str.Nodes.Any(n => n.Id == 0));

            str.Nodes.First().IsRemoved = true;
            controller.Save(str);

            using (var db = new EngineContext())
            {
                var rec=db.ExcelStructreTables.Find(str.Id);
                Assert.True(rec.Nodes.Count==1);
            }
            


            controller.Delete(str.Id);
            using (var db = new EngineContext())
            {
                Assert.Null(db.ExcelStructreTables.Find(str.Id));
            }

            try
            {
                str.Nodes.Add(new ExcelStructreTableNode
                {
                    ColumnName = "Name",
                    NumberInExcel = 0
                });
                str.Nodes.Add(new ExcelStructreTableNode
                {
                    ColumnName = "Name",
                    NumberInExcel = 0
                });

                controller.Save(str);

                // دو ستون با کد یکسان
                Assert.True(false);
            }
            catch (Exception e)
            {
                Assert.True(true);
            }

            try
            {
                str = new ExcelStructreTable();
                str.Table = ExcelStructureTableNames.Personnel;
                str.Name = "test";
                str.Nodes.Add(new ExcelStructreTableNode
                {
                    ColumnName = "Name",
                    NumberInExcel = 0
                });
                str.Nodes.Add(new ExcelStructreTableNode
                {
                    ColumnName = "Name",
                    NumberInExcel = 1
                });

                str.Nodes.Add(new ExcelStructreTableNode
                {
                    ColumnName = "Name",
                    NumberInExcel = 1,
                    IsRemoved = true
                });

                controller.Save(str);

                // دو ستون با نام و removed یکسان
                Assert.True(false);
            }
            catch (Exception e)
            {
                Assert.True(true);
            }


            str = new ExcelStructreTable();
            str.Table = ExcelStructureTableNames.Personnel;
            str.Name = "test";
            str.Nodes.Add(new ExcelStructreTableNode
            {
                ColumnName = "Id",
                NumberInExcel = 0
            });
            str.Nodes.Add(new ExcelStructreTableNode
            {
                ColumnName = "Name",
                NumberInExcel = 1
            });

            str.Nodes.Add(new ExcelStructreTableNode
            {
                ColumnName = "LastName",
                NumberInExcel = 2,
            });


            var lenght = str.Nodes.Count;
            controller.Save(str);
            str.Nodes.First().IsRemoved = true;
            str.Nodes.Add(new ExcelStructreTableNode
            {
                ColumnName = "LastName",
                NumberInExcel = 1,
            });
            controller.Save(str);
            
            using (var db = new EngineContext())
            {
                var rec=db.ExcelStructreTables.Find(str.Id);
                Assert.True(lenght == rec.Nodes.Count);
            }

        }
    }

 
}