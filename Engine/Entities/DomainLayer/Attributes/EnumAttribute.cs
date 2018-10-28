using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Engine.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class EnumAttribute: BaseAttribute, IEngineAttribute
    {
        
    }
}