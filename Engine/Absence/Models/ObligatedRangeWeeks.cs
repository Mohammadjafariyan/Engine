using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class ObligatedRangeWeeks: AbsenceBase
    {
        public ObligatedRangeWeeks()
        {
            ObligatedRangeDayTimes = new List<ObligatedRangeDayTimes>();
        }

        public DayOfWeek DayOfWeek { get; set; }
        public string DayOfWeekFaName { get; set; }
        public bool IsSelected { get; set; }
        
        
        public int WeekNumber { get; set; }

        [JsonIgnore]
        public virtual ObligatedRange ObligatedRange { get; set; }
        
        public long ObligatedRangeId { get; set; }
        public virtual ICollection<ObligatedRangeDayTimes>  ObligatedRangeDayTimes{ get; set; }
        
    }
}