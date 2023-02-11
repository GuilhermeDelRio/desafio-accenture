using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
  [Table("empresa")]
  public class Empresa
  {
    [Key]
    [Required]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("cpnj")]
    public string? CNPJ { get; set; }

    [Required]
    [Column("cep")]
    public string? CEP { get; set; }

    [Required]
    [Column("nome_fantasia")]
    public string? NomeFantasia { get; set; }
  }
}