using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Engine.Startup))]
namespace Engine
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
