using System.Collections.Generic;
using Engine.Absence.Models;
using Engine.Areas.Mobile.ViewModel;
using Entities.Data;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Areas.Mobile.Models
{
    public class WorkplacePersonnel : BaseEntity
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
    }
}