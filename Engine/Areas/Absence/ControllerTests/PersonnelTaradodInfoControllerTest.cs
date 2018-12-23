using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Engine.Absence.Device;
using Engine.Absence.Models;
using Engine.Areas.Absence.Controllers;
using Engine.Areas.Absence.Models;
using Engine.Areas.Absence.Service;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Entities.Models.UiGeneratorModels;
using MvcContrib.TestHelper;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models;
using Xunit;

namespace Engine.Areas.Absence.ControllerTests
{
    public class PersonnelTaradodInfoControllerTests
    {
        [Fact]
        public void GetAllPersonnelTotalSummaryTimesheetViewTest()
        {
            var pc = Engine.Controllers.AbstractControllers
                    .EngineUtility.InitializeMockControllerContext(new PersonnelTaradodInfoController())
                as PersonnelTaradodInfoController;

            pc.MockAreaName = "Absence";

            var res = pc.GetAllPersonnelTotalSummaryTimesheetView
                () as ViewResult;

            // assert
            res
                .AssertViewRendered();
         //   res.ExecuteResult(pc.ControllerContext);


            Assert.NotNull(res.ViewData[UiHomeController.Form]);
            Assert.NotNull(res.ViewData[UiHomeController.DataTable]);
            Assert.NotNull(res.ViewData[UiHomeController.TableObject]);
            
            UiForm form=res.ViewData[UiHomeController.Form] as UiForm;
            
           
            Assert.True(res.ViewData[UiFormEngineController.PostSubsystemUrl]=="Absence");
           // Assert.True(res.ViewData[UiFormEngineController.PostControllerUrl]=="PersonnelTaradodInfo");
            Assert.True(res.ViewData[UiFormEngineController.PostActionUrl]=="GetAllPersonnelTotalSummaryTimesheet");

            Assert.Contains(form.UiFormInputs, u =>u.UiInput.Name=="from");
            Assert.Contains(form.UiFormInputs, u =>u.UiInput.Name=="to");
        }

        [Fact]
        public void AllPersonnelSummaryLists()
        {
            var pc = Engine.Controllers.AbstractControllers
                    .EngineUtility.InitializeMockControllerContext(new PersonnelTaradodInfoController())
                as PersonnelTaradodInfoController;

            pc.MockAreaName = "Absence";

            var from = DateTime.Now.AddMonths(-1);
            var to = DateTime.Now.AddMonths(1);
            var res = pc.GetAllPersonnelTotalSummaryTimesheet
                (from, to) as JsonResult;

            //res.ExecuteResult(pc.ControllerContext);
          
            var dataTable = res.Data as DynaDataTable;


            /*
            if (dataTable.RecordsList.Count > 0)
                Assert.Contains(dataTable.RecordsList, m => m.Date.Date == DateTime.Now.Date);
            */
          //  var totaldays = (from - to).TotalDays;
            int personnelCount = 0;
            using (var db = new EngineContext())
            {
                personnelCount = db.Personnels.Where(p=>p.WorkGroup.WorkGroupObligatedRanges.Count>0).Count();
            }

            Assert.Equal(dataTable.RecordsList.Count, personnelCount);
            
            
        
        }
        
        
    
    }
}