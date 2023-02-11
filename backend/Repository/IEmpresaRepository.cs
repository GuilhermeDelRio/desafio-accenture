using backend.Data.ValueObjects;

namespace backend.Repository
{
  public interface IEmpresaRepository
  {
    Task<IEnumerable<EmpresaVO>> FindAll();
    Task<EmpresaVO> FindById(int id);
    Task<bool> Delete(int id);
    Task<EmpresaVO> Create(EmpresaVO vo);
    Task<EmpresaVO> Update(EmpresaVO vo);
  }
}