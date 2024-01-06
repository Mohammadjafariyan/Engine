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
using System.Globalization;
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
using Engine.ServiceLayer.Engine;
using ServiceLayer.Absence;


namespace Engine.Areas.Absence.Controllers
{
    /// <summary>
    /// ObligatedRangesController
    /// ObligatedRangesController
    /// </summary>
    public class ObligatedRangesController : EBaseAppController<ObligatedRange, CommonParameter>
    {
        public ObligatedRangesController()
        {
            _engineService = new ObligatedRangesService();
            FormConstructProvider = new ObligatedRangesConstructs();
            TableConstructProvider = new ObligatedRangesConstructs();
        }
        
        public override Func<IQueryable<ObligatedRange>, IQueryable<ObligatedRange>> GetWhereExp()
        {
            return (query) =>
            {
                query=query.Include(s => s.WorkGroupObligatedRanges);
                query=query.Include(s => s.WorkGroupObligatedRanges.Select(d=>d.WorkGroup));
                return query;
            };
        }


        public override async Task<ActionResult> GetDataTable(ObligatedRange p, bool? isajax)
        {
            using (var db=new EngineContext())
            {
                var query = db.ObligatedRanges.AsQueryable();
                query=query.Include(s => s.WorkGroupObligatedRanges);
                query=query.Include(s => s.WorkGroupObligatedRanges.Select(d=>d.WorkGroup));

                return View(await query.ToListAsync());
            }
        }

        /*public override async Task<ActionResult> GetDataTable(ObligatedRange p,bool? isajax)
        {
            var dyna = _engineService.GetDataTable(p);

            if (isajax==true)
            {
                return Json(dyna, JsonRequestBehavior.AllowGet);
            }

            SetDynamicTableViewDataHelper(dyna);

            return View();
        }*/
        public ActionResult GetWorkGroupsById(long id,string modalId)
        {
            ViewBag.modalId = modalId;
            using (var db=new EngineContext())
            {
              var model=  db.QueryNoTrack<ObligatedRange>()
                    .Include(s => s.WorkGroupObligatedRanges)
                    .Include(s => s.WorkGroupObligatedRanges.Select(d => d.WorkGroup))
                    .FirstOrDefault(f => f.Id == id);
              return View( model);
            }
        }
    }
}