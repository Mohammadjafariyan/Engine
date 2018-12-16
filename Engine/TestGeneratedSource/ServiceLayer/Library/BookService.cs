
using Models;

using System.Linq;
using Models;
using ServiceLayer.Systems;
using System.Collections.Generic;
using ViewModel.ActionTypes;
using System.Data.SqlClient;
namespace ServiceLayer.Library
{
/// <summary>
    /// bookService
    /// bookService
    /// </summary>
    public class bookService :CommonService<book>
    { public IQueryable<dynamic> getAll() {var dt=EngineContext.Database.SqlQuery<dynamic>( @"  
  select * from dbo.book" );var res=dt.AsQueryable();Dictionary<string,string> headers=new Dictionary<string,string>{
               
                };  
            var count = res.Count();
            var l = res.ToList();

            return new DynaDataTable
            {
                Total = count,
                Filtered = count,
                Headers = headers,
                RecordsList = l.Cast<dynamic>().ToList()
            };

 }} 
 }