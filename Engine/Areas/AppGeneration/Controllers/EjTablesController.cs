using System.Web.Mvc;
using Engine.Entities.Models.Core.AppGeneration;
using ServiceLayer.Systems;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class EjTablesController :AppController<EjTable,
        CommonParameter>
    {
        
        public EjTablesController()
        {
            this._engineService = new TablesService();
        }
       
    }
}