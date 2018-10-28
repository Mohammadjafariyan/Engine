using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ViewModel.ActionTypes;

namespace Engine.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class TextAttribute : BaseAttribute, IEngineAttribute
    {
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class CheckboxAttribute : BaseAttribute, IEngineAttribute
    {
    }


}