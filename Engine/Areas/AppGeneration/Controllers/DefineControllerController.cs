using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Engine.Controllers.AbstractControllers.AttributeBased;
using Engine.Entities.Models.Core.AppGeneration;
using ServiceLayer.Systems;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.Core;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class DefineControllerController : AppController<DefineController
        , CommonParameter>
    {
        public DefineControllerController()
        {
            this._engineService = new DefineControllerService();
        }

        public override Task<ActionResult> Save(DefineController model)
        {
            var idBeforeSave = model.Id;
            var res = base.Save(model);
         /*   if (idBeforeSave == 0 && model.IsSystemFramework)
            {
                using (var db = new EngineContext())
                {
                    var names = Enum.GetNames(typeof(MethodType));
                    foreach (var name in names)
                    {
                        var method = new DefineControllerMethod
                        {
                            Name = name,
                            MethodType =
                                (MethodType) Enum.Parse(typeof(MethodType), name),
                            DefineControllerId = model.Id,
                            Translate = name,
                        };
                        db.DefineControllerMethodes.Add(method);
                    }
                    db.SaveChanges();
                }
            }*/
            return res;

        }
    }
}