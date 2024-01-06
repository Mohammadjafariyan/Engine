using System.Collections.Generic;
using Engine.Areas.Mobile.ViewModel;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Entities.Data;

namespace Engine.Areas.Mobile.Models
{
    public class WorkplacePersonnel : Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public WorkplacePersonnel()
        {
            BiometricDatas = new List<BiometricData>();
        }

        public virtual Workplace Workplace { get; set; }
        public long WorkplaceId { get; set; }


        public virtual Personnel Personnel { get; set; }
        public long? PersonnelId { get; set; }

        public string ApplicationUserUserName { get; set; }
        public bool IsAdmin { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }


        public long? BiometricDataId { get; set; }
        public virtual List<BiometricData> BiometricDatas { get; set; }
        public virtual ICollection<WorkplaceSetting> WorkplaceSettings { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}