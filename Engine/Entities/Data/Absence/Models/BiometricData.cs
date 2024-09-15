using System;
using System.Collections.Generic;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.ViewModel;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{
    [TsClass]
    public class BiometricData : Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public BiometricData()
        {
            BiometricDataTimes = new List<BiometricDataTime>();
            Date = DateTime.Now;
        }
        public virtual ApplicationUser ApplicationUser { get; set; }

        public long? UserId { get; set; }
        public DateTime Date { get; set; }

        public PersonnelMachine PersonnelMachine { get; set; }
        public long? PersonnelMachineId { get; set; }
        public long? WorkplacePersonnelId { get; set; }
        public virtual WorkplacePersonnel WorkplacePersonnel { get; set; }

        public virtual ICollection<BiometricDataTime> BiometricDataTimes { get; set; }
    }

    public class BiometricDataTime : Engine.Entities.Models.ICore.BaseEntity, AbsenceBase
    {
        public BiometricDataTime()
        {
            InsertDateTime = DateTime.Now;
            ClockInViewModels = new List<ClockInViewModel>();
        }

        public long BiometricDataId { get; set; }
        public virtual BiometricData BiometricData { get; set; }
        public DateTime? TimeIn { get; set; }
        public DateTime? TimeOut { get; set; }
        public DateTime InsertDateTime { get; set; }


        /// <summary>
        /// clock logs 
        /// </summary>
        public virtual List<ClockInViewModel> ClockInViewModels { get; set; }

        public bool IsForgotten { get; set; }
    }


    [TsClass]
    public class BiometricRawData : Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public long UserId { get; set; }
        public long MachineId { get; set; }
        public DateTime? Time { get; set; }
        public DateTime? Date { get; set; }
        public BiometricDataType Type { get; set; }

        public PersonnelMachine PersonnelMachine { get; set; }
        public long PersonnelMachineId { get; set; }
        public bool IsManual { get; set; }
    }

    public enum BiometricDataType
    {
        In,
        Out
    }
}