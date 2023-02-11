import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes/Route'
import Navbar from './Components/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes />
        <ToastContainer autoClose={3000}/>
      </Router>
    </div>
  )
}

export default App;
