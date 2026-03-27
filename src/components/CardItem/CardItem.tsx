import type { ICard } from '@/types'
import styles from './CardItem.module.css'

interface CardItemProps {
  card: ICard
  isSelected: boolean
  onSelect: (card: ICard) => void
}

function CardItem({ card, isSelected, onSelect }: CardItemProps) {
  const lastFour = card.id.slice(-4)
  const masked = card.id.slice(0, -4).replace(/./g, '•') + lastFour

  return (
    <article className={`${styles.article}`} onClick={() => onSelect(card)} role="option" aria-selected={isSelected}>
      <div />
      <div className={styles.cardBottom}>
        <div className={styles.cardNumberRow}>
          <span className={styles.cardNumber}>{masked}</span>
        </div>
        <span className={styles.cardDescription}>{card.description}</span>
      </div>
    </article>
  )
}

export default CardItem
