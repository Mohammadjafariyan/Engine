using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Engine;
using Engine.Controllers;
using Engine.Controllers.AbstractControllers;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Tests.Controllers
{
    [TestClass]
    public class BaseControllerTest
    {
        //[TestMethod]
        //public async System.Threading.Tasks.Task IndexAsync()
        //{
        //    // Arrange
        //    BaseEngineController<IModel, IActionParameter> controller;

        //    // Act
        //   // ViewResult result = controller.Index() as ViewResult;

        //    // Assert
        //  //  Assert.IsNotNull(result);

        //    IActionParameter p=null;
        //    ViewResult options = await controller.GetDropDown(p);
        //    ViewResult dataTableData = await controller.GetDataTableDataAsync(p);
        //    ViewResult treeData = await controller.GetTreeDataAsync(p);
        //    ViewResult multiSelectData = await controller.GetMultiSelectDataAsync(p);

        //}

        //[TestMethod]
        //public void CRUD()
        //{
        //    // Arrange
        //    Engine.Controllers.AbstractControllers.BaseEngineController controller = new BaseEngineController();

        //    // Act
        //    ViewResult result = controller.About() as ViewResult;

        //    // Assert
        //    Assert.AreEqual("Your application description page.", result.ViewBag.Message);
        //}

        //[TestMethod]
        //public void Contact()
        //{
        //    // Arrange
        //    BaseEngineController controller = new BaseEngineController();

        //    // Act
        //    ViewResult result = controller.Contact() as ViewResult;

        //    // Assert
        //    Assert.IsNotNull(result);
        //}
    }
}
