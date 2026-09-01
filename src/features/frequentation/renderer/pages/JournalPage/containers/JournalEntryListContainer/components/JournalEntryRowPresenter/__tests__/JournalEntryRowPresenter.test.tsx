import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { JournalEntryRowPresenter } from '../JournalEntryRowPresenter'

const STUDENT_ID = 7
const ENTRY_TIME = '09:00'
const PERIOD_LABEL = 'Matin'

const baseProps = {
  initials: 'JD',
  avatarColorSeed: STUDENT_ID,
  displayName: 'Jean Dupont',
  classe: '3ème A',
  time: ENTRY_TIME,
  periodLabel: PERIOD_LABEL,
  periodClass: 'period-morning',
  activityCssClass: 'act-travail',
  activityLabel: 'Travail',
  selected: false,
  onRowClick: vi.fn(),
  onEditClick: vi.fn(),
  onDeleteClick: vi.fn()
}

function renderRow(props: Partial<Parameters<typeof JournalEntryRowPresenter>[0]> = {}) {
  return render(
    <I18nextProvider i18n={i18n}>
      <JournalEntryRowPresenter {...baseProps} {...props} />
    </I18nextProvider>
  )
}

function findRow(): Element {
  const row = document.querySelector('[role="row"]')
  if (!row) {
    throw new Error('Row not found')
  }
  return row
}

describe('JournalEntryRowPresenter', () => {
  it('renders student name, class, time, and activity label', () => {
    renderRow()
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByText('3ème A')).toBeInTheDocument()
    expect(screen.getByText('Travail')).toBeInTheDocument()
    expect(screen.getByText(ENTRY_TIME)).toBeInTheDocument()
    expect(screen.getByText(PERIOD_LABEL)).toBeInTheDocument()
  })

  it('renders the initials avatar', () => {
    const { container } = renderRow()
    expect(container.textContent).toContain('JD')
  })

  it('clicking the row triggers onRowClick', () => {
    const onRowClick = vi.fn()
    renderRow({ onRowClick })
    fireEvent.click(findRow())
    expect(onRowClick).toHaveBeenCalledTimes(1)
  })

  it('clicking the delete IconButton triggers onDeleteClick', () => {
    const onDeleteClick = vi.fn()
    renderRow({ onDeleteClick })
    fireEvent.click(screen.getByRole('button', { name: /supprimer/i }))
    expect(onDeleteClick).toHaveBeenCalledTimes(1)
  })

  it('clicking the edit IconButton triggers onEditClick', () => {
    const onEditClick = vi.fn()
    renderRow({ onEditClick })
    fireEvent.click(screen.getByRole('button', { name: /modifier/i }))
    expect(onEditClick).toHaveBeenCalledTimes(1)
  })
})
