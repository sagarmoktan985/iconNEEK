import React, { useState } from 'react'
import Swal from 'sweetalert2'

// ✏️ EDIT YOUR CONTACT DETAILS HERE
const contactInfo = [
  { icon: '📍', title: 'Address', text: 'Kathmandu, Nepal' },
  { icon: '📞', title: 'Phone', text: '+977 9705443389' },
  { icon: '✉️', title: 'Email', text: 'iconneek@gmail.com' },
  { icon: '🕐', title: 'Opening Hours', text: '24 Hours. Online Based' },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Saves the message in the browser.
    // Later you can replace this with an API call or an email service.
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || []
    messages.push({ ...formData, id: Date.now(), date: new Date().toLocaleString() })
    localStorage.setItem('contactMessages', JSON.stringify(messages))

    Swal.fire({
      title: 'Message sent!',
      icon: 'success',
      text: 'Thank you for contacting us. We will reply soon.',
      timer: 2500
    })
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container py-3">
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="lead mb-0">Questions, feedback or orders? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="container my-5">
        <div className="row g-5">
          {/* Contact details */}
          <div className="col-lg-5">
            <h3 className="fw-bold mb-4">Get in touch</h3>
            {contactInfo.map((item) => (
              <div className="d-flex align-items-start mb-4" key={item.title}>
                <div className="fs-2 me-3">{item.icon}</div>
                <div>
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <p className="text-muted mb-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0 p-4">
              <h3 className="fw-bold mb-3">Send us a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Your Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter your name"
                      value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter your email"
                      value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input type="text" name="subject" className="form-control" placeholder="What is this about?"
                    value={formData.subject} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-control" rows="5" placeholder="Write your message here..."
                    value={formData.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-dark w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact