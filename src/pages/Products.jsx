import React, { useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            title: "Men's Wide Leg",
            price: 129.99,
            thumbnail: "/wideleg.jpg"
        },
        {
            id: 2,
            title: "Indigo Raw Denim",
            price: 119.99,
            thumbnail: "/indigo.jpg"
        },
        {
            id: 3,
            title: "Straight Fit",
            price: 99.99,
            thumbnail: "/straight.jpg"
        },
        {
            id: 4,
            title: "Bootcut Jeans",
            price: 149.99,
            thumbnail: "/bootcut.jpg"
        },
        {
            id: 5,
            title: "Vintage Tshirt",
            price: 9.99,
            thumbnail: "/vintage.jpg"
        },
        {
            id: 6,
            title: "Yellow Vintage Tshirt",
            price: 19.99,
            thumbnail: "/yellow.jpg"
        },
        {
            id: 7,
            title: "Blue Stripe Tshirt",
            price: 14.99,
            thumbnail: "/bluestripe.jpg"
        },
        {
            id: 8,
            title: "Muscle fit Tshirt",
            price: 8.99,
            thumbnail: "/muscle.jpg"
        }
        // Add more products...
    ]);
  return (
    <>
      <div className="my-5 px-5" id="trending_products">
          <h2>All Products</h2>
          <hr />
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

            {
              products.map((item)=>(
                <Card data={item} />
              ))
            }

          </div>

        </div>
    </>
  )
}

export default Products
