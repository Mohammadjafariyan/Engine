using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.ICore;

namespace ViewModel.ActionTypes
{
    
    public abstract class BaseDataTable<T> : IDataTable
    {
        public Dictionary<string, string> Headers { get; set; }
        public int? Total { get; set; }
        public int? Filtered { get; set; }

        public IQueryable<T> Records { get; set; }
        public List<T> RecordsList { get; set; }
    }
    public interface IDataTable
    {
        Dictionary<string, string> Headers { get; set; }
        int? Total { get; set; }
        int? Filtered { get; set; }
    }

    public class DynaDataTable : BaseDataTable<dynamic>
    {
    }
    
    
    public class IModelDataTable : BaseDataTable<IModel>
    {
    }

    public class ObjectDataTable<T> : BaseDataTable<T>
    {
    }

}