using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.ActionTypes
{
    public interface IBaseDataTable
    {
        Dictionary<string,string> Headers { get; set; }
        int? Total { get; set; }
        int? LastIndex { get; set; }
        int? Page { get; set; }
    }
    public interface IDataTable : IBaseDataTable
    {
        IQueryable<dynamic> Records { get; set; }
        List<dynamic> RecordsList { get; set; }
    }
    public abstract class BaseDataTable : IDataTable
    {
        public List<dynamic> RecordsList { get; set; }
        public IQueryable<dynamic> Records { get; set; }
        public  Dictionary<string,string> Headers { get; set; }
        public int? Total { get; set; }
        public int? LastIndex { get; set; }
        public int? Page { get; set; }
    }
    public abstract class BaseDataTable<T>: IDataTable<T>
    {
        public IQueryable<T> Records { get; set; }
        public  Dictionary<string,string> Headers { get; set; }
        public int? Total { get; set; }
        public int? LastIndex { get; set; }
        public int? Page { get; set; }
    }

    public class CommonDataTable : BaseDataTable
    {

    }

    public class CommonDataTable<T> : BaseDataTable<T>
    {

    }


    public interface IDataTable<T> : IBaseDataTable
    {
        IQueryable<T> Records { get; set; }
    }

}
