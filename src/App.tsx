import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Team from './components/Team'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Notification from './components/Notification'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface NotificationState {
  message: string
  type: NotificationType
  id: number
}

function App() {
  const [notification, setNotification] = useState<NotificationState | null>(null)

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    setNotification({ message, type, id: Date.now() })
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Team />
        <Experience />
        <Contact onNotify={showNotification} />
      </main>
      <Footer />
      <BackToTop />
      {notification && (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification(null)}
        />
      )}
    </>
  )
}

export default App
