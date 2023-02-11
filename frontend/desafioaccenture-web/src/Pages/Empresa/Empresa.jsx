import { useState } from 'react'
import './empresa.css'

import { FaPlus } from 'react-icons/fa'
import { Drawer } from 'antd'

import ListaEmpresa from '../../Components/ListaEmpresas/ListaEmpresa';
import EmpresaForm from '../../Components/EmpresaForm/EmpresaForm';

import EmpresaProvider from '../../Contexts/empresaContext';


export default function Empresa() {

  const [isOpen, setIsOpen] = useState(false)

  const showDrawer = () => {
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <EmpresaProvider>
        <div className='empresa-header'>
          <h1>Empresas</h1>
          <button onClick={showDrawer}><FaPlus />Nova empresa</button>
        </div>

        <Drawer 
          title="CADASTRAR NOVA EMPRESA"
          placement='right' 
          onClose={closeDrawer} 
          open={isOpen}
          width={600}
        >
          <EmpresaForm />
        </Drawer>
        
        <ListaEmpresa />
      </EmpresaProvider>
    </div>
  )
}
