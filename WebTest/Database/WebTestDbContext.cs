using Microsoft.EntityFrameworkCore;

namespace WebTest.Database
{
    public class WebTestDbContext : DbContext
    {
        public WebTestDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}