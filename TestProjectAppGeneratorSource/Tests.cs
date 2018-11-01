using System;
using System.Linq;
using System.Reflection.Emit;
using AppSourceGenerator;
using Engine.Entities.Models.Core.AppGeneration;
using WebAppIDEEngine.Models.Core;
using Xunit;

namespace TestProjectAppGeneratorSource
{
    public class Tests
    {
       
        [Fact]
        public void TestQuery()
        {
            
            FakeDataProvider fakeDataProvider=new FakeDataProvider();
            fakeDataProvider.MakeFakeObjects();
            
            IGenerator g = new MvcProjectGenerator();
            var path = "D:\\workplace\\git\\Engine\\Engine\\TestGeneratedSource";
            g.CreateIsNotExist(path);
            g.LoadProject(path);

            g.MakeSubsystems(fakeDataProvider.SubSystems);
            g.MakeControllers(fakeDataProvider.Controllers);
            g.MakeServices(fakeDataProvider.Services);
            g.MakeModels(fakeDataProvider.Models);
            g.MakeApiControllers(fakeDataProvider.Controllers);

            /*g.UpdateSubsystem(fakeDataProvider.SubSystems.First());
            g.UpdateController(fakeDataProvider.Controllers.First());
            g.UpdateService(fakeDataProvider.Services.First());
            g.UpdateModel(fakeDataProvider.Models.First());

            
            g.DeleteSubsystem(fakeDataProvider.SubSystems.First());
            g.DeleteController(fakeDataProvider.Controllers.First());
            g.DeleteService(fakeDataProvider.Services.First());
            g.DeleteModel(fakeDataProvider.Models.First());#1#*/

            
            Assert.True(true);
        }
        [Fact]
        public void Test1()
        {
            IGenerator g = new MvcProjectGenerator();
            
            
            
            
            Assert.True(true);
        }
    }
}