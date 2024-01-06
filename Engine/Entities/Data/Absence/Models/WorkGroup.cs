using System.Collections.Generic;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{
    [TsClass]
    public class WorkGroup: Engine.Entities.Models.ICore.BaseEntity, AbsenceBase
    {
        public WorkGroup()
        {
            Personnels = new List<Personnel>();
            WorkGroupObligatedRanges = new List<WorkGroupObligatedRange>();
        }
        public override string Name { get; set; }
        public virtual ICollection<Personnel> Personnels { get; set; }
        public virtual ICollection<WorkGroupObligatedRange> WorkGroupObligatedRanges { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

    }
}