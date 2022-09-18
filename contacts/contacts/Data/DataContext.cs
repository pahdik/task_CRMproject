using Microsoft.EntityFrameworkCore;
using contacts.Models;
namespace contacts.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) {  }

        public DbSet<Contact> Contacts { get; set; }
    }
}
