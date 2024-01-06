using System.Collections.Generic;
using Engine.Areas.Mobile.Models;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{
    [TsClass]
    public class Personnel: Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
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
        public ICollection<WorkplacePersonnel> WorkplacePersonnels { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

    }
}