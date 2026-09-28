import React, { useState } from 'react'
import Card from '../components/Card'

const Homepage = () => {
  const [products] = useState([
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
    
    
  ])

  return (
    <>
      {/* Banner */}
      <div className="banner" id="banner">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="b1.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="b2.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="b3.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* End of Banner */}

      {/* Products */}
      <div className="my-5 px-5" id="trending_products">
        <h2>Trending Products</h2>
        <hr />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {
            products.slice(0, 4).map((item) => (
              <Card data={item} key={item.id} />
            ))
          }
        </div>
      </div>
      {/* End of Products */}
    </>
  )
}

export default Homepage
