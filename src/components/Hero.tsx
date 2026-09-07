import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  target: number
  suffix?: string
}

function Counter({ target, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const elRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const steps = 60
        const interval = 2000 / steps
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setCount(target)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, interval)
      },
      { threshold: 0.5 }
    )
    if (elRef.current) observer.observe(elRef.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={elRef}>{count}{suffix}</span>
}

function scrollToSection(href: string): void {
  const target = document.querySelector(href)
  if (!target) return
  const headerHeight = (document.querySelector('.header') as HTMLElement | null)?.offsetHeight || 80
  window.scrollTo({ top: (target as HTMLElement).offsetTop - headerHeight, behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Experiencia Legal de Confianza</h1>
        <p className="hero-subtitle">
          Brindando soluciones jurídicas integrales a empresas y particulares con dedicación y profesionalismo
        </p>
        <div className="hero-buttons">
          <a
            href="#contacto"
            className="btn btn-primary"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contacto') }}
          >
            Consulta tu caso
          </a>
          <a
            href="#servicios"
            className="btn btn-secondary"
            onClick={(e) => { e.preventDefault(); scrollToSection('#servicios') }}
          >
            Nuestros Servicios
          </a>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-stats">
          <div className="stat">
            <h3><Counter target={4} /></h3>
            <p>Años de Experiencia</p>
          </div>
          <div className="stat">
            <h3><Counter target={100} suffix="%" /></h3>
            <p>Satisfacción del Cliente</p>
          </div>
        </div>
      </div>
    </section>
  )
}
