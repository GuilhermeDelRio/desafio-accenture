import { useState, useContext } from 'react'
import './fornecedor.css'

import { FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd'

import FornecedorProvider from '../../Contexts/fornecedorContext'

import ListaFornecedores from '../../Components/ListaFornecedores/ListaFornecedores'
import FornecedorForm from '../../Components/FornecedorForm/FornecedorForm'

export default function Fornecedor() {
  
  const [isOpen, setIsOpen] = useState(false)

  const showDrawer = () => {
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <FornecedorProvider>
        <div className='fornecedor-header'>
          <h1>Fornecedores</h1>
          <button onClick={showDrawer}><FaPlus />Novo Fornecedor</button>
        </div>

        <Drawer 
          title="CADASTRAR NOVO FORNECEDOR"
          placement='right' 
          onClose={closeDrawer} 
          open={isOpen}
          width={600}
        >
          <FornecedorForm />
        </Drawer>
        
        <ListaFornecedores />
      </FornecedorProvider>
    </div>
  )
}
