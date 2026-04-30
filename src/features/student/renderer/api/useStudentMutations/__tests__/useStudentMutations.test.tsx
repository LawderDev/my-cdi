import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import {
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
  useImportStudentsCsv
} from '../useStudentMutations'
import type { CreateStudentDto, UpdateStudentDto } from '@student-shared'

const STUDENT_ID = 1

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useCreateStudent', () => {
  const createDto: CreateStudentDto = { nom: 'Dupont', prenom: 'Jean', classe: '3A', ine: '123A' }

  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        create: vi.fn().mockResolvedValue({
          success: true,
          data: { id: STUDENT_ID, ...createDto }
        })
      }
    })
  })

  it('calls student.create with correct data', async () => {
    const { result } = renderHook(() => useCreateStudent(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate(createDto)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.create).toHaveBeenCalledWith(createDto)
  })

  it('throws when ipc result indicates failure', async () => {
    vi.stubGlobal('electronAPI', {
      student: {
        create: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })

    const { result } = renderHook(() => useCreateStudent(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate(createDto)
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useUpdateStudent', () => {
  const updateData: UpdateStudentDto = { nom: 'Dupont-Updated' }

  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        update: vi.fn().mockResolvedValue({
          success: true,
          data: {
            id: STUDENT_ID,
            nom: 'Dupont-Updated',
            prenom: 'Jean',
            classe: '3A',
            ine: '123A'
          }
        })
      }
    })
  })

  it('calls student.update with id merged into payload', async () => {
    const { result } = renderHook(() => useUpdateStudent(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate({ id: STUDENT_ID, data: updateData })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.update).toHaveBeenCalledWith({
      id: STUDENT_ID,
      ...updateData
    })
  })
})

describe('useDeleteStudent', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        delete: vi.fn().mockResolvedValue({ success: true, data: undefined })
      }
    })
  })

  it('calls student.delete with a single id', async () => {
    const { result } = renderHook(() => useDeleteStudent(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate({ id: STUDENT_ID })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.delete).toHaveBeenCalledWith({ id: STUDENT_ID })
  })
})

describe('useImportStudentsCsv', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        importCsv: vi.fn().mockResolvedValue({
          success: true,
          data: { created: 1, errors: 0 }
        })
      }
    })
  })

  it('calls student.importCsv with csv payload', async () => {
    const { result } = renderHook(() => useImportStudentsCsv(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate({ csv: 'nom,prenom,classe,ine\nA,B,1,11\n' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.importCsv).toHaveBeenCalledWith({
      csv: 'nom,prenom,classe,ine\nA,B,1,11\n'
    })
  })
})
