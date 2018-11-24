using System.Collections.Generic;
using System.Diagnostics;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class Machine:AbsenceBase
    {

        public Machine()
        {
            PersonnelMachines = new List<PersonnelMachine>();
        }
        public string Name { get; set; }
        public long MachineId { get; set; }
        public string IP { get; set; }
        public string Port { get; set; }

        public virtual ICollection<PersonnelMachine> PersonnelMachines { get; set; }
    }
}