using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext() { }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Empresa>? Empresas { get; set; }
    public DbSet<Fornecedor>? Fornecedores { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.Entity<Empresa>()
        .HasIndex(e => e.CNPJ).IsUnique();
      
      builder.Entity<Fornecedor>()
        .HasIndex(f => f.CNPJ).IsUnique();

      builder.Entity<Fornecedor>()
        .HasIndex(f => f.CPF).IsUnique();
    }
  }
}