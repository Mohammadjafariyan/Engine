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
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Engine.Entities.Models;
using Engine.ServiceLayer.Engine;
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

                if (wp.Gps!=null)
                {
                    try
                    {
                        var workplaceGps = JsonConvert.DeserializeObject<WorkplaceGps>(wp.Gps);
                        ViewData["gps"] = workplaceGps;
                    }
                    catch (Exception e)
                    {
                        
                    }
                }
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
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                GenErrorMessage(ViewData, e.Message);
            }

            return Json(vm.WorkplaceId, JsonRequestBehavior.AllowGet);
        }


        public ActionResult SaveOneWorkplaceManyPersonnel(IRelatedModel<Personnel> model)
        {
            SaveOneToMany<Workplace, Personnel, WorkplacePersonnel>(new OneToManyViewModel
                {
                    Many = model.targetModels?.Select(s => s.Id).ToList() ?? new List<long>(),
                    OneId = model.oneId,
                    ManyBool = model.targetModels?.Select(s => true).ToList() ?? new List<bool>()
                },
                "WorkplacePersonnels"
                , db => db, (db, one, many, User) =>
                {
                    return new WorkplacePersonnel
                    {
                        Name = null,
                        ApplicationUserId = User.Id,
                        PersonnelId = many.Id,
                        WorkplaceId = one.Id,
                        //  ObligatedRange = obligatedRange,
                        //WorkGroup = workGroup,
                        // ApplicationUser = applicationUser,
                    };
                });

            return Json(new ApiResult<bool>
            {
                result = true,
                Status = CustomResultType.success,
            }, JsonRequestBehavior.AllowGet);
        }

        protected override IQueryable<Workplace> GetInclution(IQueryable<Workplace> entities)
        {
            return entities
                    .Include(s => s.WorkplacePersonnels)
                   // .Include(s => s.UserClockTypes)
                ;
        }

        protected override List<Workplace> GetSelectList(List<Workplace> entities)
        {
            return entities.Select(s =>
            {
                s.PersonnelCount = s.WorkplacePersonnels.Count;

                s.UserClockTypesarr = s.UserClockTypes?.Select(c =>
                    new UserClockTypesarr
                    {
                        label = c.label,
                        value = (int)c.type
                    }).ToList();
                return s;
            }).ToList();
        }

        public ActionResult GetOneWorkplaceManyPersonnel(long oneId)
        {
            using (var db = new EngineContext())
            {
                var workplace = db.QueryNoTrack<Workplace>()
                    .Include(s => s.WorkplacePersonnels)
                    .Include(s => s.WorkplacePersonnels.Select(w => w.Personnel))
                    .FirstOrDefault(f => f.Id == oneId);

                if (workplace == null)
                {
                    return HttpNotFound();
                }

                var personnels = workplace.WorkplacePersonnels.Select(w => w.Personnel).ToList();

                var ids = personnels.Select(p => p.Id);
                var list = db.QueryNoTrack<Personnel>()
                    .Where(s => !ids.Any(id => id == s.Id)).ToList();

                var jsonSettings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    Formatting = Formatting.Indented
                };

                var json = new JsonNetResult();
                json.Data = new ApiResult<IRelatedModel<Personnel>>
                {
                    result = new IRelatedModel<Personnel>
                    {
                        sourceModels = list,
                        targetModels = personnels,
                        oneId = workplace.Id,

                        oneTitle = workplace.Name
                    },
                    Status = CustomResultType.success,
                };

                json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                json.SerializerSettings = jsonSettings;

                return json;
            }
        }

        public override async Task<ActionResult> Save(Workplace model)
        {
           // string[] array = Request.Form.GetValues("UserClockTypesarr");



            int c = 0;
            model.UserClockTypes = new List<UserClockTypeViewModel>();

            if (model.UserClockTypesarr != null)
            {
                model.UserClockTypes = model.UserClockTypesarr.Select(ct=>new UserClockTypeViewModel
                {
                    type = (ClockType)ct.value,
                    order = c++,
                    label = ct.label
                }).ToList();
            }


            if (model.UserClockTypes.Count == 0 && !model.oneDeviceEnabled)
            {
                GenErrorMessage(ViewData, "باید نوع ساعت زنی انتخاب شود");
            }

            //  var array2 = Request.Form["UserClockTypes"];

             _engineService.Save(model);


            var byId = this._engineService.GetById(model.Id);

            return Json(new ApiResult<bool>
            {
                result = true,
                Status = CustomResultType.success,
            }, JsonRequestBehavior.AllowGet);
        }
    }
}