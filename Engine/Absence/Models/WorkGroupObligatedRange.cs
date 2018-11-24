using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class WorkGroupObligatedRange
    {

        public   long ObligatedRangeId { get; set; }
        public   long   WorkGroupId{ get; set; }

        public virtual  ObligatedRange ObligatedRange { get; set; }
        public virtual  WorkGroup    WorkGroup{ get; set; }
    }
}