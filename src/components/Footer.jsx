import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

// ✏️ EDIT YOUR CONTENT HERE
const storeName = 'iconNEEK'
const about = 'Timeless denim and vintage tees, delivered across the world.'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Cart', to: '/carts' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Login', to: '/login' },
]

// Vintage palette
const c = {
  bg: '#4287ef',      // deep forest green
  bgDark: '#162d22',  // bottom bar
  text: '#eef4ea',    // soft cream-white
  muted: '#ffffff',   // sage
  gold: '#f9f9f9',    // mint accent (matches your header)
}

// Icons (inline SVG, no library needed)
const Svg = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const FacebookIcon = () => (
  <Svg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Svg>
)
const InstagramIcon = () => (
  <Svg>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </Svg>
)
const TikTokIcon = () => (
  <Svg><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" /></Svg>
)
const WhatsAppIcon = () => (
  <Svg>
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
  </Svg>
)
const PinIcon = () => (
  <Svg size={15}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Svg>
)
const PhoneIcon = () => (
  <Svg size={15}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Svg>
)
const MailIcon = () => (
  <Svg size={15}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></Svg>
)

const socials = [
  { label: 'Facebook', icon: <FacebookIcon />, url: 'https://facebook.com' },
  { label: 'Instagram', icon: <InstagramIcon />, url: 'https://www.instagram.com/icon_neek/?hl=en://instagram.com' },
  { label: 'TikTok', icon: <TikTokIcon />, url: 'https://tiktok.com' },
  { label: 'WhatsApp', icon: <WhatsAppIcon />, url: 'https://wa.me/977980000000' },
]

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    const list = JSON.parse(localStorage.getItem('subscribers')) || []
    if (list.includes(email.toLowerCase())) {
      Swal.fire({ title: 'Already subscribed', icon: 'info', timer: 2000, showConfirmButton: false })
      return
    }
    list.push(email.toLowerCase())
    localStorage.setItem('subscribers', JSON.stringify(list))
    Swal.fire({ title: 'Subscribed!', icon: 'success', text: 'Thanks for joining us.', timer: 2000, showConfirmButton: false })
    setEmail('')
  }

  const heading = {
    fontFamily: "'Playfair Display', Georgia, serif",
    color: c.gold,
    letterSpacing: '1px',
    fontSize: '1rem',
  }

  return (
    <footer className="mt-5"
      style={{ backgroundColor: c.bg, color: c.text, fontFamily: "'Lora', Georgia, serif", borderTop: `3px solid ${c.gold}` }}>

      <style>{`
        .vf-link { color: ${c.muted}; text-decoration: none; font-size: .9rem; transition: color .3s ease !important; }
        .vf-link:hover { color: ${c.gold}; }
        .vf-social {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid ${c.gold}; color: ${c.gold};
          display: flex; align-items: center; justify-content: center;
          transition: all .3s ease !important;
        }
        .vf-social:hover { background: ${c.gold}; color: ${c.bg}; transform: translateY(-2px); }
        .vf-input { background: transparent; border: 1px solid ${c.gold}; color: ${c.text}; border-radius: 0; font-size: .9rem; }
        .vf-input::placeholder { color: ${c.muted}; }
        .vf-input:focus { background: transparent; color: ${c.text}; border-color: ${c.gold}; box-shadow: none; }
        .vf-btn { background: ${c.gold}; color: ${c.bg}; border: 1px solid ${c.gold}; border-radius: 0; font-weight: 700; font-size: .8rem; letter-spacing: 1px; }
        .vf-btn:hover { background: transparent; color: ${c.gold}; }
      `}</style>

      <div className="container px-4 py-4">
        <div className="row g-4 align-items-start">

          {/* Brand + socials */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-2">
              <img src="/logo.jpg" alt="logo" width="38" height="38" className="rounded-circle me-2"
                style={{ border: `2px solid ${c.gold}`, objectFit: 'cover' }} />
              <h5 className="mb-0" style={{ ...heading, fontSize: '1.15rem', fontWeight: 700 }}>{storeName}</h5>
            </div>
            <p className="small mb-3" style={{ color: c.muted }}>{about}</p>
            <div className="d-flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                  title={s.label} aria-label={s.label} className="vf-social">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links (two columns) */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="mb-2" style={heading}>Explore</h6>
            <div style={{ columnCount: 2, columnGap: '20px' }}>
              {links.map((l) => (
                <div key={l.to} className="mb-1">
                  <Link to={l.to} className="vf-link">{l.label}</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="mb-2" style={heading}>Contact</h6>
            <ul className="list-unstyled small mb-0" style={{ color: c.muted }}>
              <li className="mb-1 d-flex align-items-center gap-2"><span style={{ color: c.gold }}><PinIcon /></span>Kathmandu, Nepal</li>
              <li className="mb-1 d-flex align-items-center gap-2"><span style={{ color: c.gold }}><PhoneIcon /></span>+977 9705443389</li>
              <li className="d-flex align-items-center gap-2"><span style={{ color: c.gold }}><MailIcon /></span>iconneek@gmail.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h6 className="mb-2" style={heading}>Newsletter</h6>
            <form onSubmit={handleSubscribe} className="input-group input-group-sm">
              <input type="email" className="form-control vf-input" placeholder="Your email"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" className="btn vf-btn">JOIN</button>
            </form>
            <p className="small mt-2 mb-0" style={{ color: c.muted }}>Get notiy about  New arrivals &amp; offers by joining with us.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: c.bgDark }}>
        <div className="container px-4 py-2 d-flex flex-column flex-md-row justify-content-between align-items-center"
          style={{ color: c.muted, fontSize: '.8rem' }}>
          <span>© {new Date().getFullYear()} {storeName}. All rights reserved.</span>
          <span style={{ color: c.gold, fontStyle: 'italic' }}>Est. with love in Nepal</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer