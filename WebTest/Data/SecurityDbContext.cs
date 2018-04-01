using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebTest.Authentification;

namespace WebTest.Data
{
    public class SecurityDbContext : IdentityDbContext<ApplicationUser>
    {
        public SecurityDbContext(DbContextOptions<SecurityDbContext> options): base(options)
        {
        }

        protected SecurityDbContext()
        {
        }
    }
}