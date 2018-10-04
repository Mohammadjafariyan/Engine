using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ViewModel.ActionTypes;

namespace Engine.Attributes
{

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class DropDownAttribute:BaseAttribute, IEngineAttribute
    {
        public delegate List<IDropDownOption> GetDropDown(IActionParameter ap=null);
    }
}