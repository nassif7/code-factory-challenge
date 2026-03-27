import { useCardContext } from '@/store/context'
import type { ICard } from '@/types'

interface CardListProps {
  cards: ICard[]
}

export default function CardList({ cards }: CardListProps) {
  const { selectedCard, selectCard } = useCardContext()

  return (
    <section role="listbox" aria-label="Payment cards">
      {cards.map((card) => (
        <button
          key={card.id}
          role="option"
          aria-selected={card.id === selectedCard?.id}
          onClick={() => selectCard(card)}
        >
          {card.description}
        </button>
      ))}
    </section>
  )
}
