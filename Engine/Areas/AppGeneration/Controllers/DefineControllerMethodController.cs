using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Engine.Controllers.AbstractControllers.AttributeBased;
using Engine.Entities.Models.Core.AppGeneration;
using ServiceLayer.Systems;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Models.Core;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class DefineControllerMethodController :AppController<DefineControllerMethod
        , CommonParameter>
    {
        
    public DefineControllerMethodController()
    {
        this._engineService = new DefineControllerMethodService();
    }
      
    }
}