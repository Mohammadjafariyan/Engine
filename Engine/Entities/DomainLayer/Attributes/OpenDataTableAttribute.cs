using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Engine.Attributes
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class OpenDataTableAttribute: BaseAttribute, IEngineAttribute
    {

        public string Area { get; set; }
        public string Action { get; set; }
        public string Parameters { get; set; }
    }
}