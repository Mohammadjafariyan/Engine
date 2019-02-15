using System.ComponentModel.DataAnnotations;
using Engine.Areas.Mobile.Service;

namespace Engine.Areas.Mobile.ViewModel
{
    public abstract class BaseViewModel
    {
        public BaseViewModel()
        {
            token = SessionManagerSingeton.TokenManager.Token;
        }

        [Key] public long Id { get; set; }
        public bool success { get; set; }
        public string message { get; set; }
        public string token { get; set; }
    }
}