import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ data }) => {
  const price = Number(data.price)
  const discount = Number(data.discountPercentage) || 0
  const finalPrice = discount > 0 ? price - (price * discount) / 100 : price

  const title = data.title.length > 25 ? data.title.slice(0, 25) + '..' : data.title

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0 position-relative">

        {/* Discount badge */}
        {discount > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            -{discount}%
          </span>
        )}

        {/* Same image height for every card */}
        <img
          src={data.thumbnail}
          className="card-img-top"
          alt={data.title}
          style={{ height: '260px', objectFit: 'cover' }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title" title={data.title}>{title}</h5>

          {/* Price row */}
          <div className="d-flex flex-wrap align-items-baseline gap-2 mb-3">
            <span className="fw-bold fs-5 text-success">
              ${finalPrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-decoration-line-through text-muted small">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Button stays at the bottom of every card */}
          <Link
            to={`/productview/${data.id}`}
            className="btn bg-danger-subtle text-danger btn-sm mt-auto align-self-start"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card