using ServiceLayer.Systems;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Engine.Controllers.AbstractControllers.AttributeBased;
using ViewModel.Parameters;
using WebAppIDEEngine.Models.Core;

namespace Engine.Areas.App.Controllers
{
    public class NavigationPropertiesController : AppController<NavigationProperty, ActionParameter>
    {

        public NavigationPropertiesController()
        {
            this._engineService = new NavigationPropertyService();
        }

    }
}