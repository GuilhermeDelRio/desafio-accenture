using AutoMapper;
using backend.Data.ValueObjects;
using backend.Models;

namespace backend.Config
{
  public class MappingConfig
  {
    public static MapperConfiguration RegisterMaps()
    {
      var mappingConfig = new MapperConfiguration(config =>
      {
        config.CreateMap<EmpresaVO, Empresa>();
        config.CreateMap<Empresa, EmpresaVO>();
        config.CreateMap<Fornecedor, FornecedorVO>();
        config.CreateMap<FornecedorVO, Fornecedor>();
      });

      return mappingConfig;
    }
  }
}