using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using Engine.Areas.Absence.UiConstructs;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Areas.Mobile.ViewModel;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Data;
using MvcContrib.TestHelper.Ui;
using Newtonsoft.Json;
using Rhino.Mocks.Constraints;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class WorkplacesController : EBaseAppController<Workplace, CommonParameter>
    {
        public WorkplacesController()
        {
            _engineService = new WorkplaceService();
            FormConstructProvider = new WorkplacesConstructs();
            TableConstructProvider = new WorkplacesConstructs();
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult WorkplaceInMapAndroid(long id, string token)
        {

            using (var db = new EngineContext())
            {

                string username = SecurityService.GetUsernameFromToken(token);


                //یافتن پرسنل
                var workplacePersonnel = db.WorkplacePersonnels.FirstOrDefault(p => p.Username == username);
                if (workplacePersonnel == null)
                    throw new Exception("کاربر یافت نشد");


                if (workplacePersonnel.WorkplaceId != id)
                    throw new Exception("شما به این شرکت دسترسی ندارید");


                var wp = db.Workplaces.Find(id);
                if (wp == null)
                    throw new Exception("یافن نشد");
                ViewData["id"] = wp.Id;
                ViewData["name"] = wp.Name;
                ViewData["gps"] = wp.Gps;
                ViewData["token"] = token;
            }

            return View("WorkplaceInMap", id);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult WorkplaceInMapAndroid(WorkplaceGps vm)
        {
            using (var db = new EngineContext())
            {


                // دسترسی موبایلی
                if (!Request.IsAuthenticated)
                {
                    string username = SecurityService.GetUsernameFromToken(vm.token);

                    //یافتن پرسنل
                    var workplacePersonnel = db.WorkplacePersonnels.FirstOrDefault(p => p.Username == username);
                    if (workplacePersonnel == null)
                        throw new Exception("کاربر یافت نشد");


                    if (workplacePersonnel.WorkplaceId != vm.WorkplaceId)
                        throw new Exception("شما به این شرکت دسترسی ندارید");

                }
            }

            return WorkplaceInMap(vm);
            }
        [HttpGet]
        public ActionResult WorkplaceInMap(long id)
        {
            using (var db = new EngineContext())
            {
                var wp = db.Workplaces.Find(id);
                if (wp == null)
                    throw new Exception("یافن نشد");
                ViewData["id"] = wp.Id;
                ViewData["name"] = wp.Name;
                ViewData["gps"] = wp.Gps;
            }

            return View(id);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult WorkplaceInMap(WorkplaceGps vm)
        {
            try
            {
                if (vm.WorkplaceId == 0)
                    throw new Exception("محل کار ارسال نشده است");

                using (var db = new EngineContext())
                {


                    // دسترسی موبایلی
                    if (!Request.IsAuthenticated)
                    {
                        string username = SecurityService.GetUsernameFromToken(vm.token);

                        //یافتن پرسنل
                        var workplacePersonnel = db.WorkplacePersonnels.FirstOrDefault(p => p.Username == username);
                        if (workplacePersonnel == null)
                            throw new Exception("کاربر یافت نشد");


                        if (workplacePersonnel.WorkplaceId != vm.WorkplaceId)
                            throw new Exception("شما به این شرکت دسترسی ندارید");

                    }


                    var workplace = db.Workplaces.Find(vm.WorkplaceId);
                    if (workplace == null)
                        throw new Exception("محل کار  موجود نیست");

                    WorkplaceGps gps = null;

                    workplace.Gps = JsonConvert.SerializeObject(vm);

                    workplace.Name = vm.Name;
                    db.Entry(workplace).State = EntityState.Modified;

                    ViewData["id"] = workplace.Id;
                    ViewData["name"] = workplace.Name;
                    ViewData["gps"] = workplace.Gps;

                    db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                GenErrorMessage(ViewData, e.Message);
            }

            return Json(vm.WorkplaceId,JsonRequestBehavior.AllowGet);
        }

        public override Task<ActionResult> Save(Workplace model)
        {
            string[] array = Request.Form.GetValues("UserClockTypesarr");

            int c = 0;
            model.UserClockTypes = new List<UserClockTypeViewModel>();

            if(array!=null)
            foreach (var ct in array)
            {
                model.UserClockTypes.Add(new UserClockTypeViewModel
                {
                    type = (ClockType) long.Parse(ct),
                    order = c++,
                });
            }


            if (model.UserClockTypes.Count == 0 && !model.oneDeviceEnabled)
            {
                GenErrorMessage(ViewData, "باید نوع ساعت زنی انتخاب شود");
            }

            //  var array2 = Request.Form["UserClockTypes"];

            return base.Save(model);
        }
    }
}