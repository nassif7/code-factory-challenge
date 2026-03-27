import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  )
}

export default Loading
