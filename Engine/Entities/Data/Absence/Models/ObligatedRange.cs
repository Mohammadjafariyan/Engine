using System;
using System.Collections.Generic;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{

    /// <summary>
    /// بازه موظف
    /// </summary>
    [TsClass]
    public class ObligatedRange : Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public ObligatedRange()
        {
            ObligatedRangeWeeks = new List<ObligatedRangeWeeks>();
            WorkGroupObligatedRanges = new List<WorkGroupObligatedRange>();
        }
        public  ApplicationUser ApplicationUser { get; set; }

    public override string Name { get; set; }
        public DayOfWeek OffDay { get; set; }

        public virtual List<ObligatedRangeWeeks> ObligatedRangeWeeks { get; set; }
        public virtual List<WorkGroupObligatedRange> WorkGroupObligatedRanges { get; set; }

    }

}