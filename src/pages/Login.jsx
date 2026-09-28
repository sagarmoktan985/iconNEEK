import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(formData.email, formData.password)

    if (!result.ok) {
      Swal.fire({ title: 'Login failed', icon: 'error', text: result.message, timer: 2500 })
      return
    }
    Swal.fire({ title: 'Welcome back!', icon: 'success', timer: 1200, showConfirmButton: false })
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="container my-5" style={{ maxWidth: '450px' }}>
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-1">Login</h2>
        <p className="text-center text-muted">Sign in to continue shopping</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email"
              value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter your password"
              value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login