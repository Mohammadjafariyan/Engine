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
            return default(T);
        }
    }
}