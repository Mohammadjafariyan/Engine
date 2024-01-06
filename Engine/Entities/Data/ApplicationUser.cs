using System.Collections.Generic;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.ViewModel;
using Engine.Controllers.AbstractControllers;
using Engine.Entities.Data.Absence.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Engine.Entities.Data
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            WorkGroups = new List<WorkGroup>();
            Machines = new List<Machine>();
            ObligatedRanges = new List<ObligatedRange>();
            ObligatedRangeWeekss = new List<ObligatedRangeWeeks>();
            ObligatedRangeDayTimess = new List<ObligatedRangeDayTimes>();
            Personnels = new List<Personnel>();
            PersonnelMachines = new List<PersonnelMachine>();
            WorkGroupObligatedRanges = new List<WorkGroupObligatedRange>();
            Workplaces = new List<Workplace>();
            WorkplacePersonnels = new List<WorkplacePersonnel>();
            WorkplaceSettings = new List<WorkplaceSetting>();
            BiometricDatas = new List<BiometricData>();
        }

        public string Avatar { get; set; }
        public string Hometown { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }
        public virtual ICollection<WorkGroup> WorkGroups { get; set; }
        public virtual ICollection<Machine> Machines { get; set; }
        public virtual ICollection<ObligatedRange> ObligatedRanges { get; set; }
        public virtual ICollection<ObligatedRangeWeeks> ObligatedRangeWeekss { get; set; }
        public virtual ICollection<ObligatedRangeDayTimes> ObligatedRangeDayTimess { get; set; }
        public virtual ICollection<Personnel> Personnels { get; set; }
        public virtual ICollection<PersonnelMachine> PersonnelMachines { get; set; }
        public virtual ICollection<WorkGroupObligatedRange> WorkGroupObligatedRanges { get; set; }
        public virtual ICollection<Workplace> Workplaces { get; set; }
        public virtual ICollection<WorkplacePersonnel> WorkplacePersonnels { get; set; }
        public virtual ICollection<WorkplaceSetting> WorkplaceSettings { get; set; }
        public ICollection<BiometricData> BiometricDatas { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    /*public class EngineContext : IdentityDbContext<ApplicationUser>
    {
        public EngineContext()
            : base(EngineUtility.AuthenticationContextName(), throwIfV1Schema: false)
        {
            //  Database.Connection.ConnectionString = ConnectionProvider.GetEntityConnectionString();
            //   Database.Connection.ConnectionString = new ConnectionProviderFactory().Current.GetConnectionString();
         //   Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, ApplicationDbContextConfiguration>());

            
        }

        public static EngineContext Create()
        {
            return new EngineContext();
        }
    }*/
}