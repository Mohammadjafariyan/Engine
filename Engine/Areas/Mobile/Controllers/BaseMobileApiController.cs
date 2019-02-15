using System;
using System.Linq;
using System.Web.Http;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{

    [TokenFilter]
    public class BaseMobileApiController:ApiController
    {
        protected WorkplacePersonnel GetWorkplacePersonnelFromToken(EngineContext db, string token)
        {
            string username = SecurityService.GetUsernameFromToken(token);


            //یافتن پرسنل
            var workplacePersonnel = db.WorkplacePersonnels.FirstOrDefault(p => p.Username == username);
            if (workplacePersonnel == null)
                throw new Exception("کاربر یافت نشد");

            return workplacePersonnel;
        }
    }
}