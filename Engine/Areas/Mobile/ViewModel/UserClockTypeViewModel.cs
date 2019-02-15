namespace Engine.Areas.Mobile.ViewModel
{
    public class UserClockTypeViewModel : BaseViewModel
    {
        public ClockType type { get; set; }
        public int order { get; set; }
    }

    public class ObjectPostViewModel : BaseViewModel
    {
        public object obj { get; set; }
    }


    public enum ClockType
    {
        GPS=0,
        CameraSelfie=1,
        QRCode=2,
        Wifi=3
    }
}