using Engine.Areas.ReportGenerator.Controllers;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Engine.Attributes;
using Engine.Controllers.AbstractControllers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Globalization;
using System.Linq.Expressions;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.ServiceLayer.Systems.Engine;
using Engine.Service.AbstractControllers;
using WebGrease.Css.Extensions;
using WebAppIDEEngine.Models;
using System.Web.Mvc;
using Engine.Areas.Absence.UiConstructs;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Engine.Entities.Models;
using Engine.Entities.Models.ICore;
using Engine.Localization;
using Engine.ServiceLayer.Engine;
using ServiceLayer.Absence;


namespace Engine.Areas.Absence.Controllers
{
    /// <summary>
    /// WorkGroupObligatedRangeController
    /// WorkGroupObligatedRangeController
    /// </summary>
    public class WorkGroupObligatedRangeController : EBaseAppController<WorkGroupObligatedRange, CommonParameter>
    {
        public WorkGroupObligatedRangeController()
        {
            _engineService = new WorkGroupObligatedRangService();
            FormConstructProvider = new WorkGroupObligatedRangeConstruct();
            TableConstructProvider = new WorkGroupObligatedRangeConstruct();
        }


        public ActionResult SaveOneObligatedRangeToManyWorkGroups(WorkGroupObligatedRangeOneToManyViewModel model)
        {
            PersianCalendar p = new PersianCalendar();
            DateTime dt = new DateTime();

            if (model.DateTimeIran != null)
            {
                string[] d = model.DateTimeIran.Split('/');
                dt = new DateTime(int.Parse(d[0]),
                    int.Parse(d[1]),
                    int.Parse(d[2]), p);
                dt = new DateTime(dt.Year, dt.Month, dt.Day, new GregorianCalendar());
            }


            SaveOneToMany<ObligatedRange, WorkGroup, WorkGroupObligatedRange>(new OneToManyViewModel
                {
                    Many = model.Many,
                    OneId = model.OneId,
                    ManyBool = model.ManyBool
                },
                "WorkGroupObligatedRanges"
                , db => db, (db, one, many, User) =>
                {
                    return new WorkGroupObligatedRange
                    {
                        Name = null,
                        ApplicationUserId = User.Id,
                        ObligatedRangeId = one.Id,
                        WorkGroupId = many.Id,
                        //  ObligatedRange = obligatedRange,
                        //WorkGroup = workGroup,
                        DateTime = dt,
                        DateTimeIran = model.DateTimeIran,
                        // ApplicationUser = applicationUser,
                    };
                });


            return Content(@"
<div class="" alert alert-success "">
با موفقیت ثبت شد
</div>
");
        }

        public ActionResult SaveOneWorkGroupToManyObligatedRanges(WorkGroupObligatedRangeOneToManyViewModel model)
        {
            PersianCalendar p = new PersianCalendar();
            DateTime dt = new DateTime();

            if (model.DateTimeIran != null)
            {
                string[] d = model.DateTimeIran.Split('/');
                dt = new DateTime(int.Parse(d[0]),
                    int.Parse(d[1]),
                    int.Parse(d[2]), p);
                dt = new DateTime(dt.Year, dt.Month, dt.Day, new GregorianCalendar());
            }


            SaveOneToMany<WorkGroup , ObligatedRange, WorkGroupObligatedRange>(new OneToManyViewModel
                {
                    Many = model.Many,
                    OneId = model.OneId,
                    ManyBool = model.ManyBool
                },
                "WorkGroupObligatedRanges"
                , db => db, (db, one, many, User) =>
                {
                    return new WorkGroupObligatedRange
                    {
                        Name = null,
                        ApplicationUserId = User.Id,
                        ObligatedRangeId = many.Id,
                        WorkGroupId = one.Id,
                        //  ObligatedRange = obligatedRange,
                        //WorkGroup = workGroup,
                        DateTime = dt,
                        DateTimeIran = model.DateTimeIran,
                        // ApplicationUser = applicationUser,
                    };
                });


            return Content(@"
<div class="" alert alert-success "">
با موفقیت ثبت شد
</div>
");
        }


        //public ActionResult OneToManyObligatedRangesModal( long? workGroupId = null, long? obligatedRangeId = null)
        public ActionResult OneWorkGroupToManyObligatedRangesModal(long? workGroupId = null)
        {
            if (workGroupId.HasValue == false)
            {
                return Content(
                    $@"<div class=""alert alert-danger"">{HttpContext.Request.GetText("هیچ پارامتری انتخاب نشده است")}</div>");
            }

            var viewModel = OneToManyModal<WorkGroup, ObligatedRange>(workGroupId.Value,
                db =>
                {
                    return db.Query<WorkGroupObligatedRange>()
                        .Where(s => s.WorkGroupId == workGroupId.Value)
                        .Select(s => s.ObligatedRangeId).ToArray();
                });

            return View(new WorkGroupObligatedRangeOneToManyViewModel
            {
                OneId = viewModel.OneId,
                Many = viewModel.Many,
                ManyBool = viewModel.ManyBool,
                DateTimeIran = null
            });
        }

        public ActionResult OneObligatedRangeToManyWorkGroupsModal(long? obligatedRangeId = null)
        {
            if (obligatedRangeId.HasValue == false)
            {
                return Content(
                    $@"<div class=""alert alert-danger"">{HttpContext.Request.GetText("هیچ پارامتری انتخاب نشده است")}</div>");
            }

            var viewModel = OneToManyModal<ObligatedRange, WorkGroup>(obligatedRangeId.Value,
                db =>
                {
                    return db.Query<WorkGroupObligatedRange>()
                        .Where(s => s.ObligatedRangeId == obligatedRangeId.Value)
                        .Select(s => s.WorkGroupId).ToArray();
                });


            return View(new WorkGroupObligatedRangeOneToManyViewModel
            {
                OneId = viewModel.OneId,
                Many = viewModel.Many,
                ManyBool = viewModel.ManyBool,
                DateTimeIran = null
            });
        }
    }
}