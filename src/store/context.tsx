import { createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import type { ICard } from '@/types'
import { reducer, initialState } from './reducer'

interface ICardContext {
  selectedCard: ICard | null
  amountFilter: number | null
  selectCard: (card: ICard) => void
  setAmountFilter: (value: number | null) => void
}

const CardContext = createContext<ICardContext | null>(null)

export function useCardContext(): ICardContext {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error('useCardContext must be used inside <CardProvider>')
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [{ selectedCard, amountFilter }, dispatch] = useReducer(reducer, initialState)

  const selectCard = useCallback((card: ICard) => {
    dispatch({ type: 'SELECT_CARD', payload: card })
  }, [])

  const setAmountFilter = useCallback((value: number | null) => {
    dispatch({ type: 'SET_FILTER_AMOUNT', payload: value })
  }, [])

  const value = useMemo(
    () => ({ selectedCard, amountFilter, selectCard, setAmountFilter }),
    [selectedCard, amountFilter, selectCard, setAmountFilter],
  )

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export default CardProvider
