import './App.css'
import { useFetch } from '@/lib/hooks'
import { fetchCards } from '@/api'

function App() {
  const { data, loading, error } = useFetch(fetchCards)
  console.log(data, loading, error)
  return (
    <div className="App">
      <h1>Cards & Transactions</h1>
    </div>
  )
}

export default App
