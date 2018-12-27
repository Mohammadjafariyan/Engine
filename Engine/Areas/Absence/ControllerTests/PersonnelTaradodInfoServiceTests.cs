using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Engine.Absence.Device;
using Engine.Absence.Models;
using Engine.Areas.Absence.Controllers;
using Engine.Areas.Absence.Models;
using Engine.Areas.Absence.Service;
using Engine.Controllers.AbstractControllers;
using Xunit;

namespace Engine.Areas.Absence.ControllerTests
{
    public class PersonnelTaradodInfoServiceTests
    {

        [Fact]
        public void ConvertToShamsiDateTest()
        {
            var time=new DateTime(1994,09,29,2,50,58);
            // var c = new PersonnelTaradodInfoService();

            var str=EngineUtility.ConvertToShamsiDate(time,false,false);

            Assert.True(str=="1373/07/07");

        }
        [Fact]
        public void TimeSpanToStrTest()
        {
            var time=new DateTime(2017,05,05,2,50,58);
           // var c = new PersonnelTaradodInfoService();

            var str=EngineUtility.ConvertTimeSpanToStr(time.TimeOfDay);

            Assert.True(str=="2:50:58");

        }

        /// <summary>
        /// تست شیفت های دو هفته ای و چند هفته ای
        /// </summary>
        [Fact]
        public void MultiWeekPersonnelTaradodTestDetail()
        {
            // ایجاد دیتای فیک
            var fakeBiometricRepository = new MultiWeekFakeBiometricRepository();
            fakeBiometricRepository.init();
            
            
            
            // اطلاعات از تاریخ تا تاریخ را بده برای پرسنل خاص
            var c = new PersonnelTaradodInfoService();
            var personnelId = fakeBiometricRepository.personnel.Id;
            var fromDate = DateTime.Now;
            var toDate = DateTime.Now.AddDays(15);
            var biometricData = c.GetBiometricData(personnelId, fromDate, toDate);
            
            
            // بازه موظفی شخص
            ObligatedRange obligatedRange = c.GetObligatedRange(personnelId);
            Assert.NotNull(obligatedRange);
            Assert.True(obligatedRange.ObligatedRangeWeeks.Count>=14);

            
            // محاسبه اطلاعات
            List<BiometryCalculatedDetail> taradodInfo = c.CompareAndJoin(fakeBiometricRepository.workgroupRange.DateTime.Value, toDate,biometricData, obligatedRange);
            
            // روز اول 
            var firstDay=taradodInfo.ElementAt(1);

            /*ValidateFirst(firstDay);

            var nineDay=taradodInfo.ElementAt(9);
            ValidateNine(nineDay);*/
       

            //   Assert.True(taradodInfo.Count==biometricData.Count());

            
            // محاسبه جمع
            BiometryCalculatedDetail total=c.CalculateTotal(taradodInfo);
            
            
            }

        private void ValidateNine(BiometryCalculatedDetail nineDay)
        {
            Assert.True(nineDay.TotalAbsence.Hours==0 );
            Assert.True(nineDay.TotalAbsence.Minutes==30 );
            Assert.True(nineDay.TotalAbsence.Seconds==20 );
            
            Assert.True(nineDay.TotalOvertime.Hours==0 );
            Assert.True(nineDay.TotalOvertime.Minutes==0 );
            Assert.True(nineDay.TotalOvertime.Seconds==0 );
            
            
            Assert.True(nineDay.InValid.Hours==0 );
            Assert.True(nineDay.InValid.Minutes==0 );
            Assert.True(nineDay.InValid.Seconds==10 );
            
            Assert.True(nineDay.TotalValid.Hours==9 );
            Assert.True(nineDay.TotalValid.Minutes==29 );
            Assert.True(nineDay.TotalValid.Seconds==40 );
            
            
            Assert.True(nineDay.Times.Count==4 );
        }

        private void ValidateFirst(BiometryCalculatedDetail firstDay)
        {
            Assert.True(firstDay.TotalAbsence.Hours==9 );
            Assert.True(firstDay.TotalAbsence.Minutes==0 );
            Assert.True(firstDay.TotalAbsence.Seconds==50 );
            
            Assert.True(firstDay.TotalOvertime.Hours==2 );
            Assert.True(firstDay.TotalOvertime.Minutes==0 );
            Assert.True(firstDay.TotalOvertime.Seconds==0 );
            
            
            Assert.True(firstDay.InValid.Hours==0 );
            Assert.True(firstDay.InValid.Minutes==30 );
            Assert.True(firstDay.InValid.Seconds==10 );
            
            Assert.True(firstDay.TotalAbsence.Hours==0 );
            Assert.True(firstDay.TotalAbsence.Minutes==30 );
            Assert.True(firstDay.TotalAbsence.Seconds==20 );
            
            Assert.True(firstDay.TotalValid.Hours==7 );
            Assert.True(firstDay.TotalValid.Minutes==29 );
            Assert.True(firstDay.TotalValid.Seconds==40 );
            
            
            Assert.True(firstDay.Times.Count==4 );
        }

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