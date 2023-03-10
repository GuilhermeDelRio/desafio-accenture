// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("backend.Models.Empresa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("cep");

                    b.Property<string>("CNPJ")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("cpnj");

                    b.Property<string>("NomeFantasia")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("nome_fantasia");

                    b.HasKey("Id");

                    b.HasIndex("CNPJ")
                        .IsUnique();

                    b.ToTable("empresa");
                });

            modelBuilder.Entity("backend.Models.Fornecedor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("cep");

                    b.Property<string>("CNPJ")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("cnpj");

                    b.Property<string>("CPF")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("cpf");

                    b.Property<DateTime?>("DataNascimento")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("data_nascimento");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("email");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("nome");

                    b.Property<string>("RG")
                        .HasColumnType("longtext")
                        .HasColumnName("RG");

                    b.HasKey("Id");

                    b.HasIndex("CNPJ")
                        .IsUnique();

                    b.HasIndex("CPF")
                        .IsUnique();

                    b.ToTable("fornecedor");
                });
#pragma warning restore 612, 618
        }
    }
}
