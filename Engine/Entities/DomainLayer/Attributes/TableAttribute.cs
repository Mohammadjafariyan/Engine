using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using ViewModel.ActionTypes;

namespace Engine.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class DataTableAttribute : BaseAttribute, IEngineAttribute
    {
        public delegate IDataTable GetDataTable(IActionParameter ap = null);
        public delegate IDataTable GetDataTable<T>(IActionParameter ap = null);
        public GetDataTable DataTable;
    }
}