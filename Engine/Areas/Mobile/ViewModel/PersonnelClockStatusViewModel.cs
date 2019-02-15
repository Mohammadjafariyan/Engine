namespace Engine.Areas.Mobile.ViewModel
{
    public class PersonnelClockStatusViewModel : BaseViewModel
    {
        public long id { get; set; }
        public long personnelId { get; set; }
        public string name { get; set; }
        public string lastClockIn { get; set; }
        public string lastClockOut { get; set; }
        public string status { get; set; }
        public int color { get; set; }
        public string imageUrl { get; set; }
    }
}