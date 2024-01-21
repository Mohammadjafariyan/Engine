using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Entities.Data;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{

   // [TokenFilter]
   [Authorize]
    public class BaseMobileApiController:ApiController
    {
        public static WorkplacePersonnel GetWorkplacePersonnelFromToken(EngineContext db, string token)
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