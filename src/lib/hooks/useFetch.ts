import { useEffect, useState } from 'react'

interface IFetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [state, setState] = useState<IFetchState<T>>({ data: null, loading: false, error: null })

  useEffect(() => {
    setState({ data: null, loading: true, error: null })

    fetchFn()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch(() => setState({ data: null, loading: false, error: 'Failed to fetch' }))
  }, [fetchFn])

  return state
}
