import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: '', email: '', phone: '', password: '',
    confirmPassword: '', address: '', city: '', gender: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password.length < 6) {
      Swal.fire({ title: 'Weak password', icon: 'warning', text: 'Password must be at least 6 characters.' })
      return
    }
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({ title: 'Error!', icon: 'error', text: 'Passwords do not match!' })
      return
    }

    const result = await register(formData)
    if (!result.ok) {
      Swal.fire({ title: 'Error!', icon: 'error', text: result.message })
      return
    }

    await Swal.fire({ title: 'Success!', icon: 'success', text: 'Account created. Please login.', timer: 2000 })
    navigate('/login')
  }

  return (
    <div className="container my-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-1">Create Account</h2>
        <p className="text-center text-muted">Register to start shopping</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullname" className="form-control" placeholder="Enter your full name"
              value={formData.fullname} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email"
              value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="form-control" placeholder="Enter your phone number"
              value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Create password"
              value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm password"
              value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Gender</label>
            {['Male', 'Female', 'Other'].map((g) => (
              <div className="form-check form-check-inline" key={g}>
                <input className="form-check-input" type="radio" name="gender" id={`gender-${g}`}
                  value={g} checked={formData.gender === g} onChange={handleChange} required />
                <label className="form-check-label" htmlFor={`gender-${g}`}>{g}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea name="address" className="form-control" rows="3" placeholder="Enter your address"
              value={formData.address} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <select name="city" className="form-select" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar', 'Chitwan'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-dark w-100">Register</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register