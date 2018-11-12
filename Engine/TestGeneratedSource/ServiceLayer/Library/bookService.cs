
using Models;

using System.Linq;
using Models;
using ServiceLayer.Systems;
namespace ServiceLayer.Library
{
/// <summary>
    /// bookService
    /// bookService
    /// </summary>
    public class bookService :CommonService<book>
    { public IQueryable<dynamic> getAll() {var dt=EngineContext.Database.SqlQuery<dynamic>(" 
  select * from dbo.book");var res=dt.AsQueryable();return res; 
 }}}