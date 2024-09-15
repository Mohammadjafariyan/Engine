using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.ViewModel;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Entities.Data;
using Engine.ServiceLayer.Engine;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Engine.Areas.Mobile.Controllers
{
    public class ProfileController : BaseMobileApiController
    {
        [ActionName("Get")]
        [HttpGet]
        [ResponseType(typeof(List<UserClockTypeViewModel>))]
        public ApiResult<ApplicationUser> Get()
        {
            try
            {
                using (var db = new EngineContext())
                {
                    var user = db.Users.FirstOrDefault(s => s.UserName == User.Identity.Name);

                    if (user == null)
                    {
                        return new ApiResult<ApplicationUser>
                        {
                            Message = "اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید"
                        };
                    }

                    user.PasswordHash = null;
                    user.Id = null;
                    return new ApiResult<ApplicationUser>
                    {
                        Status = CustomResultType.success,
                        result = user
                    };
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}