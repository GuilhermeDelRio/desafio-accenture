using backend.Data.ValueObjects;
using backend.Repository;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/v1/[controller]")]
  public class FornecedorController : ControllerBase
  {
    private IFornecedorRepository _repository;

    public FornecedorController(IFornecedorRepository repository)
    {
      _repository = repository;
    }

    [HttpPost]
    public async Task<ActionResult<FornecedorVO>> Create([FromBody] FornecedorVO vo)
    {
      Utilitario util = new();

      if (vo == null) return BadRequest();
      var fornecedor = await _repository.Create(vo);

      var cpfValido = await util.ValidaCEP(vo.CEP!);
      if(!cpfValido) return BadRequest(new { message = "O CEP não é válido"});

      if (fornecedor == null) return BadRequest(new { message = "O CNPJ/CPF já foi cadastrado"});
      return CreatedAtAction(nameof(FindById), new { Id = fornecedor.Id }, fornecedor);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FornecedorVO>> FindById(int id)
    {
      var fornecedor = await _repository.FindById(id);
      if (fornecedor == null) return NotFound();
      return Ok(fornecedor);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FornecedorVO>>> FindAll()
    {
      var fornecedores = await _repository.FindAll();
      return Ok(fornecedores);
    }

    [HttpPut]
    public async Task<ActionResult<FornecedorVO>> Update([FromBody] FornecedorVO vo)
    {
      if (vo == null) return BadRequest();
      var fornecedor = await _repository.Update(vo);
      return Ok(fornecedor);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete (int id)
    {
      var fornecedor = await _repository.Delete(id);
      if (!fornecedor) return BadRequest();
      return NoContent();
    }
  }
}