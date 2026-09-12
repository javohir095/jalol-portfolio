import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Blog',    href: '/blog' },
  { label: 'Videolar', href: '/videos' },
  { label: 'Resume',  href: '/resume' },
  { label: 'Haqimda', href: '/about' },
  { label: 'Kanal',   href: 'https://t.me/dasturlash_hayot', external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-4xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-lg text-ink-950 tracking-tight hover:text-accent transition-colors"
        >
          JJ<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`nav-btn ${location.pathname === link.href ? 'nav-btn-active' : ''}`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-ink-100 transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-ink-700 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink-700 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-ink-100 px-5 pb-4 flex flex-col gap-1 shadow-lg">
          {navLinks.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-btn"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`mobile-nav-btn ${location.pathname === link.href ? 'text-accent font-medium' : ''}`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}

      <style>{`
        .nav-btn {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4a4a47;
          transition: all 0.15s;
        }
        .nav-btn:hover { background: #eeeeed; color: #1c1c1b; }
        .nav-btn-active { color: #2563eb !important; background: #dbeafe !important; }
        .mobile-nav-btn {
          display: block;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 0.95rem;
          color: #4a4a47;
        }
        .mobile-nav-btn:hover { background: #f7f7f6; }
      `}</style>
    </header>
  )
}
