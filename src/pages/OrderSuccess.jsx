import React from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderSuccess = () => {
  const { order_id } = useParams()
  const order = (JSON.parse(localStorage.getItem('orders')) || []).find((o) => o.id === order_id)

  return (
    <div className="container text-center my-5 py-4" style={{ maxWidth: '560px' }}>
      <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center"
        style={{ width: '80px', height: '80px', fontSize: '40px' }}>✓</div>
      <h2 className="fw-bold mt-3">Thank you for your order!</h2>
      <p className="text-muted">Your order has been placed successfully.</p>

      {order && (
        <div className="card border-0 shadow-sm p-4 text-start my-4">
          <div className="d-flex justify-content-between mb-2"><span className="text-muted">Order ID</span><strong>{order.id}</strong></div>
          <div className="d-flex justify-content-between mb-2"><span className="text-muted">Payment</span><strong>{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</strong></div>
          <div className="d-flex justify-content-between mb-2"><span className="text-muted">Deliver to</span><strong className="text-end">{order.delivery.city}</strong></div>
          <div className="d-flex justify-content-between"><span className="text-muted">Total</span><strong className="text-success">${order.totals.total.toFixed(2)}</strong></div>
        </div>
      )}

      <Link to="/orders" className="btn btn-dark me-2">View My Orders</Link>
      <Link to="/products" className="btn btn-outline-dark">Continue Shopping</Link>
    </div>
  )
}

export default OrderSuccess