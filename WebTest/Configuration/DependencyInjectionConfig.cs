using Microsoft.Extensions.DependencyInjection;
using WebTest.Providers;

namespace WebTest.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void Load(IServiceCollection services)
        {
            services.AddScoped<IAccountProvider, AccountProvider>();
        }
    }
}