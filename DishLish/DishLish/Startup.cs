using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DishLish.Startup))]
namespace DishLish
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
