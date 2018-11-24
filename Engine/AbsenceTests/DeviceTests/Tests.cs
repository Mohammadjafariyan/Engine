using System;
using System.Linq;
using Engine.Absence.Device;
using TypeLite;
using TypeLite.Net4;
using Xunit;

namespace Engine.AbsenceTests.DeviceTests
{
    public class Tests
    {
        
        
        [Fact]
        public void GenerateTsFiles()
        {
            TypeScript.Definitions().ForLoadedAssemblies();
        }
        [Fact]
        public void TestFakeBiometricRepository()
        {
            var fkp = new FakeBiometricRepository();
            fkp.init();
            var q = fkp.GetAll();

            Assert.NotEmpty(q);
        }
        
        [Fact]
        public void TestBetweenDate()
        {
            var fkp = new FakeBiometricRepository();
            fkp.init();
            var q = fkp.GetBetween(1,DateTime.Now,DateTime.Now.AddDays(5));

            Assert.DoesNotContain(q,d=>d.Date==DateTime.Now.AddDays(6));
            Assert.DoesNotContain(q,d=>d.Date==DateTime.Now.AddDays(-1));
        }
    }
}