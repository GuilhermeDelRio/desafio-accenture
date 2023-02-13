import { useContext, useState } from 'react'
import './listaFornecedores.css'
import { FaPen, FaTrash } from "react-icons/fa"
import { Drawer } from 'antd'

import { FornecedorContext } from '../../Contexts/fornecedorContext'
import FornecedorEditForm from '../FornecedorEditForm/FornecedorEditForm'

export default function ListaFornecedores() {

  const { deletaFornecedor, fornecedores, pesquisaFornecedor } = useContext(FornecedorContext)
  
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState([])

  //const [fornecedorFiltroData, setFornecedorFiltroData] = useState([])
  const [filtro, setFiltro] = useState('')
  

  const showDrawer = (data) => {
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
    setEditData([])
    console.log(editData)
  }

  const handleChange = (e) => {
    const query = e.target.value
    setFiltro(query)
  }

  async function filtrarFornecedores() {
    await pesquisaFornecedor(filtro)
  }

  return (
    <div>
      {fornecedores.length === 0 
        ? <div className='fornecedor-warning'>
            <h2>Não há nenhum Fornecedor cadastrado no momento!</h2>
          </div>
        : <div className='lista-fornecedores'>
            <div className='filtros-fornecedores'>
              <input 
                type='text' 
                name='fornecedorFiltro'
                placeholder='Pesquise por Nome/CNPJ/CPF'
                value={filtro}
                onChange={handleChange}
              />
              <button onClick={filtrarFornecedores}>Pesquisar</button>
            </div>

            {fornecedores.map((val) => (
              <div className='item-fornecedor' key={val.id}>
                <div className='item-row'>

                  <h1>{val.nome}</h1>

                  <div className='botoes-acao'>
                    <button id='btn-editar' onClick={showDrawer}>
                      <FaPen />
                    </button>

                    <button id='btn-deletar' onClick={() => deletaFornecedor(val.id)}>
                      <FaTrash />
                    </button>
                  </div>

                  <Drawer 
                  title="ATUALIZAR FORNECEDOR"
                  placement='right' 
                  onClose={closeDrawer} 
                  open={isOpen}
                  width={600}
                >
                    <FornecedorEditForm fornecedorEdit={val}/>
                  </Drawer>

                </div>
              </div>
            ))}
          </div>
      }

    </div>
  )
}
