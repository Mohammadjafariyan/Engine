using System;
using System.Collections.Generic;
using System.Linq;
using Engine.Absence.Device;
using Engine.Absence.Models;
using Engine.Areas.Absence.Controllers;
using Engine.Areas.Absence.Models;
using Engine.Areas.Absence.Service;
using Xunit;

namespace Engine.Areas.Absence.ControllerTests
{
    public class PersonnelTaradodInfoServiceTests
    {


        [Fact]
        public void TestPersonnelWorkDetail()
        {

            var fakeBiometricRepository = new FakeBiometricRepository();
            fakeBiometricRepository.init();
            
            var c = new PersonnelTaradodInfoService();

            var personnelId = fakeBiometricRepository.personnel.Id;
            var fromDate = DateTime.Now.AddDays(-1);
            var toDate = DateTime.Now.AddDays(1);
            var biometricData = c.GetBiometricData(personnelId, fromDate, toDate);
            
            var tmpday = DateTime.Now.AddDays(2);
            Assert.DoesNotContain(biometricData, b =>b.Date>tmpday);
            
            
            ObligatedRange obligatedRange = c.GetObligatedRange(personnelId);
            Assert.NotNull(obligatedRange);
            Assert.True(obligatedRange.ObligatedRangeWeeks.Count>=7);

            List<BiometryCalculatedDetail> taradodInfo = c.CompareAndJoin(fromDate, toDate,biometricData, obligatedRange);

         //   Assert.True(taradodInfo.Count==biometricData.Count());

            
            BiometryCalculatedDetail total=c.CalculateTotal(taradodInfo);
            
        }
    }
}