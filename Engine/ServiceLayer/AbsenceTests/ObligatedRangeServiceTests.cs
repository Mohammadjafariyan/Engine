using System.Linq;
using Engine.Absence.Device;
using Engine.Areas.Absence.Controllers;
using Engine.Entities.Data;
using ServiceLayer.Absence;
using WebAppIDEEngine.Models;
using WebGrease.Css.Extensions;
using Xunit;

namespace Engine.ServiceLayer.AbsenceTests
{
    public class ObligatedRangeServiceTests
    {
        [Fact]
        public void SaveTest()
        {
            var provider = new MultiWeekFakeBiometricRepository();
            var range = provider.GetNewObligatedRange();

            Assert.True(range.ObligatedRangeWeeks.Count == 21);

            var w1 = range.ObligatedRangeWeeks.Take(7);
            var w2 = range.ObligatedRangeWeeks.Skip(7).Take(7);
            var w3 = range.ObligatedRangeWeeks.Skip(14).Take(7);

            w1.ForEach(o => Assert.True(o.WeekNumber == 1));
            w2.ForEach(o => Assert.True(o.WeekNumber == 2));
            w3.ForEach(o => Assert.True(o.WeekNumber == 3));

            

            var service = new ObligatedRangesService();
            service.Save(range);

            var l=range.ObligatedRangeWeeks.ToList();
            l.AddRange(provider.GetWeek(4));
            range.ObligatedRangeWeeks = l;
            

            service.Save(range);
            
            Assert.True(range.ObligatedRangeWeeks.Count==28);

            // DELETE test
            range.ObligatedRangeWeeks.Skip(7).Take(7).ForEach(o => { o.IsRemoved = true; });
            service.Save(range);


            using (var db = new EngineContext())
            {
                var updatedRange=   db.ObligatedRanges.Find(range.Id);
                
            
                w1 = updatedRange.ObligatedRangeWeeks.Take(7);
                w2 = updatedRange.ObligatedRangeWeeks.Skip(7).Take(7);
                Assert.True(updatedRange.ObligatedRangeWeeks.Count == 21);

                w1.ForEach(o => Assert.True(o.WeekNumber == 1));
                w2.ForEach(o => Assert.True(o.WeekNumber == 3));
            }

            
            service.Delete(range.Id);
        }
    }
}