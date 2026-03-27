import { lazy, Suspense } from 'react'
import CardProvider from '@/store/context'
import { useFetch } from '@/lib/hooks/useFetch'
import { fetchCards } from '@/api'
import type { ICard } from '@/types'
import { Loading, ErrorMessage, ErrorBoundary } from '@/lib/components'
import CardList from '@/components/CardList/CardList'

import styles from './PaymentsPage.module.css'

const TransactionsPanel = lazy(() => import('@/components/TransactionsPanel/TransactionsPanel'))

function PaymentsPage() {
  const { data: cards, loading, error } = useFetch<ICard[]>(fetchCards)


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
            <Suspense fallback={<Loading />}>
              <TransactionsPanel />
            </Suspense>
          </main>
        </ErrorBoundary>
      </div>
    </CardProvider>
  )
}

export default PaymentsPage
