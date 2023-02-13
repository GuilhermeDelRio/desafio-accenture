import { useState, useContext, useEffect } from 'react'
import './empresaForm.css'

import { toast } from 'react-toastify'
import { FaSave } from "react-icons/fa"
import api from '../../Apis/desafioAccentureAPI'
import Select from 'react-select'

import Validacao from '../../Utils/validacao'
import { EmpresaContext } from '../../Contexts/empresaContext'

const initialState = {
  cnpj: '',
  cep: '',
  nomeFantasia: ''
}

let options = []

export default function EmpresaForm() {

  const { criarEmpresa } = useContext(EmpresaContext)

  const [empresa, setEmpresa] = useState(initialState)
  const [errorList, setErrorList] = useState([])

  const [fornecedores, setFornecedores] = useState([])

  useEffect(() => {
    api.get('Fornecedor')
      .then(res => {
        res.data.forEach(element => {
          options.push({ id: element.id, value: element.nome, label: element.nome})
        })
      })
  
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    const aux = { ...empresa }

    aux[name] = value

    setEmpresa(aux)
  }

  const cadastrarEmpresa = async () => {
    console.log(fornecedores)
    let errors = Validacao.formCheck(empresa)

    if (errors.length > 0) {
      setErrorList(errors)
      return
    }

    setErrorList([])

    let responseCEP = await Validacao.getCEP(empresa.cep)

    if(responseCEP.data.length === 0) {
      return toast.error('O CEP digitado não é válido')
    }

    await criarEmpresa(empresa)
    setEmpresa(initialState)
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

        <label>Fornecedores</label>
        <Select 
          options={options} 
          isMulti
          isClearable={true}
          isSearchable={true}
          onChange={(item) => setFornecedores(item)}
        />
      </form>

      <div className='btn-row'>
        <button onClick={cadastrarEmpresa}><FaSave /> Salvar</button>
      </div>

    </div>
  )
}
