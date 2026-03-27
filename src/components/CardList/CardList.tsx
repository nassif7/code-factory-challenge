import { useCardContext } from '@/store/context'
import type { ICard } from '@/types'
import CardItem from '@/components/CardItem/CardItem'
interface CardListProps {
  cards: ICard[]
}

export const TCardType = {
  Private: 'private',
  Business: 'business',
} as const

export type TCardType = (typeof TCardType)[keyof typeof TCardType]

export default function CardList({ cards }: CardListProps) {
  const { selectedCard, selectCard } = useCardContext()

  return (
    <section role="listbox" aria-label="Payment cards" style={{ display: 'contents' }}>
      {cards.map((card) => (
        <CardItem key={card.id} card={card} isSelected={card.id === selectedCard?.id} onSelect={selectCard} />
      ))}
    </section>
  )
}
