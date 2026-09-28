import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { calcTotals } from '../utils/price'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cartData"))
        if (data) {
            setCartItems(data)
        }
    }, [])

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px 20px',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
    };

    const titleStyle = {
        fontSize: '32px',
        fontWeight: '700',
        marginBottom: '30px',
        color: '#1a1a1a'
    };

    const cartGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px'
    };

    const cartCardStyle = {
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer'
    };

    const imageContainerStyle = {
        width: '100%',
        height: '250px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        padding: '10px'
    };

    const cardInfoStyle = {
        padding: '20px'
    };

    const productNameStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1a1a1a',
        margin: '0 0 10px 0'
    };

    const priceStyle = {
        fontSize: '18px',
        fontWeight: '700',
        color: '#28a745',
        margin: '0 0 10px 0'
    };

    const quantityStyle = {
        fontSize: '14px',
        color: '#666',
        margin: '0 0 15px 0'
    };

    const removeButtonStyle = {
        width: '100%',
        padding: '10px',
        border: 'none',
        backgroundColor: '#dc3545',
        color: 'white',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background 0.3s'
    };

    const emptyStyle = {
        textAlign: 'center',
        padding: '60px 20px'
    };

    const emptyTitleStyle = {
        fontSize: '48px',
        fontWeight: '700',
        color: '#ccc',
        marginBottom: '20px'
    };

    const emptyTextStyle = {
        fontSize: '18px',
        color: '#999',
        marginBottom: '30px'
    };

    const shopButtonStyle = {
        padding: '12px 30px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'background 0.3s'
    };

    const handleRemoveItem = (itemId) => {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem("cartData", JSON.stringify(updatedCart));
    };

    const totals = calcTotals(cartItems)

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Shopping Cart</h1>

            {cartItems.length > 0 ? (
                <>
                    <div style={cartGridStyle}>
                        {cartItems.map((item) => (
                            <div key={item.id} style={cartCardStyle}>
                                {/* Product Image */}
                                <div style={imageContainerStyle}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={imageStyle}
                                    />
                                </div>

                                {/* Product Info */}
                                <div style={cardInfoStyle}>
                                    <h3 style={productNameStyle}>{item.title}</h3>

                                    <p style={priceStyle}>
                                        ${item.price}
                                    </p>

                                    <p style={quantityStyle}>
                                        <strong>Qty:</strong> {item.quantity}
                                    </p>

                                    {item.discount && (
                                        <p style={{ fontSize: '12px', color: '#ff6b6b', margin: '0 0 15px 0' }}>
                                            Discount: {item.discount}%
                                        </p>
                                    )}

                                    <button
                                        style={removeButtonStyle}
                                        onClick={() => handleRemoveItem(item.id)}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                                    >
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order summary */}
                    <div style={{ maxWidth: '400px', marginLeft: 'auto', marginTop: '30px', backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ marginBottom: '15px' }}>Order Summary</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span>
                        </div>
                        {totals.savings > 0 && (
                            <div className="d-flex justify-content-between mb-2 text-success">
                                <span>You save</span><span>-${totals.savings.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-between mb-2">
                            <span>Shipping</span><span>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Total</span><span>${totals.total.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className="btn btn-dark w-100 mt-3">Proceed to Checkout</Link>
                    </div>
                </>
            ) : (
                <div style={emptyStyle}>
                    <div style={emptyTitleStyle}>🛒</div>
                    <h2 style={emptyTextStyle}>Your cart is empty</h2>
                    <p style={{ fontSize: '16px', color: '#999', marginBottom: '30px' }}>
                        Add some products to get started!
                    </p>
                    <Link to="/products" style={shopButtonStyle}>
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Cart