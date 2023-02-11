import { useContext } from 'react'
import './listaFornecedores.css'
import { FaPen, FaTrash } from "react-icons/fa"

import { FornecedorContext } from '../../Contexts/fornecedorContext'

export default function ListaFornecedores() {

  const { deletaFornecedor, fornecedores } = useContext(FornecedorContext)

  return (
    <div>
      {fornecedores.length === 0 
        ? <div className='fornecedor-warning'>
            <h2>Não há nenhum Fornecedor cadastrado no momento!</h2>
          </div>
        : <div className='lista-fornecedores'>
            {fornecedores.map((val) => (
              <div className='item-fornecedor' key={val.id}>
                <div className='item-row'>

                  <h1>{val.nome}</h1>

                  <div className='botoes-acao'>
                    <button id='btn-editar'>
                      <FaPen />
                    </button>

                    <button id='btn-deletar' onClick={() => deletaFornecedor(val.id)}>
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
