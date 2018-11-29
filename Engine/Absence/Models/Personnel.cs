using System.Collections;
using System.Collections.Generic;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class Personnel: AbsenceBase
    {
        public Personnel()
        {
            PersonnelMachines = new List<PersonnelMachine>();
        }
        public override  string Name { get; set; }
        public string LastName { get; set; }
        public string Code { get; set; }
        
        /// <summary>
        /// در اصل یک مورد وجود دارد اما برای ساپورت چند ماشین است 
        /// </summary>
        public virtual ICollection<PersonnelMachine> PersonnelMachines { get; set; }
        public virtual WorkGroup WorkGroup { get; set; }
        public virtual long WorkGroupId { get; set; }
    }
}