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
    /// WorkGroupController
    /// WorkGroupController
    /// </summary>
    public class WorkGroupController : EBaseAppController<WorkGroup, CommonParameter>
    {
        public WorkGroupController()
        {
            _engineService=new WorkGroupService();
            FormConstructProvider = new WorkGroupConstructs();
            TableConstructProvider = new WorkGroupConstructs();

        }

        
        public override Func<IQueryable<WorkGroup>, IQueryable<WorkGroup>> GetWhereExp()
        {
            return (query) =>
            {
                query=query.Include(s => s.WorkGroupObligatedRanges);
                query=query.Include(s => s.WorkGroupObligatedRanges.Select(d=>d.ObligatedRange));
                return query;
            };
        }

        public ActionResult GetObligatedRangesById(long id,string modalId)
        {
            ViewBag.modalId = modalId;
            using (var db=new EngineContext())
            {
                var model=  db.QueryNoTrack<WorkGroup>()
                    .Include(s => s.WorkGroupObligatedRanges)
                    .Include(s => s.WorkGroupObligatedRanges.Select(d => d.ObligatedRange))
                    .FirstOrDefault(f => f.Id == id);
                return View( model);
            }
        }
    }
}