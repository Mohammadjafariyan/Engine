using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Engine.Absence.Models;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class BiometricData
    {
        public BiometricData()
        {
            BiometricDataTimes = new List<BiometricDataTime>();
        }
        [Key]
        public long Id { get; set; }
        public long UserId { get; set; }
        public long MachineId { get; set; }
        public DateTime Date { get; set; }
        
        public  PersonnelMachine PersonnelMachine { get; set; }
        public  long PersonnelMachineId { get; set; }
        
        public virtual  ICollection<BiometricDataTime> BiometricDataTimes { get; set; }
    }

    public class BiometricDataTime
    {
        
        [Key]
        public long Id { get; set; }
        public  long BiometricDataId { get; set; }
        public  virtual BiometricData BiometricData { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }
    }
    
    
    
    
    [TsClass]
    public class BiometricRawData
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