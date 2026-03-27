import { useState } from 'react'
import type { ICard } from '@/types'
import styles from './CardItem.module.css'
import { RevealIcon } from '@/lib/components'

interface CardItemProps {
  card: ICard
  isSelected: boolean
  onSelect: (card: ICard) => void
}

export type TCardType = 'Private Card' | 'Business Card'

function CardItem({ card, isSelected, onSelect }: CardItemProps) {
  const [revealed, setRevealed] = useState(false)
  const lastFour = card.id.slice(-4)
  const masked = card.id.slice(0, -4).replace(/./g, '•') + lastFour
  const typeClass = card.description === 'Private Card' ? styles.private : styles.business
  const selectedClass = isSelected ? styles.selected : ''

  function handleReveal(e: React.MouseEvent) {
    e.stopPropagation()
    setRevealed((v) => !v)
  }

  return (
    <article
      className={`${styles.article} ${typeClass} ${selectedClass}`}
      onClick={() => onSelect(card)}
      role="option"
      aria-selected={isSelected}
    >
      <div />
      <div className={styles.cardBottom}>
        <div className={styles.cardNumberRow}>
          <span className={styles.cardNumber}>{revealed ? card.id : masked}</span>
          <button
            className={styles.revealButton}
            onClick={handleReveal}
            aria-label={revealed ? 'Hide card number' : 'Show card number'}
          >
            <RevealIcon open={!revealed} />
          </button>
        </div>
        <span className={styles.cardDescription}>{card.description}</span>
      </div>
    </article>
  )
}

export default CardItem
