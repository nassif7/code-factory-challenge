import type { ITransaction } from '@/types'
import styles from './TransactionItem.module.css'

interface TransactionItemProps {
  transaction: ITransaction
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
})

function TransactionItem({ transaction }: TransactionItemProps) {
  const isCredit = transaction.amount < 0
  const formatted = currencyFormatter.format(Math.abs(transaction.amount))

  const display = isCredit ? `+${formatted}` : `-${formatted}`

  return (
    <li className={styles.item}>
      <span className={styles.description}>{transaction.description}</span>
      <span className={`${styles.amount} ${isCredit ? styles.credit : ''}`}>{display}</span>
    </li>
  )
}

export default TransactionItem
