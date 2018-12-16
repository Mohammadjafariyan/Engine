using ServiceLayer.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using ViewModel.ActionTypes;

namespace ServiceLayer.Systems.Library
{
    public class BookService : CommonService<Book>
    {
        /*public IDataTable GetAll(long @id)
        {
            var dt = _entities.SqlQuery(@" 
            select * from books");
            var res = dt.AsQueryable();
            var l = res.ToList();

            

            var count=  _entities.Count();

            return new DynaDataTable
            {
                Total = count,
                Filtered = count,
                Headers = GetPropertyNames<Book>()
                ,  RecordsList = l.Cast<dynamic>().ToList()
            };
        }*/
    }
}