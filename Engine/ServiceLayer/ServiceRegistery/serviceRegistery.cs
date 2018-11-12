﻿using Engine.Service.AbstractControllers;
using ServiceLayer.Base;
using ServiceLayer.Systems;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceLayer.Systems.Library;
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
            For<IBaseEngineService>().Add<SubSystemService>().Named(GlobalNames.SubSystemServiceName);
            //For<IBaseEngineService>().Add<SubSystemServiceService>().Named(GlobalNames.SubSystemServiceServiceName);
            For<IBaseEngineService>().Add<QueryService>().Named(GlobalNames.QueryServiceName);
            For<IBaseEngineService>().Add<DefineServiceService>().Named(GlobalNames.DefineServiceServiceName);
            For<IBaseEngineService>().Add<DefineControllerService>().Named(GlobalNames.DefineControllerServiceName);
            For<IBaseEngineService>().Add<ServiceMethodService>().Named(GlobalNames.DefineServiceMethodService);
            For<IBaseEngineService>().Add<TableMethodsService>().Named(GlobalNames.TableMethodServicesName);
            For<IBaseEngineService>().Add<TablesService>().Named(GlobalNames.TablesServiceName);
            For<IBaseEngineService>().Add<DefineControllerMethodService>().Named(GlobalNames.DefineControllerMethodServiceName);



            #region temporary
            For<IBaseEngineService>().Add<BookService>().Named("BookService");
            For<IBaseEngineService>().Add<RentService>().Named("RentService");
            For<IBaseEngineService>().Add<StudentService>().Named("StudentService");

            

                #endregion
            
        }
    }
}