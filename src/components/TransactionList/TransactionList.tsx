import { List, type RowComponentProps } from 'react-window'
import TransactionItem from '@/components/TransactionItem/TransactionItem'
import type { ITransaction } from '@/types'
import styles from './TransactionList.module.css'

interface TransactionListProps {
  transactions: ITransaction[]
}

const ROW_HEIGHT = 64
const LIST_STYLE = { flex: 1, height: '100%' }

interface RowProps {
  transactions: ITransaction[]
}

function Row({ index, style, transactions }: RowComponentProps<RowProps>) {
  return (
    <div style={style}>
      <TransactionItem transaction={transactions[index]} />
    </div>
  )
}

function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p className={styles.empty}>No transactions match the current filter.</p>
  }

  return (
    <List
      rowCount={transactions.length}
      rowHeight={ROW_HEIGHT}
      rowComponent={Row}
      rowProps={{ transactions }}
      style={LIST_STYLE}
    />
  )
}

export default TransactionList
