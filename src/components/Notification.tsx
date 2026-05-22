import { useEffect } from 'react'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface NotificationProps {
  message: string
  type?: NotificationType
  onDismiss: () => void
}

const icons: Record<NotificationType, string> = {
  success: 'fas fa-check-circle',
  error: 'fas fa-times-circle',
  warning: 'fas fa-exclamation-triangle',
  info: 'fas fa-info-circle',
}

export default function Notification({ message, type = 'info', onDismiss }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className={`notification ${type}`} role="alert">
      <i className={icons[type]}></i>
      <span>{message}</span>
      <button className="notification-close" onClick={onDismiss} aria-label="Cerrar">
        <i className="fas fa-times"></i>
      </button>
    </div>
  )
}
