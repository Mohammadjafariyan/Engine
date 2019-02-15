using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Engine.Absence.Models;
using Engine.Areas.Mobile.Controllers;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.ViewModel;
using Newtonsoft.Json;
using WebAppIDEEngine.Models;
using Xunit;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Engine.Areas.Mobile.ControllerTests
{
    [TestClass()]
    public class ClockControllerTests
    {
        public static void InitWorkplaceAndPersonnel()
        {
            using (var db = new EngineContext())
            {
                foreach (var workplacePersonnel in
                    db.WorkplacePersonnels.Where(p2 => p2.Username == "admin"))
                {
                    db.Entry(workplacePersonnel).State = EntityState.Deleted;
                }


                var p = new Personnel();
                p.Name = "علی ";
                p.LastName = "قربانزاده";
                p.WorkGroup = new WorkGroup();
                db.Personnels.Add(p);
                db.SaveChanges();


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

                wp.WorkplacePersonnels.Add(new WorkplacePersonnel
                {
                    Name = "",
                    PersonnelId = p.Id,
                    Username = "admin",
                    Password = "4eIVszyvsMJErvFLw/kxJg==",
                    IsAdmin = true,
                });

                db.Workplaces.Add(wp);
                db.SaveChanges();
            }
        }

        [Fact]
    [TestMethod()]
        public async void ClockInTest()
        {
            var c = new ClockController();

           // InitWorkplaceAndPersonnel();


            var token = "XIBQX1/v9G0tn6bh4zK14KJn1rsVXbaxeLgKMoKfssw=";
            var json = @"
{""bitmapdata"":[-1,-40,-1,-32,0,16,74,70,73,70,0,1,1,0,0,1,0,1,0,0,-1,-37,0,67,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-37,0,67,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-64,0,17,8,0,-103,0,-52,3,1,34,0,2,17,1,3,17,1,-1,-60,0,31,0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,-1,-60,0,-75,16,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125,1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,-127,-111,-95,8,35,66,-79,-63,21,82,-47,-16,36,51,98,114,-126,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,-125,-124,-123,-122,-121,-120,-119,-118,-110,-109,-108,-107,-106,-105,-104,-103,-102,-94,-93,-92,-91,-90,-89,-88,-87,-86,-78,-77,-76,-75,-74,-73,-72,-71,-70,-62,-61,-60,-59,-58,-57,-56,-55,-54,-46,-45,-44,-43,-42,-41,-40,-39,-38,-31,-30,-29,-28,-27,-26,-25,-24,-23,-22,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-1,-60,0,31,1,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,-1,-60,0,-75,17,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119,0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,-127,8,20,66,-111,-95,-79,-63,9,35,51,82,-16,21,98,114,-47,10,22,36,52,-31,37,-15,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,-126,-125,-124,-123,-122,-121,-120,-119,-118,-110,-109,-108,-107,-106,-105,-104,-103,-102,-94,-93,-92,-91,-90,-89,-88,-87,-86,-78,-77,-76,-75,-74,-73,-72,-71,-70,-62,-61,-60,-59,-58,-57,-56,-55,-54,-46,-45,-44,-43,-42,-41,-40,-39,-38,-30,-29,-28,-27,-26,-25,-24,-23,-22,-14,-13,-12,-11,-10,-9,-8,-7,-6,-1,-38,0,12,3,1,0,2,17,3,17,0,63,0,-114,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,2,-118,40,-96,15,-1,-39],""datetime"":""Jan 24, 2019 4:07:52 PM"",""location"":[{""time"":1548333267266,""latitude"":37.9491594,""longitude"":46.0582785,""speed"":0.0,""accuracy"":29.0}],""qRCodeContent"":""051000012517"",""scanResults"":[{""BSSID"":""64:d9:54:a8:21:8c"",""SSID"":""Zoltrix_ZW919"",""capabilities"":""[WPA-PSK-CCMP][WPS][ESS]"",""wifiSsid"":{""octets"":{""buf"":[90,111,108,116,114,105,120,95,90,87,57,49,57,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],""count"":13}},""level"":-72,""timestamp"":78161891040,""frequency"":2462}],""token"":""rLQq0z3MeiQBIhC/mUhB3oVnqRUgHHXiRp2EBR/FXpI\u003d"",""success"":false}
";

            var clockIn = JsonConvert.DeserializeObject<ClockInViewModel>(json);

            clockIn.token = token;
            
            var res = await c.ClockIn(clockIn);

            Xunit.Assert.True(res.success);
        }


        [Fact]
        public async void ClockInTests()
        {
            var c = new ClockController();

            InitWorkplaceAndPersonnel();


            var loginViewModel = new ClockInViewModel
            {
                scanResults = new List<ScanResult>
                {
                    new ScanResult
                    {
                        hessid = 61,
                        wifiSsid = "anjir_1875",
                        SSID = "ssvd",
                        BSSID = "sscm5"
                    },
                },
                qRCodeContent = "vlkwlkrnf;sjdsfd",
                location = new List<MyLocation>
                {
                    new MyLocation
                    {
                        latitude = 51.1651,
                        longitude = 35.651651,
                        speed = 515156,
                    }
                },
                bitmapdata = new long[5],
                token = "TdqvLaLw76Sky/m0KAC7Fjj4B9HVVBqDA1RoAhgoWyg=",
            };

            var res = await c.ClockIn(loginViewModel);

            Xunit.Assert.True(res.success);
        }


        [Fact]
        public async void ClockOutTests()
        {
            var c = new ClockController();


            var loginViewModel = new ClockInViewModel
            {
                token = "TdqvLaLw76Sky/m0KAC7Fjj4B9HVVBqDA1RoAhgoWyg=",
            };

            var res = await c.ClockIn(loginViewModel);

            Xunit.Assert.True(res.success);


            var res2 = await c.ClockIn(loginViewModel);

            Xunit.Assert.False(res2.success);
        }
    }
}