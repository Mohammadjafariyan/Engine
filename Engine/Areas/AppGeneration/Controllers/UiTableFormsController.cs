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
    public class UiTableFormsController : AppController<UiTableForm,
        CommonParameter>
    {
        public UiTableFormsController()
        {
            this._engineService = new UiTableFormService();
        }
    }
}