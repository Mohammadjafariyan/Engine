using System;
using TypeLite;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Absence.Models
{
    [TsClass]
    public class WorkGroupObligatedRange: AbsenceBase
    {
        public   long ObligatedRangeId { get; set; }
        public   long   WorkGroupId{ get; set; }

        public virtual  ObligatedRange ObligatedRange { get; set; }
        public virtual  WorkGroup    WorkGroup{ get; set; }
        
        /// <summary>
        /// تاریخ شروع به کار
        /// </summary>
        public DateTime? DateTime { get; set; }
    }
}