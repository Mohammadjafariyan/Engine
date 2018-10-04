using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.ActionTypes
{
    public interface IDataTable
    {
        IQueryable<dynamic> Records { get; set; }
    }

    public interface IDataTable<T>
    {
        IQueryable<T> Records { get; set; }
    }

}
