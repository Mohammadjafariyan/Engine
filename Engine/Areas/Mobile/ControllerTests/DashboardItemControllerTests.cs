using Engine.Areas.Mobile.Controllers;
using Engine.Areas.Mobile.ViewModel;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Xunit;

namespace Engine.Areas.Mobile.ControllerTests
{

    [TestClass()]
    public class DashboardItemControllerTests
    {
        private string Json=@"{""obj"":0,""token"":""od8d6M9VWw7RQtrykDrcJAD1AsXBWyFcurh3vBWJ5XU\u003d"",""success"":false}";
        private string Json2= @"{""obj"":0,""token"":""MxP01lMYsv9L5v/2ebf2JStHQo5uYjiVUXEdU/96i0A\u003d"",""success"":false}";


        
        [Fact]
        [TestMethod()]
        public void GetAllTest()
        {
            var c=new DashboardItemController();

            var model = JsonConvert.DeserializeObject<ObjectPostViewModel>(Json);

            var d = c.GetAll(model);

            Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsNotNull(d);
            Xunit.Assert.NotNull(d);


             model = JsonConvert.DeserializeObject<ObjectPostViewModel>(Json2);

             d = c.GetAll(model);

            Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsNotNull(d);
            Xunit.Assert.NotNull(d);
        }
        
        
        
    }
}