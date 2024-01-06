using System.Collections.Generic;
using Engine.Areas.Mobile.ViewModel;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;

namespace Engine.Areas.Mobile.Models
{
    public class Workplace : Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public Workplace()
        {
            WorkplacePersonnels = new List<WorkplacePersonnel>();
            UserClockTypes = new List<UserClockTypeViewModel>();
            Locations=new List<MyLocation>();
            WorkplaceSettings=new List<WorkplaceSetting>();
        }
        public  ApplicationUser ApplicationUser { get; set; }

        public string Gps { get; set; }

        public virtual ICollection<WorkplacePersonnel> WorkplacePersonnels { get; set; }
        public bool oneDeviceEnabled { get; set; }
        public bool IsNotificationsEnabled { get; set; }

        public virtual List<UserClockTypeViewModel> UserClockTypes { get; set; }
        public virtual ICollection<WorkplaceSetting> WorkplaceSettings { get; set; }
        public virtual List<MyLocation> Locations { get; set; }
        public bool IsFaceRecognationEnabled { get;  set; }
    }

    public class WorkplaceSetting : Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public WorkplaceSetting()
        {
        }

        public long? WorkplaceId { get; set; }
        public long? WorkplacePersonnelId { get; set; }

        public Workplace Workplace { get; set; }
        public WorkplacePersonnel WorkplacePersonnel { get; set; }

        public List<ScanResult> scanResults { get; set; }
        public List<MyLocation> location { get; set; }
        public string qRCodeContent { get; set; }
        public byte[] bitmapdata { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
        //public bool? IsOneDeviceEnabled { get; set; }
        //public bool? IsFaceRecognationEnabled { get; set; }
        //public bool? IsNotificationsEnabled { get; set; }
    }
}