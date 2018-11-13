using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Engine.Entities.Models.UiGeneratorModels;
using ServiceLayer.Systems;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class UiInputController : AppController<UiInput,
        CommonParameter>
    {
        public UiInputController()
        {
            this._engineService = new UiInputService();
        }
    }
}