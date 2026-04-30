import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from '@shared/i18n/config'
import { useJournalPage } from '../useJournalPage'
import { ActivityType } from '@types'

const SAMPLE_ID = 1
const SAMPLE_STUDENT_ID = 7

function withQuery(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return (
    <QueryClientProvider client={client}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </QueryClientProvider>
  )
}

const wrapper = ({ children }: { children: ReactNode }) => withQuery(children)

const sampleEntry = {
  id: SAMPLE_ID,
  startsAt: '2026-04-01T09:00:00.000Z',
  activity: ActivityType.WORK,
  student: {
    id: SAMPLE_STUDENT_ID,
    nom: 'A',
    prenom: 'B',
    classe: 'C',
    ine: 'D',
    displayName: 'B A'
  },
  activityLabel: '',
  activityColor: ''
}

describe('useJournalPage', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        getJournalEntries: vi.fn().mockResolvedValue({ success: true, data: [] }),
        update: vi.fn().mockResolvedValue({ success: true, data: { id: SAMPLE_ID } })
      }
    })
  })

  it('initializes with today and dialogs closed', () => {
    const { result } = renderHook(() => useJournalPage(), { wrapper })
    expect(result.current.selectedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(result.current.isAddDialogOpen).toBe(false)
    expect(result.current.editingEntry).toBeNull()
  })

  it('exposes a translated title', () => {
    const { result } = renderHook(() => useJournalPage(), { wrapper })
    expect(result.current.title).toBeTypeOf('string')
    expect(result.current.title.length).toBeGreaterThan(0)
  })

  it('exposes activityOptions covering every ActivityType', () => {
    const { result } = renderHook(() => useJournalPage(), { wrapper })
    expect(result.current.activityOptions).toHaveLength(Object.values(ActivityType).length)
  })

  it('toggles add dialog', () => {
    const { result } = renderHook(() => useJournalPage(), { wrapper })
    act(() => {
      result.current.openAddDialog()
    })
    expect(result.current.isAddDialogOpen).toBe(true)
    act(() => {
      result.current.closeAddDialog()
    })
    expect(result.current.isAddDialogOpen).toBe(false)
  })

  it('manages editing entry and seeds editingActivity from the entry', () => {
    const { result } = renderHook(() => useJournalPage(), { wrapper })
    act(() => {
      result.current.startEditing(sampleEntry)
    })
    expect(result.current.editingEntry).toEqual(sampleEntry)
    expect(result.current.editingActivity).toBe(ActivityType.WORK)
    act(() => {
      result.current.closeEditDialog()
    })
    expect(result.current.editingEntry).toBeNull()
    expect(result.current.editingActivity).toBeNull()
  })

  it('submitEdit dispatches an update + closes the dialog on success', async () => {
    const { result } = renderHook(() => useJournalPage(), { wrapper })
    act(() => {
      result.current.startEditing(sampleEntry)
    })
    act(() => {
      result.current.setEditingActivity(ActivityType.READING)
    })
    act(() => {
      result.current.submitEdit()
    })
    await waitFor(() => {
      expect(result.current.editingEntry).toBeNull()
    })
    expect(window.electronAPI.frequentation.update).toHaveBeenCalledWith({
      id: SAMPLE_ID,
      activity: ActivityType.READING
    })
  })

  it('submitEdit is a no-op when no entry is being edited', () => {
    const { result } = renderHook(() => useJournalPage(), { wrapper })
    act(() => {
      result.current.submitEdit()
    })
    expect(window.electronAPI.frequentation.update).not.toHaveBeenCalled()
  })
})
