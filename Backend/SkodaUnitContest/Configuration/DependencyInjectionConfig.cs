using Microsoft.Extensions.DependencyInjection;
using SkodaUnitWebApi.Providers;

namespace SkodaUnitWebApi.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void Load(IServiceCollection services)
        {
            services.AddScoped<IAccountProvider, AccountProvider>();
            services.AddScoped<IArticlesProvider, ArticlesProvider>();
        }
    }
}