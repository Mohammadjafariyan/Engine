using System.Threading.Tasks;
using System.Web.Mvc;
using Engine.Areas.Absence.Service;
using Engine.Areas.Absence.UiConstructs;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ViewModel.Parameters;

namespace Engine.Areas.Mobile.Controllers
{
    public class WorkplacePersonnelController : EBaseAppController<WorkplacePersonnel, CommonParameter>
    {
        public WorkplacePersonnelController()
        {
            _engineService = new WorkplacePersonnelService();
            TableConstructProvider = new WorkplacePersonnelConstructs();
            FormConstructProvider = new WorkplacePersonnelConstructs();
        }


        
    }
}