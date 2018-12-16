using System.Web.Mvc;
using Engine.Absence.Models;
using Engine.Areas.Absence.UiConstructs;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ServiceLayer.Absence;
using ViewModel.Parameters;

namespace Engine.Areas.Absence.Controllers
{
    public class PersonnelMachinesController  : EBaseAppController<PersonnelMachine, CommonParameter>
    {
        public PersonnelMachinesController()
        {
            _engineService=new PersonnelMachinesService();
            FormConstructProvider = new PersonnelMachinesConstructs();
            TableConstructProvider = new PersonnelMachinesConstructs();
        }
    }
}