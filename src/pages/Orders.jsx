import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const statusColor = {
  Processing: 'warning',
  Shipped: 'info',
  Delivered: 'success',
  Cancelled: 'danger',
}

const Orders = () => {
  const { user } = useAuth()
  const orders = (JSON.parse(localStorage.getItem('orders')) || []).filter((o) => o.userId === user.id)

  return (
    <div className="container my-5 px-4" style={{ minHeight: '60vh' }}>
      <h2 className="fw-bold mb-1">My Orders</h2>
      <p className="text-muted">{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
      <hr />

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '64px' }}>📦</div>
          <h3 className="fw-bold mt-3">No orders yet</h3>
          <p className="text-muted">When you place an order, it will show up here.</p>
          <Link to="/products" className="btn btn-dark px-4">Start Shopping</Link>
        </div>
      ) : (
        orders.map((order) => (
          <div className="card border-0 shadow-sm mb-4" key={order.id}>
            <div className="card-header bg-white d-flex flex-wrap justify-content-between align-items-center py-3">
              <div>
                <div className="fw-bold">{order.id}</div>
                <div className="small text-muted">{order.date}</div>
              </div>
              <span className={`badge text-bg-${statusColor[order.status] || 'secondary'} px-3 py-2`}>{order.status}</span>
            </div>

            <div className="card-body">
              {order.items.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3">
                  <img src={item.image} alt={item.title} width="56" height="56" className="rounded me-3" style={{ objectFit: 'cover' }} />
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{item.title}</div>
                    <div className="small text-muted">Qty: {item.quantity} × ${Number(item.unitPrice).toFixed(2)}</div>
                  </div>
                  <div className="fw-bold">${(item.unitPrice * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <hr />
              <div className="d-flex flex-wrap justify-content-between">
                <div className="small text-muted">
                  {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod} · {order.delivery.city}
                </div>
                <div className="fw-bold">Total: <span className="text-success">${order.totals.total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Orders