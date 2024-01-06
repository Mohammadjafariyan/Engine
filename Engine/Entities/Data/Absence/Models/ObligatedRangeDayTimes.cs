using System;
using System.ComponentModel.DataAnnotations.Schema;
using Engine.Areas.Absence.Models;
using Newtonsoft.Json;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{
    [TsClass]
    public class ObligatedRangeDayTimes: Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        [JsonIgnore]
        public virtual ObligatedRangeWeeks ObligatedRangeWeek { get; set; }
        public virtual long ObligatedRangeWeekId { get; set; }
        
        [NotMapped]
        public bool IsRemoved { get; set; }
        
        public RangeType RangeType { get; set; }
        public bool IsTwoDay { get; set; }
        public  ApplicationUser ApplicationUser { get; set; }


        public ObligatedRangeDayTimes()
        {
        }
    }
}