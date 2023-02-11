using backend.Data.ValueObjects;

namespace backend.Repository
{
  public interface IFornecedorRepository
  {
    Task<IEnumerable<FornecedorVO>> FindAll();
    Task<FornecedorVO> FindById(int id);
    Task<bool> Delete(int id);
    Task<FornecedorVO> Create(FornecedorVO vo);
    Task<FornecedorVO> Update(FornecedorVO vo);
  }
}