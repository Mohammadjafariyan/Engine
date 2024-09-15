using System.Collections.Generic;
using Engine.Areas.Mobile.Models;

namespace Engine.Areas.Mobile.ViewModel
{
    public class LoginViewModelResult : BaseViewModel
    {
        public bool loggedIn { get; set; }
        
        public bool isAdmin { get; set; }
        public List<WorkplaceGps> geoJsonList { get; set; }
    }
}