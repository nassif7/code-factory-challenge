import type { ICard, ITransaction } from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchCards(): Promise<ICard[]> {
  const response = await fetch(`${BASE_URL}/cards`)
  if (!response.ok) throw new Error('Failed to fetch cards')
  return response.json()
}

export async function fetchTransactionsByCard(cardId: string): Promise<ITransaction[]> {
  const response = await fetch(`${BASE_URL}/cards/${cardId}/transactions`)
  if (!response.ok) throw new Error('Failed to fetch transactions')
  return response.json()
}
