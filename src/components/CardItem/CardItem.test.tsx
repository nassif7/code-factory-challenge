import { fireEvent, render, screen } from '@testing-library/react'
import CardItem from './CardItem'
import type { ICard } from '@/types'

describe('CardItem', () => {
  const card: ICard = {
    id: '1234567812345678',
    description: 'Private Card',
  }

  it('renders masked card number and description', () => {
    render(<CardItem card={card} isSelected={false} onSelect={vi.fn()} />)

    expect(screen.getByText(/Private Card/i)).toBeInTheDocument()
    expect(screen.getByText('••••••••••••5678')).toBeInTheDocument()
    expect(screen.queryByText('1234567812345678')).not.toBeInTheDocument()
  })

  it('calls onSelect when card is clicked', () => {
    const onSelect = vi.fn()
    render(<CardItem card={card} isSelected={false} onSelect={onSelect} />)

    fireEvent.click(screen.getByRole('option'))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(card)
  })

  it('toggles reveal button to display full card number', () => {
    render(<CardItem card={card} isSelected={false} onSelect={vi.fn()} />)

    const button = screen.getByRole('button', { name: /show card number/i })
    fireEvent.click(button)

    expect(screen.getByText('1234567812345678')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /hide card number/i })).toBeInTheDocument()
  })

  it('sets aria-selected attribute when selected', () => {
    render(<CardItem card={card} isSelected={true} onSelect={vi.fn()} />)

    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
  })
})
