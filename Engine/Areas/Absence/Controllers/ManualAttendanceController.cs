using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Engine.Absence.Models;
using Engine.Areas.Absence.Service;
using Engine.Areas.Absence.UiConstructs;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Service.AbstractControllers;
using ServiceLayer.Absence;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Absence.Controllers
{
    public class ManualAttendanceController : EBaseAppController<BiometricRawData, CommonParameter>
    {
        public ManualAttendanceController()
        {
            _engineService = new BiometricRawDataService();
            FormConstructProvider = new ManualAttendanceConstructs();
            TableConstructProvider = new ManualAttendanceConstructs();
        }

        public override async Task<ActionResult> GetDataTable(BiometricRawData p
            ,bool? isajax)
        {
            var dyna = _engineService.GetDataTable(p);

            if (isajax==true)
            {
                return Json(dyna, JsonRequestBehavior.AllowGet);
            }

            SetDynamicTableViewDataHelper(dyna);

            return View();
        }

        public override Task<ActionResult> Save(BiometricRawData model)
        {
            try
            {
                _engineService.Save(model);

                ViewData[GlobalNames.MVCResponseMessage] = new CustomResult
                {
                    Message = "با موفقیت ثبت شد",
                    Status = CustomResultType.success
                };
            }
            catch (JServiceException e)
            {
                ViewData[GlobalNames.MVCResponseMessage] = new CustomResult
                {
                    Message = e.Message,
                    Status = CustomResultType.fail
                };
            }
            catch (Exception e)
            {
                IEnumerable<ModelError> allErrors = new List<ModelError>
                {
                    new ModelError(e.Message)
                };

                ViewData[GlobalNames.AllErrors] = allErrors;
            }

            return base.Save(model);
        }
    }
}