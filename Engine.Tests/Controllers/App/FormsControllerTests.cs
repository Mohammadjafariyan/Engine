using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Engine.Tests.Controllers.App
{
    /// <summary>
    /// Summary description for FormsControllerTests
    /// </summary>
    [TestClass]
    public class FormsControllerTests
    {
        public FormsControllerTests()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }
        [TestMethod]
        public async System.Threading.Tasks.Task ForEdit()
        {
            // Arrange
            Areas.App.Controllers.FormsController controller = new Areas.App.Controllers.FormsController();

            // Act
            //var forEdit = await controller.ForEdit(null);
            //  System.Web.Mvc.ViewResult result = controller.Index() as System.Web.Mvc.ViewResult;

            // Assert
            //  Assert.IsNotNull(result);


        }
        [TestMethod]
        public async System.Threading.Tasks.Task GetDataTable()
        {
            // Arrange
            Areas.App.Controllers.FormsController controller = new Areas.App.Controllers.FormsController();


                    // Act
                //    var DataTable = await controller.GetDataTable(null) as System.Web.Mvc.ViewResult;
            //  System.Web.Mvc.ViewResult result = controller.Index() as System.Web.Mvc.ViewResult;

            // Assert
            //  Assert.IsNotNull(result);
          //  var m=DataTable.Model;

        }

        #region Additional test attributes
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        [TestMethod]
        public void TestMethod1()
        {
            //
            // TODO: Add test logic here
            //
        }
    }
}
