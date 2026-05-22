import { useEffect, useRef } from 'react'

const highlights: string[] = [
  'Casos exitosos en todas las instancias judiciales',
  'Clientes satisfechos en múltiples sectores',
  'Equipo multidisciplinario de alta especialización',
]

export default function Experience() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('animated')
      },
      { threshold: 0.2 }
    )
    if (contentRef.current) observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experiencia" className="experience">
      <div className="container">
        <div className="experience-content animate-on-scroll" ref={contentRef}>
          <div className="experience-text">
            <h2>3 Años de Excelencia Legal</h2>
            <p>
              Desde el inicio de nuestras labores profesionales en 2022, GHT Estudio Legal se ha venido
              consolidando como una firma de abogados comprometida con la excelencia, brindando servicios
              jurídicos de la más alta calidad.
            </p>
            <div className="experience-highlights">
              {highlights.map((text, i) => (
                <div key={i} className="highlight">
                  <i className="fas fa-check-circle"></i>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="experience-image">
            <img src="/img/office_blue.jpeg" alt="Oficina GHT Estudio Legal" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
