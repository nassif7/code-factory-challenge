import { http, HttpResponse } from 'msw'
import cardsData from '../data/cards.json'
import transactionsData from '../data/transactions.json'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const handlers = [
  http.get(`${BASE_URL}/cards`, () => {
    return HttpResponse.json(cardsData)
  }),

  http.get(`${BASE_URL}/cards/:cardId/transactions`, ({ params }) => {
    const { cardId } = params
    const all = transactionsData as Record<string, { id: string; amount: number; description: string }[]>
    const transactions = all[cardId as string] ?? []
    return HttpResponse.json(transactions)
  }),
]
