import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useFetch } from '@/lib/hooks'

const mockData = { id: 1, name: 'test' }

describe('useFetch', () => {
  it('starts with loading true, data null, error null', () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData)
    const { result } = renderHook(() => useFetch(fetchFn))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('sets data and stops loading on success', async () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData)
    const { result } = renderHook(() => useFetch(fetchFn))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
  })

  it('sets error and stops loading on failure', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useFetch(fetchFn))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('Failed to fetch')
    expect(result.current.data).toBeNull()
  })
})
