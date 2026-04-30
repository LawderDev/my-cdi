import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarView } from '../CalendarView'
import type { CalendarCell } from '../../../helpers/buildCalendarMonth'

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const DAY_FIRST = 1
const DAY_TODAY = 15
const DAY_LATER = 20

const SAMPLE_CELLS: CalendarCell[] = [
  {
    iso: '2026-04-01',
    dayOfMonth: DAY_FIRST,
    isCurrentMonth: true,
    isToday: false,
    isSelected: false,
    hasVisits: false
  },
  {
    iso: '2026-04-15',
    dayOfMonth: DAY_TODAY,
    isCurrentMonth: true,
    isToday: true,
    isSelected: true,
    hasVisits: true
  },
  {
    iso: '2026-04-20',
    dayOfMonth: DAY_LATER,
    isCurrentMonth: true,
    isToday: false,
    isSelected: false,
    hasVisits: true
  }
]

function renderView(overrides: Partial<Parameters<typeof CalendarView>[0]> = {}) {
  const props = {
    monthLabel: 'Avril 2026',
    cells: SAMPLE_CELLS,
    weekdayLabels: WEEKDAYS,
    onPrev: vi.fn(),
    onToday: vi.fn(),
    onNext: vi.fn(),
    onSelectDay: vi.fn(),
    prevLabel: 'Mois précédent',
    todayLabel: "Aujourd'hui",
    nextLabel: 'Mois suivant',
    ...overrides
  }
  return { ...props, ...render(<CalendarView {...props} />) }
}

describe('CalendarView', () => {
  it('renders the month label', () => {
    renderView()
    expect(screen.getByText('Avril 2026')).toBeInTheDocument()
  })

  it('renders weekday headers', () => {
    renderView()
    WEEKDAYS.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('flags today, selected, and has-visits cells with the matching data attributes', () => {
    const { container } = renderView()
    const todayBtn = container.querySelector('[data-iso="2026-04-15"]')
    expect(todayBtn?.getAttribute('data-today')).toBe('true')
    expect(todayBtn?.getAttribute('data-selected')).toBe('true')
    expect(todayBtn?.getAttribute('data-has-visits')).toBe('true')
  })

  it('calls onSelectDay with the iso of the clicked day', () => {
    const onSelectDay = vi.fn()
    const { container } = renderView({ onSelectDay })
    const button = container.querySelector('[data-iso="2026-04-20"]')
    if (button === null) {
      throw new Error('Calendar cell not found')
    }
    fireEvent.click(button)
    expect(onSelectDay).toHaveBeenCalledWith('2026-04-20')
  })

  it('forwards nav button clicks', () => {
    const onPrev = vi.fn()
    const onNext = vi.fn()
    const onToday = vi.fn()
    renderView({ onPrev, onNext, onToday })
    fireEvent.click(screen.getByRole('button', { name: 'Mois précédent' }))
    fireEvent.click(screen.getByRole('button', { name: "Aujourd'hui" }))
    fireEvent.click(screen.getByRole('button', { name: 'Mois suivant' }))
    expect(onPrev).toHaveBeenCalled()
    expect(onToday).toHaveBeenCalled()
    expect(onNext).toHaveBeenCalled()
  })
})
