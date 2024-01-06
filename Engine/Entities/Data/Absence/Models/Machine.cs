using System.Collections.Generic;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{
    [TsClass]
    public sealed class Machine:Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {

        public Machine()
        {
            PersonnelMachines = new List<PersonnelMachine>();
        }
        public  override string Name { get; set; }
        public long MachineId { get; set; }
        public string IP { get; set; }
        public string Port { get; set; }
        public  ApplicationUser ApplicationUser { get; set; }


        public ICollection<PersonnelMachine> PersonnelMachines { get; set; }
    }
}