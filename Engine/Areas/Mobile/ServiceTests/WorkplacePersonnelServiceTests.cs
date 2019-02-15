using System;
using System.Data.Entity;
using System.Linq;
using Engine.Absence.Models;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Rhino.Mocks;
using ServiceLayer.Absence;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using Xunit;

namespace Engine.Areas.Mobile.ServiceTests
{
    public class WorkplacePersonnelServiceTests
    {

        [Fact]
        public void SaveTest()
        {
            var workplacePersonnelService = new WorkplacePersonnelService();

            var workplacePersonnel = new WorkplacePersonnel();
            try
            {
                workplacePersonnelService.Save(workplacePersonnel);
                Assert.True(false);
            }
            catch (JServiceException e)
            {
                Assert.True(true);
            }



            Personnel personnel;
            using (var db=new EngineContext())
            {
                 personnel = db.Personnels.First();
                workplacePersonnel.PersonnelId = personnel.Id;
                workplacePersonnel.WorkplaceId = db.Workplaces.First().Id;
            }

            
            // بدون کد است خطا باید بدهد
            try
            {
                workplacePersonnelService.Save(workplacePersonnel);
                Assert.True(false);
            }
            catch (JServiceException e)
            {
                Assert.True(true);
            }
            
            using (var db=new EngineContext())
            {
                personnel = db.Personnels.First();
                workplacePersonnel.PersonnelId = personnel.Id;
                personnel.Code = "170511365451";
                db.Entry(personnel).State = EntityState.Modified;
                db.SaveChanges();
            }
            
            workplacePersonnelService.Save(workplacePersonnel);
            Assert.True(workplacePersonnel.Username=="170511365451");
            Assert.True(workplacePersonnel.Password=="170511365451");

        }
    }
}