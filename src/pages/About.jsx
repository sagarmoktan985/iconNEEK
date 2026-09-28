import React from 'react'
import { Link } from 'react-router-dom'

// ✏️ EDIT YOUR CONTENT HERE
const storeName = 'iconNEEK'
const tagline = 'Quality denim and t-shirts, delivered across Nepal.'

const story = [
  'We started with a simple idea: great clothing should be affordable and easy to buy online.',
  'Every product in our collection is chosen for quality, comfort and style. From classic jeans to vintage t-shirts, we make sure you get value for every rupee.',
]

const stats = [
  { number: '5,000+', label: 'Happy Customers' },
  { number: '200+', label: 'Products' },
  { number: '50+', label: 'Cities Delivered' },
  { number: '4.7★', label: 'Average Rating' },
]

const features = [
  { icon: '🚚', title: 'Fast Delivery', text: 'Quick and reliable shipping to your doorstep.' },
  { icon: '✅', title: 'Top Quality', text: 'Carefully selected fabrics and finishing.' },
  { icon: '💰', title: 'Best Prices', text: 'Premium style without the premium price tag.' },
  { icon: '🔄', title: 'Easy Returns', text: 'Not the right fit? Return it hassle-free.' },
]

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container py-4">
          <h1 className="display-4 fw-bold">About {storeName}</h1>
          <p className="lead mb-0">{tagline}</p>
        </div>
      </section>

      {/* Story */}
      <section className="container my-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <img src="/b1.jpg" alt="Our store" className="img-fluid rounded-4 shadow" />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Our Story</h2>
            {story.map((para, i) => (
              <p key={i} className="text-muted">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-success-subtle py-5">
        <div className="container">
          <div className="row text-center g-4">
            {stats.map((s) => (
              <div className="col-6 col-md-3" key={s.label}>
                <h2 className="fw-bold text-success">{s.number}</h2>
                <p className="mb-0">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">Why Choose Us</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {features.map((f) => (
            <div className="col" key={f.title}>
              <div className="card h-100 text-center shadow-sm border-0 p-3">
                <div className="fs-1">{f.icon}</div>
                <div className="card-body">
                  <h5 className="card-title">{f.title}</h5>
                  <p className="card-text text-muted">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="text-center my-5 pb-5">
        <h3 className="fw-bold">Ready to find your style?</h3>
        <Link to="/products" className="btn btn-dark mt-2">Shop Now</Link>
      </section>
    </>
  )
}

export default About