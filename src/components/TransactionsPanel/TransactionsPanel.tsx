import { useCallback, useMemo } from 'react'
import { useCardContext } from '@/store/context'
import { useFetch } from '@/lib/hooks/useFetch'
import { fetchTransactionsByCard } from '@/api'
import type { ITransaction } from '@/types'
import TransactionList from '@/components/TransactionList/TransactionList'
import styles from './TransactionsPanel.module.css'

function TransactionsFetch({ cardId }: { cardId: string }) {
  const fetchFn = useCallback(() => fetchTransactionsByCard(cardId), [cardId])

  const { data: transactions, loading, error } = useFetch<ITransaction[]>(fetchFn)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Transactions</h2>
      <TransactionList transactions={transactions || []} />
    </div>
  )
}

export default function TransactionsPanel() {
  const { selectedCard } = useCardContext()
  if (!selectedCard) return null
  return <TransactionsFetch cardId={selectedCard.id} />
}
