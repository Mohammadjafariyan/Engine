using Engine.Service.AbstractControllers;
using ServiceLayer.Base;
using ServiceLayer.Systems;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceLayer.Systems.Library;
using System.Linq;using Models;
using GlobalNames;

namespace Engine.Utitliy
{
    public class ServiceRegistry : Registry
    {
        public ServiceRegistry()
        {
            For<IBaseEngineService>().Add<bookService>().Named(ServiceGlobalNames.bookServiceName);
For<IBaseEngineService>().Add<RentService>().Named(ServiceGlobalNames.RentServiceName);
For<IBaseEngineService>().Add<userService>().Named(ServiceGlobalNames.userServiceName);

        }
    }
}