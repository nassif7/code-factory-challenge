import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { fetchCards, fetchTransactionsByCard } from './index'
import type { ICard, ITransaction } from '@/types'

const mockCards: ICard[] = [
  { id: 'card-1', description: 'Test Card 1' },
  { id: 'card-2', description: 'Test Card 2' },
]

const mockTransactions: ITransaction[] = [
  { id: 'tx-1', amount: 100.0, description: 'Test Transaction 1' },
  { id: 'tx-2', amount: 200.0, description: 'Test Transaction 2' },
]

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const server = setupServer(
  http.get(`${BASE_URL}/cards`, () => {
    return HttpResponse.json(mockCards)
  }),

  http.get(`${BASE_URL}/cards/:cardId/transactions`, ({ params }) => {
    if (params.cardId === 'card-1') {
      return HttpResponse.json(mockTransactions)
    }
    return HttpResponse.json([])
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('fetchCards', () => {
  it('returns the list of cards', async () => {
    const cards = await fetchCards()
    expect(cards).toHaveLength(2)
    expect(cards[0]).toEqual({ id: 'card-1', description: 'Test Card 1' })
  })
})

describe('fetchTransactionsByCard', () => {
  it('returns transactions for a valid cardId', async () => {
    const transactions = await fetchTransactionsByCard('card-1')
    expect(transactions).toHaveLength(2)
    expect(transactions[0]).toEqual({ id: 'tx-1', amount: 100.0, description: 'Test Transaction 1' })
  })

  it('returns empty array for unknown cardId', async () => {
    const transactions = await fetchTransactionsByCard('unknown-id')
    expect(transactions).toHaveLength(0)
  })
})
