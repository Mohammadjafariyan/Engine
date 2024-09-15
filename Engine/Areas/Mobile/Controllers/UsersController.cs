using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Entities.Data;

namespace Engine.Areas.Mobile.Controllers
{
    public class UsersController : ApiController
    {
        [ActionName("Get")]
        [HttpGet]
        [ResponseType(typeof(ApiResult<dynamic>))]
        public async Task<IHttpActionResult> Get()
        {
            using (var db = new EngineContext())
            {
                // get user
                var user = await db.Users
                    .Where(s => s.UserName == User.Identity.Name)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    throw new Exception("اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید");
                }

                if (user.IsAdmin == false)
                {
                    throw new Exception("عدم دسترسی");
                }


                var users = db.Users.Where(s => s.Id == user.Id)
                    .Include(s => s.Children)
                    .ToList();

                var children = users.SelectMany(s => s.Children);

                users.AddRange(children);
                
                var res = users.Select(s => new
                {
                    FirstLastName = s.FirstName + " " + s.LastName,
                    UserId = s.Id,
                    ParentId = s.ParentId
                }).ToList();

                return Ok(new ApiResult<dynamic>
                {
                    Status = CustomResultType.success,
                    result = res
                });
            }
        }
    }
}