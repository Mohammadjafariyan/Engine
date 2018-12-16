using System.Web.Mvc;
using Engine.Controllers.AbstractControllers.AttributeBased;
using Engine.Entities.Models.Core.AppGeneration;
using ServiceLayer.Systems;
using ViewModel.Parameters;
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