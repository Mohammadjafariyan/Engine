namespace Engine.Areas.Mobile.ViewModel
{
    public class LoginViewModelResult : BaseViewModel
    {
        public bool oneDeviceEnabled { get; set; }
        public bool loggedIn { get; set; }
        public bool notificationsEnabled { get; set; }
        public bool faceRecognation { get; set; }
        
        public bool isAdmin { get; set; }
        public long workplaceId { get;  set; }
    }
}