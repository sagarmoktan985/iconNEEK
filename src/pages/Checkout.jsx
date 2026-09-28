import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'
import { calcTotals, unitPrice, FREE_SHIPPING_ABOVE } from '../utils/price'

const Checkout = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [items] = useState(() => JSON.parse(localStorage.getItem('cartData')) || [])

  // Prefill from the registered account
  const account = (JSON.parse(localStorage.getItem('users')) || []).find((u) => u.id === user.id) || {}

  const [form, setForm] = useState({
    fullname: account.fullname || user.fullname || '',
    phone: account.phone || '',
    address: account.address || '',
    city: account.city || '',
    note: '',
  })
  const [payment, setPayment] = useState('COD')

  const totals = calcTotals(items)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const placeOrder = (e) => {
    e.preventDefault()

    const order = {
      id: 'ORD-' + Date.now(),
      userId: user.id,
      items: items.map((i) => ({ ...i, unitPrice: unitPrice(i) })),
      totals,
      delivery: form,
      paymentMethod: payment,
      paymentStatus: 'Pending',
      status: 'Processing',
      date: new Date().toLocaleString(),
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || []
    orders.unshift(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.removeItem('cartData')

    Swal.fire({ title: 'Order placed!', icon: 'success', timer: 1200, showConfirmButton: false })
    navigate(`/order-success/${order.id}`, { replace: true })
  }

  if (items.length === 0) {
    return (
      <div className="container text-center my-5 py-5">
        <div style={{ fontSize: '64px' }}>🛒</div>
        <h3 className="fw-bold mt-3">Your cart is empty</h3>
        <p className="text-muted">Add some products before checking out.</p>
        <Link to="/products" className="btn btn-dark px-4">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="container my-5 px-4">
      <h2 className="fw-bold mb-1">Checkout</h2>
      <p className="text-muted">Complete your details to place the order.</p>
      <hr />

      <form onSubmit={placeOrder}>
        <div className="row g-4">

          {/* Left: delivery + payment */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3">1. Delivery Details</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input name="fullname" className="form-control" value={form.fullname} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input name="phone" type="tel" className="form-control" value={form.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <textarea name="address" rows="2" className="form-control" value={form.address} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <select name="city" className="form-select" value={form.city} onChange={handleChange} required>
                  <option value="">Select City</option>
                  {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar', 'Chitwan'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Order Note (optional)</label>
                <input name="note" className="form-control" placeholder="e.g. Call before delivery"
                  value={form.note} onChange={handleChange} />
              </div>
            </div>

            <div className="card border-0 shadow-sm p-4">
              <h5 className="fw-bold mb-3">2. Payment Method</h5>

              <label className={`border rounded p-3 mb-2 d-flex align-items-center ${payment === 'COD' ? 'border-success bg-success-subtle' : ''}`} style={{ cursor: 'pointer' }}>
                <input type="radio" className="form-check-input me-3 mt-0" checked={payment === 'COD'} onChange={() => setPayment('COD')} />
                <div>
                  <div className="fw-bold">Cash on Delivery</div>
                  <div className="small text-muted">Pay in cash when your order arrives.</div>
                </div>
              </label>

              {['Khalti', 'eSewa'].map((name) => (
                <label key={name} className="border rounded p-3 mb-2 d-flex align-items-center bg-light" style={{ opacity: 0.6 }}>
                  <input type="radio" className="form-check-input me-3 mt-0" disabled />
                  <div>
                    <div className="fw-bold">{name} <span className="badge text-bg-secondary ms-1">Coming soon</span></div>
                    <div className="small text-muted">Online payment will be available soon.</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right: summary */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm p-4" style={{ position: 'sticky', top: '20px' }}>
              <h5 className="fw-bold mb-3">Order Summary</h5>

              {items.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3">
                  <img src={item.image} alt={item.title} width="56" height="56"
                    className="rounded me-3" style={{ objectFit: 'cover' }} />
                  <div className="flex-grow-1">
                    <div className="fw-semibold small">{item.title}</div>
                    <div className="text-muted small">Qty: {item.quantity}</div>
                  </div>
                  <div className="fw-bold small">${(unitPrice(item) * item.quantity).toFixed(2)}</div>
                </div>
              ))}

              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.savings > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>You save</span>
                  <span>-${totals.savings.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</span>
              </div>
              {totals.shipping > 0 && (
                <div className="small text-muted mb-2">Free shipping on orders over ${FREE_SHIPPING_ABOVE}</div>
              )}
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                <span>Total</span>
                <span className="text-success">${totals.total.toFixed(2)}</span>
              </div>

              <button type="submit" className="btn btn-dark w-100 py-2">Place Order</button>
              <Link to="/carts" className="btn btn-link w-100 mt-1">← Back to cart</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout