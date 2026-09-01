import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ChangeEvent, ReactNode } from 'react'
import { useCsvImportButton } from '../useCsvImportButton'

const CSV_CONTENT = 'Nom de famille;Prenom 1;INE;Division\nDupont;Jean;123A;3ème A\n'
const FILE_NAME = 'eleves.csv'

type CsvImportButtonState = ReturnType<typeof useCsvImportButton>

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

function createCsvFile(): File {
  return new File([CSV_CONTENT], FILE_NAME, { type: 'text/csv' })
}

function Harness(props: {
  onState: (state: CsvImportButtonState) => void
  onFileEvent: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  const state = useCsvImportButton()
  props.onState(state)
  return <input type="file" data-testid="csv-input" onChange={props.onFileEvent} />
}

function setup() {
  const states: CsvImportButtonState[] = []
  const fileEvents: ChangeEvent<HTMLInputElement>[] = []
  render(
    <Harness
      onState={(state) => states.push(state)}
      onFileEvent={(event) => fileEvents.push(event)}
    />,
    { wrapper: createWrapper() }
  )
  const input = screen.getByTestId('csv-input')
  const selectFile = () => {
    fireEvent.change(input, { target: { files: [createCsvFile()] } })
    const event = fileEvents[fileEvents.length - 1]
    if (event === undefined) {
      throw new Error('change event never fired')
    }
    act(() => {
      latest(states).handleFileChange(event)
    })
    return latest(states)
  }
  return { states, selectFile }
}

function latest(states: CsvImportButtonState[]): CsvImportButtonState {
  const state = states[states.length - 1]
  if (state === undefined) {
    throw new Error('hook never rendered')
  }
  return state
}

describe('useCsvImportButton', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        importCsv: vi
          .fn()
          .mockResolvedValue({ success: true, data: { created: 1, errors: 0, errorDetails: [] } })
      }
    })
  })

  it('starts with a closed modal and no pending file', () => {
    const { states } = setup()
    const state = latest(states)
    expect(state.isModalOpen).toBe(false)
    expect(state.pendingFile).toBeNull()
    expect(state.result).toBeNull()
    expect(state.error).toBeNull()
  })

  it('opens and closes the modal, resetting pending state', () => {
    const { states, selectFile } = setup()
    act(() => {
      latest(states).openModal()
    })
    expect(latest(states).isModalOpen).toBe(true)

    selectFile()
    expect(latest(states).pendingFile?.name).toBe(FILE_NAME)

    act(() => {
      latest(states).closeModal()
    })
    expect(latest(states).isModalOpen).toBe(false)
    expect(latest(states).pendingFile).toBeNull()
    expect(latest(states).error).toBeNull()
  })

  it('submits the decoded csv content to student.importCsv', async () => {
    const { states, selectFile } = setup()
    act(() => {
      latest(states).openModal()
    })
    selectFile()

    await act(async () => {
      latest(states).handleSubmit()
    })
    await waitFor(() =>
      expect(window.electronAPI.student.importCsv).toHaveBeenCalledWith({ csv: CSV_CONTENT })
    )
    expect(latest(states).error).toBeNull()
    expect(latest(states).isModalOpen).toBe(false)
  })

  it('closes the modal automatically when no row errors occurred', async () => {
    const { states, selectFile } = setup()
    act(() => {
      latest(states).openModal()
    })
    selectFile()

    await act(async () => {
      latest(states).handleSubmit()
    })
    await waitFor(() => expect(window.electronAPI.student.importCsv).toHaveBeenCalledOnce())
    expect(latest(states).isModalOpen).toBe(false)
    expect(latest(states).pendingFile).toBeNull()
  })

  it('keeps the modal open and stores the result when row errors occurred', async () => {
    vi.stubGlobal('electronAPI', {
      student: {
        importCsv: vi.fn().mockResolvedValue({
          success: true,
          data: {
            created: 0,
            errors: 1,
            errorDetails: [{ type: 'DUPLICATE_INE', studentName: 'Jean Dupont' }]
          }
        })
      }
    })
    const { states, selectFile } = setup()
    act(() => {
      latest(states).openModal()
    })
    selectFile()

    await act(async () => {
      latest(states).handleSubmit()
    })
    await waitFor(() => expect(latest(states).result).not.toBeNull())
    expect(latest(states).isModalOpen).toBe(true)
  })

  it('surfaces the ipc error when the import fails', async () => {
    vi.stubGlobal('electronAPI', {
      student: {
        importCsv: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    const { states, selectFile } = setup()
    act(() => {
      latest(states).openModal()
    })
    selectFile()

    await act(async () => {
      latest(states).handleSubmit()
    })
    await waitFor(() => expect(latest(states).error).toBe('boom'))
    expect(latest(states).result).toBeNull()
    expect(latest(states).isModalOpen).toBe(true)
  })
})
