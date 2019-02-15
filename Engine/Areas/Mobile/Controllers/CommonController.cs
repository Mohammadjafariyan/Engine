using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Areas.Mobile.ViewModel;
using Engine.Controllers.AbstractControllers;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class CommonController : BaseMobileApiController
    {
        [ActionName("GetUserClockTypeList")]
        [HttpPost]
        [ResponseType(typeof(List<UserClockTypeViewModel>))]
        public List<UserClockTypeViewModel> GetUserClockTypeList(ObjectPostViewModel vm)
        {
            try
            {
                if(vm==null)
                    throw new Exception("اطلاعات ارسالی نال است");

                using (var db = new EngineContext())
                {
                    var workplacePersonnel = GetWorkplacePersonnelFromToken(db, vm.token);
                    return workplacePersonnel.Workplace.UserClockTypes.ToList();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

     
    }
}