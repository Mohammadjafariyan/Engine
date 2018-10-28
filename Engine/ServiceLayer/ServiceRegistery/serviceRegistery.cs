using Engine.Service.AbstractControllers;
using ServiceLayer.Base;
using ServiceLayer.Systems;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Utitliy
{

    public class ServiceRegistry : Registry
    {
        public ServiceRegistry()
        {

            For<IBaseEngineService>().Add<FormService>().Named(GlobalNames.FormService);
            For<IBaseEngineService>().Add<ActionService>().Named(GlobalNames.ActionService);
            For<IBaseEngineService>().Add<PanelService>().Named(GlobalNames.PanelService);
            For<IBaseEngineService>().Add<ModelService>().Named(GlobalNames.ModelService);
            For<IBaseEngineService>().Add<NavigationPropertyService>().Named(GlobalNames.NavigationPropertiesService);
            
        }
    }
}