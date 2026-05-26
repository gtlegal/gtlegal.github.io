import { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#contacto', label: 'Contacto' },
]

function scrollToSection(href: string): void {
  const target = document.querySelector(href)
  if (!target) return
  const headerHeight = (document.querySelector('.header') as HTMLElement | null)?.offsetHeight || 80
  window.scrollTo({ top: (target as HTMLElement).offsetTop - headerHeight, behavior: 'smooth' })
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const location = useLocation()
  const navigate = useNavigate()

  const isOnHome = location.pathname === '/'
  const isOnBlog = location.pathname.startsWith('/blog')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      if (!isOnHome) return
      const sections = navLinks.map((l) => l.href.slice(1))
      const scrollPos = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOnHome])

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault()
    setIsOpen(false)
    if (isOnHome) {
      scrollToSection(href)
    } else {
      navigate('/')
      setTimeout(() => scrollToSection(href), 100)
    }
  }

  return (
    <header className={`header${isScrolled ? ' scrolled' : ''}`}>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')}>
              <img src="/img/logo.png" alt="Logo GHT Estudio Legal" className="logo-image" />
              <h1>GHT Estudio Legal</h1>
            </a>
          </div>

          <ul className={`nav-menu${isOpen ? ' active' : ''}`}>
            {navLinks.map(({ href, label }) => (
              <li key={href} className="nav-item">
                <a
                  href={href}
                  className={`nav-link${isOnHome && activeSection === href.slice(1) ? ' active' : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <Link
                to="/blog"
                className={`nav-link${isOnBlog ? ' active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </li>
          </ul>

          <button
            className={`hamburger${isOpen ? ' active' : ''}`}
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Abrir menú"
            aria-expanded={isOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </nav>
    </header>
  )
}
