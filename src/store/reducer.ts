import type { ICard } from '@/types'

export interface ICardState {
  selectedCard: ICard | null
  amountFilter: number | null
}

export type Action = { type: 'SELECT_CARD'; payload: ICard } | { type: 'SET_FILTER_AMOUNT'; payload: number | null }

export const initialState: ICardState = {
  selectedCard: null,
  amountFilter: null,
}

export function reducer(state: ICardState, action: Action): ICardState {
  switch (action.type) {
    case 'SELECT_CARD':
      return { ...state, selectedCard: action.payload, amountFilter: null }
    case 'SET_FILTER_AMOUNT':
      return { ...state, amountFilter: action.payload }
    default:
      return state
  }
}
