import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
