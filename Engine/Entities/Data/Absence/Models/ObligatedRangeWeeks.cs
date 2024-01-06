using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{
    [TsClass]
    public class ObligatedRangeWeeks:Engine.Entities.Models.ICore.BaseEntity, AbsenceBase
    {
        public ObligatedRangeWeeks()
        {
            ObligatedRangeDayTimes = new List<ObligatedRangeDayTimes>();
        }
        public DayOfWeek DayOfWeek { get; set; }
        public string DayOfWeekFaName { get; set; }
        public bool IsSelected { get; set; }
        public bool IsOffDay { get; set; }
        public bool IsRemoved { get; set; }
        public int WeekNumber { get; set; }
        public  ApplicationUser ApplicationUser { get; set; }

        [JsonIgnore]
        public virtual ObligatedRange ObligatedRange { get; set; }
        
        public long ObligatedRangeId { get; set; }
        public virtual ICollection<ObligatedRangeDayTimes>  ObligatedRangeDayTimes{ get; set; }
        
    }
}