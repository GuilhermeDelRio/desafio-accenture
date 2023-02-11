using AutoMapper;
using backend.Data;
using backend.Data.ValueObjects;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
  public class EmpresaRepository : IEmpresaRepository
  {
    private IMapper _mapper;
    private readonly AppDbContext _context;

    public EmpresaRepository(IMapper mapper, AppDbContext context)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task<EmpresaVO> Create(EmpresaVO vo)
    {
      try
      {
        Empresa empresa = _mapper.Map<Empresa>(vo);
        _context.Empresas!.Add(empresa);
        await _context.SaveChangesAsync();
        return _mapper.Map<EmpresaVO>(empresa);
      }
      catch (Exception)
      {
        return null!;
      }
    }

    public async Task<EmpresaVO> FindById(int id)
    {
      Empresa? empresa = await _context.Empresas!.FirstOrDefaultAsync(emp => emp.Id == id)!;
      if (empresa == null) return null!;
      return _mapper.Map<EmpresaVO>(empresa);
    }

    public async Task<IEnumerable<EmpresaVO>> FindAll()
    {
      List<Empresa> empresas = await _context.Empresas!.ToListAsync();
      return _mapper.Map<List<EmpresaVO>>(empresas);
    }

    public async Task<EmpresaVO> Update(EmpresaVO vo)
    {
      Empresa empresa = _mapper.Map<Empresa>(vo);
      _context.Empresas!.Update(empresa);
      await _context.SaveChangesAsync();
      return _mapper.Map<EmpresaVO>(empresa);
    }

    public async Task<bool> Delete(int id)
    {
      try
      {
        Empresa? empresa = await _context.Empresas!
          .FirstOrDefaultAsync(emp => emp.Id == id)!;

        if (empresa == null) return false;

        _context.Empresas!.Remove(empresa);
        await _context.SaveChangesAsync();

        return true;
      }
      catch (Exception)
      {
        return false;
      }
    }
  }
}