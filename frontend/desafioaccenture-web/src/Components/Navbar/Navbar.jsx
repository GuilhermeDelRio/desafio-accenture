import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <h2>DesafioAccenture</h2>

        <ul>
          
          <li>
            <Link to='/empresa'>Empresa</Link>
          </li>

          <li>
            <Link to='/fornecedor'>Fornecedor</Link>
          </li>

          <li>
            <Link to='/sobre'>Sobre</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  )
}
