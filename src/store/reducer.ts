import type { ICard } from '@/types'

export interface ICardState {
  selectedCard: ICard | null
  filterAmount: number | null
}

export type Action = { type: 'SELECT_CARD'; payload: ICard } | { type: 'SET_FILTER_AMOUNT'; payload: number | null }

export const initialState: ICardState = {
  selectedCard: null,
  filterAmount: null,
}

export function reducer(state: ICardState, action: Action): ICardState {
  switch (action.type) {
    case 'SELECT_CARD':
      return { ...state, selectedCard: action.payload, filterAmount: null }
    case 'SET_FILTER_AMOUNT':
      return { ...state, filterAmount: action.payload }
    default:
      return state
  }
}
