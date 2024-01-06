using System.Collections.Generic;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{
    [TsClass]
    public class PersonnelMachine:Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public  virtual Machine Machine{ get; set; }
        public virtual Personnel   Personnel{ get; set; }


        public PersonnelMachine()
        {
            BiometricDatas = new List<BiometricData>();
        }
        
        
        public  long MachineId{ get; set; }
        public long   PersonnelId{ get; set; }
        public long   UserIdInMachine{ get; set; }

        public virtual ICollection<BiometricData> BiometricDatas { get; set; }
        
        public  ApplicationUser ApplicationUser { get; set; }

        
    }
}