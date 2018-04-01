using Microsoft.EntityFrameworkCore;

namespace WebTest.Data
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        {
        }
    }
}