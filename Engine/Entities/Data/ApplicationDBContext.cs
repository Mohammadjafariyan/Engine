using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Engine.Controllers.AbstractControllers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Engine.Entities.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string Avatar { get; set; }
        public string Hometown { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base(EngineUtility.AuthenticationContextName(), throwIfV1Schema: false)
        {
            //  Database.Connection.ConnectionString = ConnectionProvider.GetEntityConnectionString();
            //   Database.Connection.ConnectionString = new ConnectionProviderFactory().Current.GetConnectionString();
         //   Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, ApplicationDbContextConfiguration>());

            
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}