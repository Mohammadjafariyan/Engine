
using Models;

using System.Linq;
using Models;
using ServiceLayer.Systems;
namespace ServiceLayer.library
{
/// <summary>
    /// RentService
    /// RentService
    /// </summary>
    public class RentService :CommonService<Rent>
    { public IQueryable<> GetAll(long @Id) {var dt=EngineContext.Database.SqlQuery<>(" DECLARE @Id bigintFalse;

  DECLARE   @Id bigint;    
    
    select  User.
      Id  
      as  
       [کد کاربر]  from User as
     _User  where  @Id <= User.[Id]");var res=dt.AsQueryable();return res; 
 }}}