using System;

namespace Engine.Areas.Mobile.ViewModel
{
    public class LoginViewModel : BaseViewModel
    {
        public string username { get; set; }
        public string password { get; set; }
        public string encoded { get; set; }
    }
}