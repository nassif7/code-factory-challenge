import CardProvider from '@/store/context'
import { useFetch } from '@/lib/hooks/useFetch'
import { fetchCards } from '@/api'
import type { ICard } from '@/types'
import { CardList, TransactionsPanel } from '@/components'

import styles from './PaymentsPage.module.css'

function PaymentsPage() {
  const { data: cards, loading, error } = useFetch<ICard[]>(fetchCards)

  console.log(cards, loading, error)

  if (loading) return <p>Loading </p>
  if (error) return <p>Error: {error}</p>

  return (
    <CardProvider>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Cards</h2>
          <CardList cards={cards || []} />
        </aside>
        <main className={styles.main}>
          <TransactionsPanel />
        </main>
      </div>
    </CardProvider>
  )
}

export default PaymentsPage
