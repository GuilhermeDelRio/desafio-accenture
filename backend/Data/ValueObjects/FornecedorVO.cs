namespace backend.Data.ValueObjects
{
  public class FornecedorVO
  {
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? Email { get; set; }
    public string? CEP { get; set; }
    public string? CNPJ { get; set; }
    public string? CPF { get; set; }
    public string? RG { get; set; }
    public DateTime? DataNascimento { get; set; }
  }
}