using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using ViewModel.ActionTypes;

namespace Engine.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class MultiSelectAttribute: BaseAttribute, IEngineAttribute
    {
        public delegate List<IDropDownOption> GetMultiSelectList(IActionParameter ap = null);
    }
}