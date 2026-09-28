import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Homepage from './pages/Homepage'
import Counter from './hooks/Counter'
import Products from './pages/Products'
import Productview from './pages/Productview'
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import Cart from './pages/Cart'
import { AuthProvider } from './context/AuthContext'
import Contact from './pages/Contact'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import OrderSuccess from './pages/OrderSuccess'
import ProtectedRoute from './components/ProtectedRoute'


const MyRoute = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path='/products' element={<Products />} />
            <Route path='/productview/:product_id' element={<Productview />} />
            <Route path='/hooks' element={<Counter />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/carts' element={<Cart />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
<Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
<Route path='/order-success/:order_id' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
            
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default MyRoute