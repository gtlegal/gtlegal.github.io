import { useState } from 'react'

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
}

const validate = (name, value) => {
  if (name === 'nombre') return value.trim() ? '' : 'El nombre es requerido.'
  if (name === 'email')
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email inválido.'
  if (name === 'telefono')
    return !value || /^[\+]?[\d\s\-\(\)]{8,}$/.test(value) ? '' : 'Teléfono inválido.'
  if (name === 'servicio') return value ? '' : 'Selecciona un servicio.'
  if (name === 'mensaje')
    return value.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.'
  return ''
}

const contactItems = [
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Dirección',
    text: <>Carrera 18 #15 36 - local 182<br />Bogotá, Colombia</>,
  },
  { icon: 'fas fa-phone', title: 'Teléfono', text: '+57 323 221 1950' },
  { icon: 'fas fa-envelope', title: 'Email', text: 'info@ghtlegal.com' },
  {
    icon: 'fas fa-clock',
    title: 'Horarios',
    text: <>Lunes a Viernes: 8:00 AM - 6:00 PM<br />Sábados: 9:00 AM - 1:00 PM</>,
  },
]

export default function Contact({ onNotify }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    Object.keys(form).forEach((k) => {
      const err = validate(k, form[k])
      if (err) newErrors[k] = err
    })
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      onNotify('Por favor corrige los errores en el formulario.', 'error')
      return
    }
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value)
      })
      formData.append('timestamp', new Date().toISOString())

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
      onNotify('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.', 'success')
      setForm(initialForm)
      setErrors({})
    } catch {
      onNotify('Error al enviar el mensaje. Por favor intenta de nuevo.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

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

          <div className="contact-form">
            <form id="contactForm" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.nombre && <small style={{ color: '#f56565' }}>{errors.nombre}</small>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.email && <small style={{ color: '#f56565' }}>{errors.email}</small>}
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={form.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.telefono && <small style={{ color: '#f56565' }}>{errors.telefono}</small>}
              </div>
              <div className="form-group">
                <select
                  name="servicio"
                  value={form.servicio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="civil">Derecho Civil</option>
                  <option value="laboral">Derecho Laboral</option>
                  <option value="administrativo">Derecho Administrativo</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.servicio && <small style={{ color: '#f56565' }}>{errors.servicio}</small>}
              </div>
              <div className="form-group">
                <textarea
                  name="mensaje"
                  placeholder="Describe tu consulta legal"
                  rows="5"
                  value={form.mensaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                ></textarea>
                {errors.mensaje && <small style={{ color: '#f56565' }}>{errors.mensaje}</small>}
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <><span className="spinner"></span>Enviando...</>
                ) : (
                  'Enviar Consulta'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
