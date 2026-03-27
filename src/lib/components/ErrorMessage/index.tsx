import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
  message?: string
}

function ErrorMessage({ message = 'Something went wrong.' }: ErrorMessageProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{message}</p>
    </div>
  )
}

export default ErrorMessage
