import { useFetch } from '@/lib/hooks'
import { fetchCards } from '@/api'
import styles from './App.module.css'
import { PaymentsPage } from '@/pages'

function App() {
  const { data, loading, error } = useFetch(fetchCards)
  console.log(data, loading, error)
  return (
    <div className={styles.App}>
      <h1>Cards & Transactions</h1>
      <PaymentsPage />
    </div>
  )
}

export default App
