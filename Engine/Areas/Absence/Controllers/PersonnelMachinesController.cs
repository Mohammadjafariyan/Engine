using System.Web.Mvc;
using Engine.Areas.Absence.UiConstructs;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Data.Absence.Models;
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