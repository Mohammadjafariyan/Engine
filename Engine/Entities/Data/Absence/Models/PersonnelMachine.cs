using System.Collections;
using System.Collections.Generic;
using Engine.Absence.Device;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class PersonnelMachine:AbsenceBase
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
        
    }
}