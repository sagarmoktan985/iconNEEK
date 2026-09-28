import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Stars = ({ rating = 0 }) => {
  const full = Math.round(rating)
  return (
    <span className="small" style={{ color: '#f5a623' }}>
      {'★'.repeat(full)}
      <span style={{ color: '#d9d9d9' }}>{'★'.repeat(5 - full)}</span>
      <span className="text-muted ms-1">({Number(rating).toFixed(1)})</span>
    </span>
  )
}

const Wishlist = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('wishlistData')) || [])
  }, [])

  const save = (list) => {
    setItems(list)
    localStorage.setItem('wishlistData', JSON.stringify(list))
    window.dispatchEvent(new Event('wishlistUpdated')) // updates navbar count
  }

  const finalPrice = (item) => {
    const price = Number(item.price)
    const d = Number(item.discount) || 0
    return d > 0 ? price - (price * d) / 100 : price
  }

  const handleRemove = (id) => {
    save(items.filter((i) => i.id !== id))
  }

  const handleClear = async () => {
    const res = await Swal.fire({
      title: 'Clear wishlist?',
      text: 'All saved items will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it',
      confirmButtonColor: '#dc3545',
    })
    if (res.isConfirmed) save([])
  }

  const handleMoveToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cartData')) || []

    if (cart.find((c) => c.id === item.id)) {
      Swal.fire({ title: 'Already in cart', icon: 'info', text: 'This item is already in your cart.', timer: 2000, showConfirmButton: false })
      return
    }

    cart.push({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity || 1,
      discount: item.discount,
    })
    localStorage.setItem('cartData', JSON.stringify(cart))
    save(items.filter((i) => i.id !== item.id))
    Swal.fire({ title: 'Moved to cart!', icon: 'success', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="container my-5 px-4" style={{ minHeight: '60vh' }}>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-end mb-3">
        <div>
          <h2 className="fw-bold mb-1">My Wishlist</h2>
          <p className="text-muted mb-0">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        {items.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" onClick={handleClear}>
            Clear All
          </button>
        )}
      </div>
      <hr />

      {items.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {items.map((item) => {
            const d = Number(item.discount) || 0
            return (
              <div className="col" key={item.id}>
                <div className="card h-100 border-0 shadow-sm position-relative">

                  {d > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">-{d}%</span>
                  )}

                  {/* Remove (X) button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-2 shadow-sm"
                    style={{ width: '32px', height: '32px', lineHeight: 1 }}
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist"
                  >
                    ✕
                  </button>

                  <Link to={`/productview/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-img-top"
                      style={{ height: '260px', objectFit: 'cover' }}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-1">{item.title}</h5>
                    {item.ratings && <div className="mb-2"><Stars rating={item.ratings} /></div>}

                    <div className="d-flex flex-wrap align-items-baseline gap-2 mb-3">
                      <span className="fw-bold fs-5 text-success">${finalPrice(item).toFixed(2)}</span>
                      {d > 0 && (
                        <span className="text-decoration-line-through text-muted small">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="d-grid gap-2 mt-auto">
                      <button className="btn btn-dark btn-sm" onClick={() => handleMoveToCart(item)}>
                        Move to Cart
                      </button>
                      <Link to={`/productview/${item.id}`} className="btn btn-outline-secondary btn-sm">
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-5">
          <div style={{ fontSize: '64px' }}>🤍</div>
          <h3 className="fw-bold mt-3">Your wishlist is empty</h3>
          <p className="text-muted">Save the items you love and find them here later.</p>
          <Link to="/products" className="btn btn-dark px-4">Browse Products</Link>
        </div>
      )}
    </div>
  )
}

export default Wishlist