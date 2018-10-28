using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Engine.Utitliy
{
    public class Injector
    {
        public T Inject<T>()
        {
            return DependencyResolution.IoC.Initialize().GetInstance<T>();
        }

        public dynamic Inject<T>(string Name)
        {
          return  DependencyResolution.IoC.Initialize().GetInstance<T>(Name);
        }
    }


    public class EngineRegistry : Registry
    {
        public EngineRegistry()
        {

        }
    }
}