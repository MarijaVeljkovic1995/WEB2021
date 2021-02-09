using Microsoft.EntityFrameworkCore;

namespace ProjekatWebServer.Models
{
    public class FabrikaContext : DbContext
    {
          public DbSet<Fabrika> Fabrika {get; set;}
        
        public DbSet<Silos> Silos {get; set;}
        public FabrikaContext (DbContextOptions options ) : base (options)
        {

        }
    }
}