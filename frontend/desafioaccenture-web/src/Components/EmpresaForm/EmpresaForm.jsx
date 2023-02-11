import { useState, useContext } from 'react'
import './empresaForm.css'


import Validacao from '../../Utils/validacao'
import cepAPI from '../../Apis/ceplaAPI'

import { toast } from 'react-toastify'
import { FaSave } from "react-icons/fa";

import { EmpresaContext } from '../../Contexts/empresaContext'

const initialState = {
  cnpj: '',
  cep: '',
  nomeFantasia: ''
}

export default function EmpresaForm() {

  const { criarEmpresa } = useContext(EmpresaContext)

  const [empresa, setEmpresa] = useState(initialState)
  const [errorList, setErrorList] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    const aux = { ...empresa }

    aux[name] = value

    setEmpresa(aux)
  }

  const cadastrarEmpresa = async () => {
    let errors = Validacao.formCheck(empresa)

    if (errors.length > 0) {
      setErrorList(errors)
      return
    }

    setErrorList([])

    let responseCEP = await getCEP(empresa.cep)

    if(responseCEP.data.length === 0) {
      return toast.error('O CEP digitado não é válido')
    }

    await criarEmpresa(empresa)
    setEmpresa(initialState)
  }

  async function getCEP(cep) {

    const config = {
      headers: {
        "Accept": "application/json"
      }
    }

    return cepAPI.get(cep, config)
      .catch(err => console.log(err))
  }

  return (
    <div className='cadastro-empresa-form'>

      <form>
        <label>Nome Fantasia</label>
        <input 
          type="text" 
          name='nomeFantasia'
          value={empresa.nomeFantasia}
          onChange={handleChange}
        />
        {errorList.includes('nomeFantasia') ? <p className='errorMsg'>O campo nome fantasia não pode ser vazio.</p> : <></>}

        <label>CNPJ</label>
        <input 
          type="text" 
          name='cnpj'
          value={empresa.cnpj}
          onChange={handleChange}
        />
        {errorList.includes('cnpj') ? <p className='errorMsg'>O campo CNPJ não pode ser vazio.</p> : <></>}

        <label>CEP</label>
        <input 
          type="text" 
          name='cep'
          value={empresa.cep}
          onChange={handleChange}
        />
        {errorList.includes('cep') ? <p className='errorMsg'>O campo CEP não pode ser vazio.</p> : <></>}
      </form>

      <div className='btn-row'>
        <button onClick={cadastrarEmpresa}><FaSave /> Salvar</button>
      </div>

    </div>
  )
}
