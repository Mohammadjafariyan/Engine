using ServiceLayer.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel.ActionTypes;

namespace ServiceLayer.Systems.Library
{
   public class StudentService : IBaseService
    {
        public IDataTable GetDataTable(IActionParameter p = null)
        {
            throw new NotImplementedException();
        }

        public List<IDropDownOption> GetDropDown(IActionParameter p = null)
        {
            throw new NotImplementedException();
        }

        public ITreeNode GetTree(IActionParameter p = null)
        {
            throw new NotImplementedException();
        }
    }
}
