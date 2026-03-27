import { Component } from 'react'
import type { ReactNode } from 'react'
import ErrorMessage from '@/lib/components/ErrorMessage'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : 'Something went wrong.'
    return { hasError: true, message }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage message={this.state.message} />
    }
    return this.props.children
  }
}

export default ErrorBoundary
