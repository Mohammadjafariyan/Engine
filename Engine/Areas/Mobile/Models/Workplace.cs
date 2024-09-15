using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Engine.Areas.Mobile.ViewModel;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Newtonsoft.Json;

namespace Engine.Areas.Mobile.Models
{
    public class Workplace : Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public string _userClockTypes { get; set; }

        [NotMapped]
        public List<UserClockTypesarr> UserClockTypesarr { get; set; }
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

        public virtual List<UserClockTypeViewModel> UserClockTypes
        {
            get { return JsonConvert.DeserializeObject<List<UserClockTypeViewModel>>(_userClockTypes ?? ""); }
            set { _userClockTypes = JsonConvert.SerializeObject(value); }
        }

        public virtual ICollection<WorkplaceSetting> WorkplaceSettings { get; set; }
        public virtual List<MyLocation> Locations { get; set; }
        public bool IsFaceRecognationEnabled { get;  set; }
        [NotMapped]
        public int PersonnelCount { get; set; }

        public string ErrorInParsingGeoJsonData { get; set; }
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