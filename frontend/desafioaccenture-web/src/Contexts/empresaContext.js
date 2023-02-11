import { useState, createContext, useEffect } from "react";
import api from '../Apis/desafioAccentureAPI'
import { toast } from 'react-toastify'

export const EmpresaContext = createContext({})

function EmpresaProvider({ children }) {
  
  const [empresas, setEmpresas] = useState([])

  useEffect(() => {
    api.get('Empresa')
      .then(res => {
        setEmpresas([...empresas, ...res.data])
      })
  }, [])

  async function criarEmpresa(empresa) {
    await api.post('Empresa', empresa)
      .then(res => {
        toast.success('Empresa cadastrada com sucesso!')  
        setEmpresas([...empresas, res.data])
      })
      .catch(err => {
        if (err.response.status === 400) {
          toast.error(err.response.data.message)
        }
      })
  }

  async function deletaEmpresa(id) {
    let empresasFiltradas = empresas
      .filter(emp => emp.id !== id)

    await api.delete(`Empresa/${id}`)
      .then(res => {
        setEmpresas(empresasFiltradas)
      })
      .catch(err => console.log(err))
  }

  return(
    <EmpresaContext.Provider value={{ empresas, criarEmpresa, deletaEmpresa }}>
      {children}
    </EmpresaContext.Provider>
  )

}

export default EmpresaProvider