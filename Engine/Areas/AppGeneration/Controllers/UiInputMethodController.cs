using System.Web.Mvc;
using Engine.Controllers.AbstractControllers.AttributeBased;
using Engine.Entities.Models.UiGeneratorModels;
using ServiceLayer.Systems;
using ViewModel.Parameters;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class UiInputMethodController : AppController<UiInputMethod,
        CommonParameter>
    {
        public UiInputMethodController()
        {
            this._engineService = new UiInputMethodService();
        }
    }
}