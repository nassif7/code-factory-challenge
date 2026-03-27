import { useCallback, useMemo } from 'react'
import { useCardContext } from '@/store/context'
import { useFetch } from '@/lib/hooks/useFetch'
import { fetchTransactionsByCard } from '@/api'
import type { ITransaction } from '@/types'
import { TCardType } from '@/types'
import TransactionList from '@/components/TransactionList/TransactionList'
import styles from './TransactionsPanel.module.css'
import { AmountFilter, Loading, ErrorMessage } from '@/lib/components'

function TransactionsFetch({ cardId, cardDescription }: { cardId: string; cardDescription: string }) {
  const { amountFilter, setAmountFilter } = useCardContext()
  const fetchFn = useCallback(() => fetchTransactionsByCard(cardId), [cardId])

  const { data: transactions, loading, error } = useFetch<ITransaction[]>(fetchFn)

  const filtered = useMemo(() => {
    if (amountFilter === null) return transactions ?? []
    return (transactions ?? []).filter((tx) => Math.abs(tx.amount) >= amountFilter)
  }, [transactions, amountFilter])

  const accentColor = cardDescription === TCardType.Private ? '#2095d4' : '#555'

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className={styles.content} style={{ '--card-accent': accentColor } as React.CSSProperties}>
      <h2 className={styles.title}>Transactions</h2>
      <AmountFilter value={amountFilter} onChange={setAmountFilter} />
      <TransactionList transactions={filtered} />
    </div>
  )
}

export default function TransactionsPanel() {
  const { selectedCard } = useCardContext()
  if (!selectedCard) return null
  return <TransactionsFetch cardId={selectedCard.id} cardDescription={selectedCard.description} />
}
