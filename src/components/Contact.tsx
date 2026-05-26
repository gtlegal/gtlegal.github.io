import type { ReactNode } from 'react'

const FORM_URL = 'https://forms.gle/fBBCTLo2dTGuqRw96'

interface ContactItem {
  icon: string
  title: string
  text: ReactNode
}

const contactItems: ContactItem[] = [
  // { icon: 'fas fa-map-marker-alt', title: 'Dirección', text: <>Carrera 18 #15 36 - local 182<br />Bogotá, Colombia</> },
  { icon: 'fas fa-phone', title: 'Teléfono', text: '+57 323 221 1950' },
  { icon: 'fas fa-envelope', title: 'Email', text: 'info@ghtlegal.com' },
  {
    icon: 'fas fa-clock',
    title: 'Horarios',
    text: <>Lunes a Viernes: 8:00 AM - 6:00 PM<br />Sábados: 9:00 AM - 1:00 PM</>,
  },
]

export default function Contact() {
  return (
    <section id="contacto" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contáctanos</h2>
          <p>Estamos aquí para ayudarte con tus necesidades legales</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            {contactItems.map((item, i) => (
              <div key={i} className="contact-item">
                <div className="contact-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="contact-details">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="contact-form">
              <p>Completa nuestro formulario y nos pondremos en contacto contigo a la brevedad posible.</p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Completar formulario
              </a>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  )
}
