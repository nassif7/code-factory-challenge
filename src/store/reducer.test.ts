import { describe, it, expect } from 'vitest'
import { reducer, initialState } from './reducer'
import type { ICardState } from './reducer'
import { TCardType } from '@/types'

const privateCard = { id: 'card-1', description: TCardType.Private }
const businessCard = { id: 'card-2', description: TCardType.Business }

describe('reducer', () => {
  describe('initialState', () => {
    it('has no selected card', () => {
      expect(initialState.selectedCard).toBeNull()
    })

    it('has no filter amount', () => {
      expect(initialState.amountFilter).toBeNull()
    })
  })

  describe('SELECT_CARD', () => {
    it('sets the selected card', () => {
      const state = reducer(initialState, { type: 'SELECT_CARD', payload: privateCard })
      expect(state.selectedCard).toEqual(privateCard)
    })

    it('resets amountFilter to null when a card is selected', () => {
      const stateWithFilter: ICardState = { selectedCard: null, amountFilter: 250 }
      const state = reducer(stateWithFilter, { type: 'SELECT_CARD', payload: privateCard })
      expect(state.amountFilter).toBeNull()
    })

    it('replaces the previously selected card', () => {
      const stateWithCard: ICardState = { selectedCard: privateCard, amountFilter: null }
      const state = reducer(stateWithCard, { type: 'SELECT_CARD', payload: businessCard })
      expect(state.selectedCard).toEqual(businessCard)
    })
  })

  describe('SET_FILTER_AMOUNT', () => {
    it('sets the filter amount', () => {
      const state = reducer(initialState, { type: 'SET_FILTER_AMOUNT', payload: 100 })
      expect(state.amountFilter).toBe(100)
    })

    it('accepts null to clear the filter', () => {
      const stateWithFilter: ICardState = { selectedCard: null, amountFilter: 100 }
      const state = reducer(stateWithFilter, { type: 'SET_FILTER_AMOUNT', payload: null })
      expect(state.amountFilter).toBeNull()
    })

    it('does not affect the selected card', () => {
      const stateWithCard: ICardState = { selectedCard: privateCard, amountFilter: null }
      const state = reducer(stateWithCard, { type: 'SET_FILTER_AMOUNT', payload: 50 })
      expect(state.selectedCard).toEqual(privateCard)
    })
  })
})
