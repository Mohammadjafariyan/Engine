using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.ViewModel;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Controllers
{
    public class OfficeLocationsController : BaseMobileApiController
    {
        [HttpPost]
        [ResponseType(typeof(List<OfficeLocationViewModel>))]
        public List<OfficeLocationViewModel> GetAll(ObjectPostViewModel vm)
        {
            try
            {
                if (vm == null || vm.obj == null)
                    throw new Exception("اطلاعات ارسالی نال است");

                using (var db = new EngineContext())
                {
                    var workplacePersonnel = GetWorkplacePersonnelFromToken(db, vm.token);

                    List<MyLocation> locations = workplacePersonnel.Workplace.Locations;

                    List<OfficeLocationViewModel> list = new List<OfficeLocationViewModel>();
                    foreach (var myLocation in locations)
                    {
                        list.Add(new OfficeLocationViewModel
                        {
                            lat = myLocation.latitude,
                            lng = myLocation.longitude
                        });
                    }

                    return list;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}