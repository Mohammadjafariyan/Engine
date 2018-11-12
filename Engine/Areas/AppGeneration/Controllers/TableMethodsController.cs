using System.Web.Mvc;
using ServiceLayer.Systems;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class TableMethodsController : AppController<TableMethod,
        CommonParameter>
    {
        public TableMethodsController()
        {
            this._engineService = new TableMethodsService();
        }
    }
}