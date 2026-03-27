export const TCardType = {
  Private: 'Private Card',
  Business: 'Business Card',
} as const

export type TCardType = (typeof TCardType)[keyof typeof TCardType]

export interface ICard {
  id: string
  description: TCardType
}

export interface ITransaction {
  id: string
  amount: number
  description: string
}
