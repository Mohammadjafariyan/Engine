using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using Owin;

[assembly: OwinStartupAttribute(typeof(Engine.Startup))]
namespace Engine
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
            
            var key = Encoding.UTF8.GetBytes("your-secret-key");

            var tokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "your-issuer",
                ValidAudience = "your-audience",
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                TokenValidationParameters = tokenValidationParameters
            });
            ConfigureAuth(app);
        }
        
        
    }
}
