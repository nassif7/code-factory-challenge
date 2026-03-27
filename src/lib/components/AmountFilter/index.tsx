import styles from './AmountFilter.module.css'

interface IAmountFilterProps {
  value: number | null
  onChange: (value: number | null) => void
  placeholder?: string
  label?: string
}

function AmountFilter({ value, onChange, placeholder = 'e.g. 100', label = 'Amount Filter' }: IAmountFilterProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    onChange(val === '' ? null : parseFloat(val))
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="amount-filter">
        {label}
      </label>
      <input
        id="amount-filter"
        className={styles.input}
        type="number"
        min="0"
        step="0.01"
        placeholder={placeholder}
        value={value ?? ''}
        onChange={handleChange}
      />
      {value !== null && (
        <button className={styles.clearButton} onClick={() => onChange(null)} aria-label="Clear filter">
          ✕
        </button>
      )}
    </div>
  )
}

export default AmountFilter
