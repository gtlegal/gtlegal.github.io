import { useEffect, useRef } from 'react'

const members = [
  {
    image: '/img/gil.png',
    name: 'David A. Gil Rodríguez',
    title: 'Socio Fundador',
    speciality: 'Especialista en Derecho Administrativo',
    linkedin: 'https://www.linkedin.com/in/david-alejandro-gil-rodr%C3%ADguez-891631158/',
    email: 'mailto:david.gil@ghtlegal.com',
  },
  {
    image: '/img/herrera.png',
    name: 'Alejandra Herrera Pineda',
    title: 'Socia Fundadora',
    speciality: 'Especialista en Derecho Contractual',
    linkedin: 'https://www.linkedin.com/in/cindy-alejandra-herrera-pineda-604159147/',
    email: 'mailto:alejandra.herrera@ghtlegal.com',
  },
  {
    image: '/img/tinjaca.png',
    name: 'Alicia Tinjacá Romero',
    title: 'Socia Fundadora',
    speciality: 'Abogada',
    linkedin: 'https://www.linkedin.com/in/alicia-tinjac%C3%A1-romero-1a5056158/',
    email: 'mailto:alicia.tinjaca@ghtlegal.com',
  },
]

export default function Team() {
  const membersRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animated')
        })
      },
      { threshold: 0.2 }
    )
    membersRef.current.forEach((m) => m && observer.observe(m))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="equipo" className="team">
      <div className="container">
        <div className="section-header">
          <h2>Nuestro Equipo</h2>
          <p>Profesionales altamente calificados comprometidos con la excelencia</p>
        </div>
        <div className="team-grid">
          {members.map((member, i) => (
            <div
              key={i}
              className="team-member animate-on-scroll"
              ref={(el) => (membersRef.current[i] = el)}
            >
              <div className="member-image">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-title">{member.title}</p>
                <p className="member-speciality">{member.speciality}</p>
                <div className="member-social">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={member.email}>
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
