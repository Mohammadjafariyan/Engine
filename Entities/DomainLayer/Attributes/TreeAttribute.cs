using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ViewModel.ActionTypes;

namespace Engine.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class TreeAttribute: BaseAttribute, IEngineAttribute
    {
        public delegate ITreeNode GetMultiSelectList(IActionParameter ap = null);
    }
}