import { useState, createContext, useEffect } from "react";
import api from '../Apis/desafioAccentureAPI'
import { toast } from 'react-toastify'

export const FornecedorContext = createContext({})

function FornecedorProvider({ children }) {

  const [fornecedores, setFornecedores] = useState([])

  useEffect(() => {
    api.get('Fornecedor')
      .then(res => {
        setFornecedores([...fornecedores, ...res.data])
      })
  }, [])

  async function criarFornecedor(data) {

    const fornecedorData = {
      nome: data.nome,
      email: data.email,
      cep: data.cep,
      cnpj: data.cnpj,
      cpf: data.cpf,
      rg: data.cpf,
      dataNascimento: data.dataNascimento === '' ? null : data.dataNascimento
    }

    await api.post('Fornecedor', fornecedorData)
      .then(res => {
        toast.success('Fornecedor cadastrado com sucesso!')  
        setFornecedores([...fornecedores, res.data])
      })
      .catch(err => {
        if (err.response.status === 400) {
          toast.error(err.response.data.message)
        }
      })
  }

  async function deletaFornecedor(id) {
    let fornecedoresFiltrados = fornecedores
      .filter(f => f.id !== id)

    await api.delete(`Fornecedor/${id}`)
      .then(res => {
        setFornecedores(fornecedoresFiltrados)
      })
      .catch(err => console.log(err))
  }

  async function pesquisaFornecedor(query) {
    if (!query) return

    const fornecedorFiltrado = fornecedores
      .find((fornecedor) => fornecedor.nome
        .toUpperCase()
        .includes(query.toUpperCase()))

    if (fornecedorFiltrado === undefined ) {
      return toast.error("Fornecedor não encontrado!")
    }

    setFornecedores([fornecedorFiltrado])
  }

  return(
    <FornecedorContext.Provider value={{ fornecedores, deletaFornecedor, criarFornecedor, pesquisaFornecedor }}>
      {children}
    </FornecedorContext.Provider>
  )
}

export default FornecedorProvider