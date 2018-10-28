using Engine.Attributes;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Attributes
{
    public abstract class BaseAttribute : Attribute, IEngineAttribute
    {
        public string MethodName { get; set; }
        public string Service { get; set; }

        public string Ajax { get; set; }
        public string Controller { get; set; }
        public string Name { get; set; }

        public object Value { get; set; }

    }
}
