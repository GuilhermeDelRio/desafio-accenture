namespace backend.Data.ValueObjects
{
  public class EmpresaVO
  {
    public int Id { get; set; }
    public string? CNPJ { get; set; }
    public string? CEP { get; set; }
    public string? NomeFantasia { get; set; }
  }
}