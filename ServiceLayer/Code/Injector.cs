using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Code
{
    public class Injector
    {
        public T Inject<T>()where T:IModel
        {
            return default(T);
        }
    }
}