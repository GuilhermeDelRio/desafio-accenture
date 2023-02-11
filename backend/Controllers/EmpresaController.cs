using backend.Data.ValueObjects;
using backend.Repository;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/v1/[controller]")]
  public class EmpresaController : ControllerBase
  {

    private IEmpresaRepository _repository;

    public EmpresaController(IEmpresaRepository repository)
    {
      _repository = repository;
    }

    [HttpPost]
    public async Task<ActionResult<EmpresaVO>> Create([FromBody] EmpresaVO vo)
    {
      Utilitario util = new();

      if (vo == null) return BadRequest();

      var cpfValido = await util.ValidaCEP(vo.CEP!);
      if(!cpfValido) return BadRequest(new { message = "O CEP não é válido"});
      
      var empresa = await _repository.Create(vo);
      if (empresa == null) return BadRequest(new { message = "O CNPJ já foi cadastrado"});
      return CreatedAtAction(nameof(FindById), new { Id = empresa.Id }, empresa);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EmpresaVO>> FindById(int id)
    {
      var empresa = await _repository.FindById(id);
      if (empresa == null) return NotFound();
      return Ok(empresa);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmpresaVO>>> FindAll()
    {
      var empresa = await _repository.FindAll();
      return Ok(empresa);
    }

    [HttpPut]
    public async Task<ActionResult<EmpresaVO>> Update([FromBody] EmpresaVO vo)
    {
      if (vo == null) return BadRequest();
      var empresa = await _repository.Update(vo);
      return Ok(empresa);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
      var status = await _repository.Delete(id);
      if (!status) return BadRequest();
      return NoContent();
    }
  }
}