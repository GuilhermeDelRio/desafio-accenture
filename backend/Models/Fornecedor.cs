using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
  [Table("fornecedor")]
  public class Fornecedor
  {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("nome")]
    public string? Nome { get; set; }

    [Required]
    [Column("email")]
    public string? Email { get; set; }

    [Required]
    [Column("cep")]
    public string? CEP { get; set; }

    [Column("cnpj")]
    public string? CNPJ { get; set; }

    [Column("cpf")]
    public string? CPF { get; set; }

    [Column("RG")]
    public string? RG { get; set; }

    [Column("data_nascimento")]
    public DateTime? DataNascimento { get; set; }
    // public vitual ICollection<Empresa>? Empresas {get; set; }
  }
}