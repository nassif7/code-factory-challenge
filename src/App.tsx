import { lazy, Suspense } from 'react'
import styles from './App.module.css'
import { Loading } from '@/lib/components'

const PaymentsPage = lazy(() => import('@/pages/PaymentsPage/PaymentsPage'))

function App() {
  return (
    <div className={styles.App}>
      <h1>Cards & Transactions</h1>
      <Suspense fallback={<Loading />}>
        <PaymentsPage />
      </Suspense>
    </div>
  )
}

export default App
