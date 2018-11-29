using System;
using System.Collections;
using System.Collections.Generic;
using TypeLite;

namespace Engine.Absence.Models
{

    /// <summary>
    /// بازه موظف
    /// </summary>
    [TsClass]
    public class ObligatedRange : AbsenceBase
    {
        public ObligatedRange()
        {
            ObligatedRangeWeeks = new List<ObligatedRangeWeeks>();
            WorkGroupObligatedRanges = new List<WorkGroupObligatedRange>();
        }

    public override string Name { get; set; }
        public DayOfWeek OffDay { get; set; }

        public virtual ICollection<ObligatedRangeWeeks> ObligatedRangeWeeks { get; set; }
        public virtual ICollection<WorkGroupObligatedRange> WorkGroupObligatedRanges { get; set; }
    }

}