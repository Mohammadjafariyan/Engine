using System.Collections.Generic;
using Engine.Entities.Data.Absence.Models;
using TypeLite;

namespace Engine.Entities.Data
{
    [TsClass]
    public sealed class Machine:AbsenceBase
    {

        public Machine()
        {
            PersonnelMachines = new List<PersonnelMachine>();
        }
        public  override string Name { get; set; }
        public long MachineId { get; set; }
        public string IP { get; set; }
        public string Port { get; set; }

        public ICollection<PersonnelMachine> PersonnelMachines { get; set; }
    }
}