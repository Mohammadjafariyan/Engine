using System;
using System.Linq;
using System.Linq.Expressions;

namespace Engine.Controllers.AbstractControllers
{
    public class PagingViewModel
    {
        public int Take { get; set; }
        public int SelectedPage { get; set; }
    }
    
    
    public class DropDownViewModel
    {
        public string[] SelectedProperties { get; set; }
        
        public string[] WhereParamNames { get; set; }
        public string[] WhereParamValues { get; set; }
        
        
    }
}