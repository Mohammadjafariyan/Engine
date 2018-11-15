
using Models;

using System.Linq;
using Models;
using ServiceLayer.Systems;
namespace ServiceLayer.library
{
/// <summary>
    /// UserService
    /// UserService
    /// </summary>
    public class UserService :CommonService<User>
    { public IQueryable<dynamic> GetAll(long @Id) {var dt=EngineContext.Database.SqlQuery<dynamic>(" DECLARE @Id bigintFalse;

  DECLARE   @Id bigint;    
    
    select  User.
      Id  
      as  
       [کد کاربر]  from User as
     _User  where  @Id <= User.[Id]");var res=dt.AsQueryable();return res; 
 }}}