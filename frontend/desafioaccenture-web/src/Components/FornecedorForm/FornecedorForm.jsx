import { useState, useContext } from 'react'
import './fornecedorForm.css'

import Validacao from '../../Utils/validacao'

import { toast } from 'react-toastify'
import { FaSave } from "react-icons/fa"

import { FornecedorContext } from '../../Contexts/fornecedorContext'

const initialState = {
  nome: '',
  email: '',
  cep: '',
  cnpjoucpf: '',
  cnpj: '',
  cpf: '',
  rg: '',
  dataNascimento: '',
  naturezaJuridica: 'CNPJ'
}

export default function FornecedorForm() {

  const { criarFornecedor } = useContext(FornecedorContext)

  const [fornecedor, setFornecedor] = useState(initialState)
  const [errorList, setErrorList] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    const aux = { ...fornecedor }

    aux[name] = value

    setFornecedor(aux)
  }

  const cadastrarFornecedor = async () => {
    let errors = Validacao.formCheck(fornecedor)
    
    errors = errors.filter(item => item !== 'cnpj' && item !== 'cpf')
    
    if (fornecedor.naturezaJuridica === 'CNPJ') {
      errors = errors.filter(item => item !== 'rg' && item !== 'dataNascimento')
    }

    let responseCEP = await Validacao.getCEP(fornecedor.cep)

    if(responseCEP.data.length === 0) {
      return toast.error('O CEP digitado não é válido')
    }

    if (errors.length > 0) {
      setErrorList(errors)
      return
    }

    setErrorList([])

    if (fornecedor.naturezaJuridica === "CNPJ") {
      fornecedor.cnpj = fornecedor.cnpjoucpf
      fornecedor.cpf = ''
    } else {
      fornecedor.cpf = fornecedor.cnpjoucpf
      fornecedor.cnpj = ''
    }

    await criarFornecedor(fornecedor)
    setFornecedor(initialState)
  }

  return (
    <div className='cadastro-fornecedor-form'>
      <form>
        <label>Nome</label>
        <input 
          type="text" 
          name='nome'
          value={fornecedor.nome}
          onChange={handleChange}
        />
        {errorList.includes('nome') ? <p className='errorMsg'>O campo nome não pode ser vazio.</p> : <></>}

        <label>E-mail</label>
        <input 
          type="text" 
          name='email'
          value={fornecedor.email}
          onChange={handleChange}
        />
        {errorList.includes('email') ? <p className="errorMsg">O campo e-mail não pode ser vazio.</p> : <></>}

        <label>CEP</label>
        <input 
          type="text" 
          name='cep'
          value={fornecedor.cep}
          onChange={handleChange}
        />
        {errorList.includes('cep') ? <p className="errorMsg">O campo CEP não pode ser vazio.</p> : <></>}

        <div className='natureza-Juridica' onChange={handleChange}>
          <input type='radio' id="cnpj" value="CNPJ" name='naturezaJuridica' defaultChecked/>
          <label htmlFor="cnpj">CNPJ</label>
          <input type='radio' id="cpf" value="CPF" name='naturezaJuridica'/>
          <label htmlFor="cpf">CPF</label>
        </div>

        <label>{fornecedor.naturezaJuridica}</label>
        <input 
          type="text" 
          name='cnpjoucpf'
          value={fornecedor.cnpjoucpf}
          onChange={handleChange}
        />
        {errorList.includes('cnpjoucpf') ? <p className="errorMsg">O campo {fornecedor.naturezaJuridica} não pode ser vazio.</p> : <></>}

        {fornecedor.naturezaJuridica === 'CPF' 
          ? <>
              <label>RG</label>
              <input 
                type="text" 
                name='rg'
                value={fornecedor.rg}
                onChange={handleChange}
              />
              {errorList.includes('rg') ? <p className="errorMsg">O campo RG não pode ser vazio.</p> : <></>}

              <label>Data de Nascimento</label>
              <input 
                type="date" 
                name='dataNascimento'
                value={fornecedor.dataNascimento}
                onChange={handleChange}
              />
              {errorList.includes('dataNascimento') ? <p className="errorMsg">O campo data de nascimento não pode ser vazio.</p> : <></>}
            </>
          : <></>
        }
      </form>

      <div className='btn-row'>
        <button onClick={cadastrarFornecedor}><FaSave /> Salvar</button>
      </div>

    </div>
  )
}
