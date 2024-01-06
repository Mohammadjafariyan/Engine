using System.Data.Entity;
using System.Linq;
using Engine.Areas.Mobile.Controllers;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Areas.Mobile.ViewModel;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WebAppIDEEngine.Models;
using Xunit;

namespace Engine.Areas.Mobile.ControllerTests
{
    public class WorkplacesControllerTests
    {
        private string newJson =
            @"{""WorkplaceId"":""2"",""data"":[[[{""lat"":38.102549243537005,""lng"":46.314668655395515},{""lat"":38.102954487322954,""lng"":46.24617576599121},{""lat"":38.09120150502322,""lng"":46.261625289917}]],[[{""lat"":38.1151107557172,""lng"":46.28806114196777},{""lat"":38.1151107557172,""lng"":46.28806114196777},{""lat"":38.113625098097906,""lng"":46.26008033752442},{""lat"":38.10835752302544,""lng"":46.265230178833015},{""lat"":38.10835752302544,""lng"":46.265230178833015}]]],""Name"":""دفتر اصلی خسروشاه""}";

        [Fact]
        public void WorkplaceGpsTest()
        {
            //  var json =
            //       @"{""WorkplaceId"":""1"",""data"":{""type"":""FeatureCollection"",""features"":[{""id"":""d369994cc41ec9811acf06b255373ce4"",""type"":""Feature"",""properties"":{},""geometry"":{""coordinates"":[[[46.24791730659214,37.90607905798815],[46.24602903144725,37.902828328467606],[46.26250852363424,37.90066109567722],[46.29460920112382,37.904182816553075],[46.31383527534297,37.905537279706834],[46.24791730659214,37.90607905798815]]],""type"":""Polygon""}}]},""area"":1870839.333810614}";
            var wc = new WorkplacesController();


            var obj = JsonConvert.DeserializeObject<WorkplaceGps>(newJson);
            var obj2 = JsonConvert.DeserializeObject<WorkplaceGps>(newJson);

            wc.WorkplaceInMap(obj);
            Assert.NotNull(obj);


            using (var db = new EngineContext())
            {
                var workplace = db.Workplaces.Find(obj.WorkplaceId);
                var gps = JsonConvert.DeserializeObject<WorkplaceGps>(workplace.Gps);


                Assert.True(gps.Data.Length == obj.Data.Length);
                Assert.True(gps.Data[0][0].Length == obj.Data[0][0].Length);


                /*
                Assert.True(gps.data.features.Count == obj.data.features.Count);
                Assert.True(gps.data.features.First().geometry.coordinates.Count ==
                            obj.data.features.First().geometry.coordinates.Count);
            */
            }
        }

        [Fact]
        public void WorkplaceSaveDeleteTests()
        {
            var p = new Personnel();
            p.Name = "علی ";
            p.LastName = "قربانزاده";
            p.WorkGroup = new WorkGroup();


            var wp = new Workplace
            {
                Name = "دفتر کار",
                IsNotificationsEnabled = true,
                oneDeviceEnabled = true,
            };

            wp.UserClockTypes.Add(new UserClockTypeViewModel
            {
                order = 0,
                type = ClockType.Wifi,
            });
            wp.UserClockTypes.Add(new UserClockTypeViewModel
            {
                order = 1,
                type = ClockType.CameraSelfie,
            });
            wp.UserClockTypes.Add(new UserClockTypeViewModel
            {
                order = 2,
                type = ClockType.GPS,
            });
            wp.UserClockTypes.Add(new UserClockTypeViewModel
            {
                order = 3,
                type = ClockType.QRCode,
            });

            /*wp.WorkplacePersonnels.Add(new WorkplacePersonnel
            {
                Name = "",
                Personnel = p,
                Username = "admin",
                Password = "4eIVszyvsMJErvFLw/kxJg==",
                IsAdmin = true,
            });*/

            wp.Locations.Add(new MyLocation
            {
                accuracy = 3,
                latitude = 51,
                longitude = 165
            });

            wp.WorkplaceSettings.Add(new WorkplaceSetting
            {
            });

            //  wp.WorkplacePersonnels.Add(new );


            var service = new WorkplaceService();
            service.Save(wp);
            service.Delete(wp.Id);
        }
    }
}