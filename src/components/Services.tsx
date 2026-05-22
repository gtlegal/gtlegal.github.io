import { useEffect, useRef } from 'react'

interface Service {
  icon: string
  title: string
  description: string
  items: string[]
}

const services: Service[] = [
  {
    icon: 'fas fa-gavel',
    title: 'División de Derecho Administrativo',
    description:
      'Representamos a nuestros clientes en procesos de licitación, contratación pública, y ante controversias surgidas de actos administrativos.',
    items: [
      'Contratación Estatal',
      'Derecho Laboral Administrativo',
      'Derecho Urbano y Ambiental',
      'Responsabilidad Extracontractual del Estado',
      'Derechos Fundamentales y Acciones Constitucionales',
    ],
  },
  {
    icon: 'fas fa-users',
    title: 'División de Derecho Civil y de Familia',
    description:
      'Nos enfocamos en garantizar la seguridad jurídica de los bienes y ofrecer soluciones justas a los asuntos familiares.',
    items: [
      'Derecho de las Obligaciones',
      'Derecho Contractual',
      'Derecho Sucesoral',
      'Responsabilidad Civil',
      'Derecho de Familia',
    ],
  },
  {
    icon: 'fas fa-building',
    title: 'División de Derecho de los Negocios',
    description:
      'Blindamos legalmente la operación, la expansión y la gestión del talento de su compañía, asegurando que cada decisión comercial esté respaldada por una estructura legal sólida.',
    items: [
      'Derecho Corporativo',
      'Derecho Comercial',
      'Derecho Laboral',
      'Propiedad Intelectual',
      'Derecho Contractual',
    ],
  },
]

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animated')
        })
      },
      { threshold: 0.2 }
    )
    cardsRef.current.forEach((card) => card && observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicios" className="services">
      <div className="container">
        <div className="section-header">
          <h2>Nuestros Servicios</h2>
          <p>Ofrecemos asesoría legal especializada en múltiples áreas del derecho</p>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card animate-on-scroll"
              ref={(el) => { cardsRef.current[i] = el }}
            >
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-list">
                {service.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
