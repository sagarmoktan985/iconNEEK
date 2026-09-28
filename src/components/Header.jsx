import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [wishCount, setWishCount] = useState(0)

  // Keep the wishlist count up to date
  useEffect(() => {
    const update = () => {
      const list = JSON.parse(localStorage.getItem('wishlistData')) || []
      setWishCount(list.length)
    }
    update()
    window.addEventListener('wishlistUpdated', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('wishlistUpdated', update)
      window.removeEventListener('storage', update)
    }
  }, [location])

  const handleLogout = () => {
    logout()
    Swal.fire({ title: 'Logged out', icon: 'info', timer: 1200, showConfirmButton: false })
    navigate('/')
  }

  return (
    <header className='bg-success-subtle px-5'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/logo.jpg" alt="logo" width={'50px'} className='rounded-circle shadow' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/wishlist">
                  Wishlist
                  {wishCount > 0 && (
                    <span className="badge rounded-pill bg-danger ms-1">{wishCount}</span>
                  )}
                </NavLink>
              </li>
              <li className="nav-item"><NavLink className="nav-link" to="/carts">Carts</NavLink></li>
              {user && (
  <li className="nav-item"><NavLink className="nav-link" to="/orders">My Orders</NavLink></li>
)}
              <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            </ul>

            <div className="buttons d-flex align-items-center">
              {user ? (
                <>
                  <span className="me-2 small">Hi, <strong>{user.fullname.split(' ')[0]}</strong></span>
                  <button onClick={handleLogout} className='btn btn-dark btn-sm'>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/register" className='btn btn-dark btn-sm'>Register</Link>
                  <Link to="/login" className='btn btn-light btn-sm ms-2'>Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header