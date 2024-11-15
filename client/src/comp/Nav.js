import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
    let obj = useContext(Ct)
  return (
    <nav class="navbar bg-body-tertiary">
       <Link to="/">Home</Link> 
       {obj.store.token=="" && <Link to="/login">Login</Link>}
       {obj.store.token=="" && <Link to='/reg'>Registration</Link>}
       {obj.store.role=="admin" && <Link to="/addprod">Add Product</Link>}
       {obj.store.token != "" && <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i></Link>}
       {obj.store.token != "" && <Link to='/logout'>Logout</Link>}
       <div></div>
       <div class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
      {obj.store.token != "" && <div className='profile-icon'>{obj.store.name[0].toUpperCase()}</div>}
    </nav>
  )
}

export default Nav