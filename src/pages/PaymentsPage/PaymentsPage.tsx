import CardProvider from '@/store/context'
import { useFetch } from '@/lib/hooks/useFetch'
import { fetchCards } from '@/api'
import type { ICard } from '@/types'
import { CardList, TransactionsPanel } from '@/components'
import { Loading, ErrorMessage, ErrorBoundary } from '@/lib/components'

import styles from './PaymentsPage.module.css'

function PaymentsPage() {
  const { data: cards, loading, error } = useFetch<ICard[]>(fetchCards)

  console.log(cards, loading, error)

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <CardProvider>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Cards</h2>
          <ErrorBoundary>
            <CardList cards={cards || []} />
          </ErrorBoundary>
        </aside>
        <ErrorBoundary>
          <main className={styles.main}>
            <TransactionsPanel />
          </main>
        </ErrorBoundary>
      </div>
    </CardProvider>
  )
}

export default PaymentsPage
