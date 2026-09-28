import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Productview = () => {
    const params = useParams()
    let pid = params.product_id

    const allProducts = [
        {
            id: 1,
            title: "Men's Wide Leg",
            price: 129.99,
            thumbnail: "/wideleg.jpg",
            description: "Classic wide leg jeans for men",
            category: "Jeans",
            stock: 15,
            discountPercentage: 10,
            ratings: 4.5
        },
        {
            id: 2,
            title: "Indigo Raw Denim",
            price: 119.99,
            thumbnail: "/indigo.jpg",
            description: "Premium indigo raw denim",
            category: "Jeans",
            stock: 20,
            discountPercentage: 5,
            ratings: 4.7
        },
        {
            id: 3,
            title: "Straight Fit",
            price: 99.99,
            thumbnail: "/straight.jpg",
            description: "Comfortable straight fit jeans",
            category: "Jeans",
            stock: 25,
            discountPercentage: 15,
            ratings: 4.3
        },
        {
            id: 4,
            title: "Bootcut Jeans",
            price: 149.99,
            thumbnail: "/bootcut.jpg",
            description: "Stylish bootcut design",
            category: "Jeans",
            stock: 10,
            discountPercentage: 20,
            ratings: 4.6
        },
        {
            id: 5,
            title: "Vintage Tshirt",
            price: 9.99,
            thumbnail: "/vintage.jpg",
            description: "Classic vintage style t-shirt",
            category: "T-Shirts",
            stock: 18,
            discountPercentage: 8,
            ratings: 4.4
        },
        {
            id: 6,
            title: "Yellow Vintage Tshirt",
            price: 19.99,
            thumbnail: "/yellow.jpg",
            description: "Bright yellow vintage inspired t-shirt",
            category: "T-Shirts",
            stock: 12,
            discountPercentage: 12,
            ratings: 4.3
        },
        {
            id: 7,
            title: "Blue Stripe Tshirt",
            price: 14.99,
            thumbnail: "/bluestripe.jpg",
            description: "Comfortable blue stripe design t-shirt",
            category: "T-Shirts",
            stock: 22,
            discountPercentage: 10,
            ratings: 4.5
        },
        {
            id: 8,
            title: "Muscle fit Tshirt",
            price: 8.99,
            thumbnail: "/muscle.jpg",
            description: "Fitted muscle style t-shirt",
            category: "T-Shirts",
            stock: 16,
            discountPercentage: 5,
            ratings: 4.2
        }
    ];

    const [product, setProduct] = useState({})
    const [qty, setQty] = useState(1)

    useEffect(() => {
        const foundProduct = allProducts.find((item) => item.id === parseInt(pid));
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [pid])

    const decrease = () => {
        if (qty > 1) {
            setQty(qty - 1)
        }
        else {
            Swal.fire({
                title: "Information!",
                icon: "info",
                text: "Count Must be at least 1.",
                draggable: true,
                timer: 3000
            });
        }
    }

const addtocart = (product_id) => {
    const cartItems = JSON.parse(localStorage.getItem("cartData")) || []
    const existingItem = cartItems.find((item) => item.id === product_id)

    if (existingItem) {
        // Already in cart: add the selected quantity to it
        existingItem.quantity = Number(existingItem.quantity) + qty
        localStorage.setItem("cartData", JSON.stringify(cartItems))
        Swal.fire({
            title: "Cart updated!",
            icon: "success",
            text: `Quantity increased to ${existingItem.quantity}.`,
            draggable: true,
            timer: 2000
        });
    }
    else {
        cartItems.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail,
            quantity: qty,
            discount: product.discountPercentage
        })
        localStorage.setItem("cartData", JSON.stringify(cartItems))
        Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Item added to the cart.",
            draggable: true,
            timer: 2000
        });
    }
}

    const addtowishlist = (product_id) => {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlistData')) || []
        const productData = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail,
            quantity: qty,
            discount: product.discountPercentage,
            ratings: product.ratings
        }
        const existingItem = wishlistItems.find((item) => item.id === product_id)
        if (existingItem) {
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: "Items already exist in wishlist.",
                draggable: true,
                timer: 2000
            });
        }
        else {
            wishlistItems.push(productData)
            localStorage.setItem('wishlistData', JSON.stringify(wishlistItems))
            window.dispatchEvent(new Event('wishlistUpdated'))
            Swal.fire({
                title: "Success!",
                icon: "success",
                text: "Items added to the Wishlist.",
                draggable: true,
                timer: 2000
            });
        }
    }

    const originalPrice = Number(product.price) || 0
    const discount = Number(product.discountPercentage) || 0
    const finalPrice = discount > 0 ? originalPrice - (originalPrice * discount) / 100 : originalPrice

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px 20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    };

    const breadcrumbStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '30px',
        fontSize: '14px',
        color: '#666'
    };

    const linkStyle = {
        color: '#007bff',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    const productDetailsStyle = {
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
        gap: '40px',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
    };

    const imageContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '20px',
        minHeight: '500px'
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        borderRadius: '8px'
    };

    const infoStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
    };

    const titleStyle = {
        fontSize: '36px',
        fontWeight: '700',
        color: '#1a1a1a',
        margin: '0',
        lineHeight: '1.2'
    };

    const categoryStyle = {
        fontSize: '14px',
        color: '#888',
        margin: '0',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    const priceBoxStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#f0f8ff',
        borderLeft: '4px solid #28a745',
        borderRadius: '6px'
    };

    const priceLabelStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        margin: '0'
    };

    const priceValueStyle = {
        fontSize: '28px',
        fontWeight: '700',
        color: '#28a745'
    };

    const stockBadgeStyle = {
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: product.stock > 10 ? '#d4edda' : '#fff3cd',
        color: product.stock > 10 ? '#155724' : '#856404',
        border: product.stock > 10 ? '1px solid #c3e6cb' : '1px solid #ffeeba',
        width: 'fit-content'
    };

    const quantityLabelStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        margin: '0'
    };

    const quantityControlsStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        width: 'fit-content',
        border: '2px solid #ddd',
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: 'white'
    };

    const qtyBtnStyle = {
        width: '45px',
        height: '45px',
        border: 'none',
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s'
    };

    const qtyInputStyle = {
        width: '60px',
        height: '45px',
        border: 'none',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: '600',
        backgroundColor: 'white'
    };

    const actionButtonsStyle = {
        display: 'flex',
        gap: '15px',
        marginTop: '10px'
    };

    const btnAddCartStyle = {
        flex: '1',
        padding: '14px 24px',
        border: '2px solid #FFA500',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        backgroundColor: '#FFA500',
        color: 'white',
        transition: 'all 0.2s ease',
        boxShadow: 'none'
    };

    const btnAddWishlistStyle = {
        flex: '1',
        padding: '14px 24px',
        border: '2px solid #27ae60',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        backgroundColor: '#27ae60',
        color: 'white',
        transition: 'all 0.2s ease',
        boxShadow: 'none'
    };

    const descriptionBoxStyle = {
        paddingTop: '25px',
        borderTop: '2px solid #eee'
    };

    const descriptionTitleStyle = {
        fontSize: '18px',
        fontWeight: '700',
        color: '#1a1a1a',
        margin: '0 0 12px 0'
    };

    const descriptionTextStyle = {
        fontSize: '15px',
        color: '#555',
        lineHeight: '1.6',
        margin: '0'
    };

    return (
        <div style={containerStyle}>
            {/* Breadcrumb */}
            <div style={breadcrumbStyle}>
                <Link to="/" style={linkStyle}>Home</Link>
                <span> / </span>
                <Link to="/products" style={linkStyle}>Products</Link>
                <span> / </span>
                <span style={{ color: '#333', fontWeight: '600' }}>{product.category}</span>
            </div>

            {/* Product Details */}
            <div style={productDetailsStyle}>
                {/* Image Section */}
                <div style={imageContainerStyle}>
                    <img src={product.thumbnail} alt={product.title} style={imageStyle} />
                </div>

                {/* Info Section */}
                <div style={infoStyle}>
                    <h1 style={titleStyle}>{product.title}</h1>

                    <p style={categoryStyle}>{product.category}</p>

                    {/* Price */}
                    <div style={priceBoxStyle}>
                        <h3 style={priceLabelStyle}>Price:</h3>
                        <span style={priceValueStyle}>${finalPrice.toFixed(2)}</span>
                        {discount > 0 && (
                            <>
                                <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '18px' }}>
                                    ${originalPrice.toFixed(2)}
                                </span>
                                <span style={{ backgroundColor: '#dc3545', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
                                    -{discount}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div>
                        <span style={stockBadgeStyle}>
                            {product.stock > 10 ? '✓ In Stock' : '⚠ Limited Stock'}
                        </span>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label style={quantityLabelStyle}>Quantity:</label>
                        <div style={quantityControlsStyle}>
                            <button style={qtyBtnStyle} onClick={decrease}>−</button>
                            <input type="text" style={qtyInputStyle} value={qty} readOnly />
                            <button style={qtyBtnStyle} onClick={() => setQty(qty + 1)}>+</button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={actionButtonsStyle}>
                        <button 
                            style={btnAddCartStyle} 
                            onClick={() => addtocart(product.id)}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#ff9500'
                                e.target.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#FFA500'
                                e.target.style.transform = 'translateY(0)'
                            }}
                        >
                             Add to Cart
                        </button>
                        <button 
                            style={btnAddWishlistStyle} 
                            onClick={() => addtowishlist(product.id)}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#229954'
                                e.target.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#27ae60'
                                e.target.style.transform = 'translateY(0)'
                            }}
                        >
                             Add to Wishlist
                        </button>
                    </div>

                    {/* Description */}
                    <div style={descriptionBoxStyle}>
                        <h4 style={descriptionTitleStyle}>Description</h4>
                        <p style={descriptionTextStyle}>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productview
