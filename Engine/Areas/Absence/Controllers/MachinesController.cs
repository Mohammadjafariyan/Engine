using System.Web.Mvc;
using Engine.Absence.Models;
using Engine.Areas.Absence.UiConstructs;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ServiceLayer.Absence;
using ViewModel.Parameters;

namespace Engine.Areas.Absence.Controllers
{
    public class MachinesController  : EBaseAppController<Machine, CommonParameter>
    {
        public MachinesController()
        {
            _engineService=new MachinesService();
            FormConstructProvider = new MachinesConstructs();
            TableConstructProvider = new MachinesConstructs();
        }
    }
}