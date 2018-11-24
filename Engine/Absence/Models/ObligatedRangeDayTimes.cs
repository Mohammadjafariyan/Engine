using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class ObligatedRangeDayTimes: AbsenceBase
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        [JsonIgnore]
        public virtual ObligatedRangeWeeks ObligatedRangeWeek { get; set; }
        public virtual long ObligatedRangeWeekId { get; set; }
        
        [NotMapped]
        public bool IsRemoved { get; set; }
    }
}