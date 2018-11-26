using System;
using System.ComponentModel.DataAnnotations;
using Engine.Absence.Models;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class BiometricData
    {
        [Key]
        public long Id { get; set; }
        public long UserId { get; set; }
        public long MachineId { get; set; }
        public DateTime Time { get; set; }
        public DateTime Date { get; set; }
        public BiometricDataType Type { get; set; }
        
        public  PersonnelMachine PersonnelMachine { get; set; }
        public  long PersonnelMachineId { get; set; }
    }

    public enum BiometricDataType
    {
        In,Out
    }
}