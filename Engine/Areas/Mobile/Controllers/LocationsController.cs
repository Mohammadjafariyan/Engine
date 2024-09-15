using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.ViewModel;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Entities.Data;
using Engine.ServiceLayer.Engine;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;

namespace Engine.Areas.Mobile.Controllers
{
    public class LocationsController : BaseMobileApiController
    {
        [ActionName("Get")]
        [HttpGet]
        [ResponseType(typeof(List<WorkplaceGps>))]
        public ApiResult<List<WorkplaceGps>> Get()
        {
            try
            {
                using (var db = new EngineContext())
                {
                    // get user
                    var user = db.Users.FirstOrDefault(s => s.UserName == User.Identity.Name);

                    if (user == null)
                    {
                        return new ApiResult<List<WorkplaceGps>>
                        {
                            Message = "اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید"
                        };
                    }
        
                    // get person object of user
                    var personnel = db.GetCurrentUserPersonnel(user.Id, true);

                    // get workplaaces
                    var workplaces = personnel.WorkplacePersonnels.Select(s => s.Workplace).ToList();

                    
                    // convert and get geo json of each 
                    List<WorkplaceGps> geoJsonList = new List<WorkplaceGps>();
                    foreach (var workplace in workplaces)
                    {
                        try
                        {
                            var workplaceGps = JsonConvert.DeserializeObject<WorkplaceGps>(workplace.Gps);
                            if (workplaceGps?.MapData != null)
                            {
                                workplaceGps.Data = null;
                                geoJsonList.Add(workplaceGps);
                            }
                        }
                        catch (Exception e)
                        {
                            // log 

                            try
                            {
                                workplace.ErrorInParsingGeoJsonData = e.Message;
                                db.Entry(workplace.ErrorInParsingGeoJsonData).State = EntityState.Modified;
                                db.SaveChanges();
                            }
                            catch (Exception exception)
                            {
                                // skip
                            }
                        }
                    }

                    return new ApiResult<List<WorkplaceGps>>
                    {
                        result = geoJsonList
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