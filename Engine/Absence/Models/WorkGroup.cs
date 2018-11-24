using System.Collections.Generic;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class WorkGroup: AbsenceBase
    {
        public WorkGroup()
        {
            Personnels = new List<Personnel>();
            WorkGroupObligatedRanges = new List<WorkGroupObligatedRange>();
        }
        public string Name { get; set; }
        public virtual ICollection<Personnel> Personnels { get; set; }
        public virtual ICollection<WorkGroupObligatedRange> WorkGroupObligatedRanges { get; set; }
    }
}