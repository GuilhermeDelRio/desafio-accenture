import { Route, Routes} from 'react-router-dom'

// Pages
import Empresa from '../Pages/Empresa/Empresa'
import Fornecedor from '../Pages/Fornecedor/Fornecedor'

const Rotas = () => {
  return(
    <Routes>
      <Route path='/' element={ <Empresa/> }/>
      <Route path='/empresa' element={ <Empresa/> }/>
      <Route path="/fornecedor" element={<Fornecedor />} />
    </Routes>
  )
}

export default Rotas