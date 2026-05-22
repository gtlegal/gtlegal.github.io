import { useState, useEffect } from 'react'

export default function WhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href="https://wa.me/+573232211950"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  )
}
