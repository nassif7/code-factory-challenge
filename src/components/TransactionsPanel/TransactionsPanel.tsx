import { useCallback, useMemo } from 'react'
import { useCardContext } from '@/store/context'
import { useFetch } from '@/lib/hooks/useFetch'
import { fetchTransactionsByCard } from '@/api'
import type { ITransaction } from '@/types'
import TransactionList from '@/components/TransactionList/TransactionList'
import styles from './TransactionsPanel.module.css'
import { AmountFilter } from '@/lib/components'

function TransactionsFetch({ cardId }: { cardId: string }) {
  const { amountFilter, setAmountFilter } = useCardContext()
  const fetchFn = useCallback(() => fetchTransactionsByCard(cardId), [cardId])

  const { data: transactions, loading, error } = useFetch<ITransaction[]>(fetchFn)

  const filtered = useMemo(() => {
    if (amountFilter === null) return transactions ?? []
    return (transactions ?? []).filter((tx) => Math.abs(tx.amount) >= amountFilter)
  }, [transactions, amountFilter])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Transactions</h2>
      <AmountFilter value={amountFilter} onChange={setAmountFilter} />
      <TransactionList transactions={filtered} />
    </div>
  )
}

export default function TransactionsPanel() {
  const { selectedCard } = useCardContext()
  if (!selectedCard) return null
  return <TransactionsFetch cardId={selectedCard.id} />
}
