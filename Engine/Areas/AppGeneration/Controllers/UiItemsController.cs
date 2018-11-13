using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Engine.Entities.Models.UiGeneratorModels;
using ServiceLayer.Systems;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class UiItemsController : AppController<UiItem,
        CommonParameter>
    {
        public UiItemsController()
        {
            this._engineService = new UiItemsService();
        }
    }

}