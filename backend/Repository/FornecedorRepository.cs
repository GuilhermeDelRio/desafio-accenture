using AutoMapper;
using backend.Data;
using backend.Data.ValueObjects;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
  public class FornecedorRepository : IFornecedorRepository
  {
    private readonly AppDbContext _context;
    private IMapper _mapper;

    public FornecedorRepository(AppDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<FornecedorVO> Create(FornecedorVO vo)
    {
      try {
        Fornecedor fornecedor = _mapper.Map<Fornecedor>(vo);
        _context.Fornecedores!.Add(fornecedor);
        await _context.SaveChangesAsync();
        return _mapper.Map<FornecedorVO>(fornecedor);
      }
      catch (Exception)
      {
        return null!;
      }
    }

    public async Task<FornecedorVO> FindById(int id)
    {
      Fornecedor? fornecedor = await _context.Fornecedores!.FirstOrDefaultAsync(f => f.Id == id)!;
      if (fornecedor == null) return null!;
      return _mapper.Map<FornecedorVO>(fornecedor);
    }

    public async Task<IEnumerable<FornecedorVO>> FindAll()
    {
      List<Fornecedor> fornecedores = await _context.Fornecedores!.ToListAsync();
      return _mapper.Map<List<FornecedorVO>>(fornecedores);
    }

    public async Task<FornecedorVO> Update(FornecedorVO vo)
    {
      Fornecedor fornecedor = _mapper.Map<Fornecedor>(vo);
      _context.Fornecedores!.Update(fornecedor);
      await _context.SaveChangesAsync();
      return _mapper.Map<FornecedorVO>(fornecedor);
    }

    public async Task<bool> Delete(int id)
    {
      try
      {
        Fornecedor? fornecedor = await _context.Fornecedores!
          .FirstOrDefaultAsync(f => f.Id == id)!;

        if (fornecedor == null) return false;

        _context.Fornecedores!.Remove(fornecedor);
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