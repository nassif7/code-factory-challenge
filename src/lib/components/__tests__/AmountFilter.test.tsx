import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from '../AmountFilter'

function renderFilterBar(value: number | null = null) {
  const onChange = vi.fn()
  render(<FilterBar value={value} onChange={onChange} />)
  return { onChange }
}

describe('FilterBar', () => {
  it('renders the label and input', () => {
    renderFilterBar()
    expect(screen.getByLabelText('Amount Filter')).toBeInTheDocument()
  })

  it('displays the current value in the input', () => {
    renderFilterBar(150)
    expect(screen.getByRole('spinbutton')).toHaveValue(150)
  })

  it('shows an empty input when value is null', () => {
    renderFilterBar(null)
    expect(screen.getByRole('spinbutton')).toHaveValue(null)
  })

  it('calls onChange with a parsed float when the user types a number', async () => {
    const onChange = vi.fn()
    function Wrapper() {
      const [value, setValue] = React.useState<number | null>(null) // eslint-disable-line
      return (
        <FilterBar
          value={value}
          onChange={(v) => {
            setValue(v)
            onChange(v)
          }}
        />
      )
    }
    render(<Wrapper />)
    await userEvent.type(screen.getByRole('spinbutton'), '99.5')
    expect(onChange).toHaveBeenLastCalledWith(99.5)
  })

  it('calls onChange with null when the input is cleared', async () => {
    const { onChange } = renderFilterBar(100)
    await userEvent.clear(screen.getByRole('spinbutton'))
    expect(onChange).toHaveBeenLastCalledWith(null)
  })

  it('shows the clear button only when a value is set', () => {
    const { rerender } = render(<FilterBar value={null} onChange={vi.fn()} />)
    expect(screen.queryByLabelText('Clear filter')).not.toBeInTheDocument()

    rerender(<FilterBar value={100} onChange={vi.fn()} />)
    expect(screen.getByLabelText('Clear filter')).toBeInTheDocument()
  })

  it('calls onChange with null when the clear button is clicked', async () => {
    const { onChange } = renderFilterBar(100)
    await userEvent.click(screen.getByLabelText('Clear filter'))
    expect(onChange).toHaveBeenCalledWith(null)
  })
})
