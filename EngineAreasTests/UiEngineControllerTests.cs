using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using AppSourceGenerator;
using Engine.Areas.AppGeneration.Controllers;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Entities.Models.Core.AppGeneration;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.UiGeneratorModels;
using Xunit;

namespace EngineAreasTests
{
    public class UiEngineControllerTests
    {
        [Fact]
        public void Test1()
        {
            Assert.True(true);
        }
        
        [Fact]
        public  void SaveQueryTests()
        {
            // Arrange
            UiHomeController controller
                = new UiHomeController();
            
            FakeDataProvider fakeDataProvider=new FakeDataProvider();
            fakeDataProvider.MakeFakeObjects();
            var quyer=fakeDataProvider.Queries.First();


            using (var db=new EngineContext())
            {
                
                db.Queries.Add(quyer);
                
                var smethod=new ServiceMethod();
                smethod.Name = "GetDataTableAsync";
            
                var s=new DefineService();
                
                
                s.ServiceMethods.Add(smethod);
            
                var controllerMethod = new DefineControllerMethod();
                controllerMethod.ServiceMethod = smethod;
            
                var c = new DefineController();
                c.DefineControllerMethods.Add(controllerMethod);

                db.DefineControllers.Add(c);

                var tableMethods=new List<TableMethod>();
                tableMethods.Add(new TableMethod
                    {DefineControllerMethod = controllerMethod});

                db.Tables.Add(new EjTable {Name = "Table1", TableMethods = tableMethods});
                
                db.SaveChanges();
                    
                var result=   controller.ShowView("Table1");
                

                db.Entry(quyer).State = EntityState.Deleted;
                db.Entry(smethod).State = EntityState.Deleted;
                db.Entry(controllerMethod).State = EntityState.Deleted;
                db.Entry(c).State = EntityState.Deleted;
                db.Entry(tableMethods.First()).State = EntityState.Deleted;
                db.Entry(db.Tables.First()).State = EntityState.Deleted;
                db.SaveChanges();
            }
            
            
           
            // Act
            //var forEdit = await controller.ForEdit(null);
            //  System.Web.Mvc.ViewResult result = controller.Index() as System.Web.Mvc.ViewResult;

            // Assert


        }
    }
}