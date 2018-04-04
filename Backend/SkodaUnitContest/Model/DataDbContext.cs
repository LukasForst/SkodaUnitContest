using Microsoft.EntityFrameworkCore;

namespace SkodaUnitWebApi.Model
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        {
        }

        public DbSet<Image> Images { get; set; }
        public DbSet<Arrticle> Articles { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}