using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Engine.Attributes
{
    public interface IEngineAttribute
    {
         string MethodName { get; set; }
         string Service { get; set; }

         string Ajax { get; set; }
         string Controller { get; set; }
        string Name { get; set; }
    }
}