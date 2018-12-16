
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
    /// userService
    /// userService
    /// </summary>
    public class userService :CommonService<user>
    { public IQueryable<dynamic> getAll() {var dt=EngineContext.Database.SqlQuery<dynamic>( @"  
  select * from dbo.rent" );var res=dt.AsQueryable();Dictionary<string,string> headers=new Dictionary<string,string>{
               
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