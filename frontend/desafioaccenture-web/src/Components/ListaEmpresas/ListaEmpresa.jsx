import { useContext } from 'react'
import './listaEmpresa.css'
import { FaPen, FaTrash } from "react-icons/fa"
import { EmpresaContext } from '../../Contexts/empresaContext'

export default function ListaEmpresa() {

  const { empresas, deletaEmpresa } = useContext(EmpresaContext)

  return (

    <div>
      {empresas.length === 0
        ? <div className='fornecedor-warning'>
            <h2>Não há nenhuma Empresa cadastrada no momento!</h2>
          </div>

        : <div className='lista-empresa'>
            {empresas.map((val) => (
              <div className='item-empresa' key={val.id}>
                  <div className='item-row'>

                    <h1>{val.nomeFantasia}</h1>

                    <div className='botoes-acao'>
                      <button id='btn-editar'>
                        <FaPen />
                      </button>

                      <button id='btn-deletar' onClick={() => deletaEmpresa(val.id)}>
                        <FaTrash />
                      </button>
                    </div>

                  </div>
              </div>
            ))}
          </div>
      }
    </div>
  )
}
