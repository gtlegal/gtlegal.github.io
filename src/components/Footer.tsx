import type { MouseEvent } from 'react'

function scrollToSection(e: MouseEvent<HTMLAnchorElement>, href: string): void {
  e.preventDefault()
  const target = document.querySelector(href)
  if (!target) return
  const headerHeight = (document.querySelector('.header') as HTMLElement | null)?.offsetHeight || 80
  window.scrollTo({ top: (target as HTMLElement).offsetTop - headerHeight, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GHT Estudio Legal</h3>
            <p>
              Firma de abogados especializada en brindar soluciones jurídicas integrales con
              dedicación y profesionalismo en el mercado colombiano.
            </p>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/company/ght-estudio-legal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/ghtlegal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Servicios</h3>
            <ul>
              <li><a href="#servicios" onClick={(e) => scrollToSection(e, '#servicios')}>Derecho Civil</a></li>
              <li><a href="#servicios" onClick={(e) => scrollToSection(e, '#servicios')}>Derecho Laboral</a></li>
              <li><a href="#servicios" onClick={(e) => scrollToSection(e, '#servicios')}>Derecho Administrativo</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Enlaces</h3>
            <ul>
              <li><a href="#inicio" onClick={(e) => scrollToSection(e, '#inicio')}>Inicio</a></li>
              <li><a href="#equipo" onClick={(e) => scrollToSection(e, '#equipo')}>Nuestro Equipo</a></li>
              <li><a href="#experiencia" onClick={(e) => scrollToSection(e, '#experiencia')}>Experiencia</a></li>
              <li><a href="#contacto" onClick={(e) => scrollToSection(e, '#contacto')}>Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contacto</h3>
            <div className="footer-contact">
              {/* <p><i className="fas fa-map-marker-alt"></i>Carrera 18 #15 36 - local 182, Bogotá, Colombia</p> */}
              <p><i className="fas fa-phone"></i>+57 323 221 1950</p>
              <p><i className="fas fa-envelope"></i>info@ghtlegal.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GHT Estudio Legal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
