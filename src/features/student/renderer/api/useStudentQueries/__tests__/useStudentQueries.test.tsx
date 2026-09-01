import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useStudentList, useStudentById } from '../useStudentQueries'
import type { StudentResponseDto } from '@student-shared'

const STUDENT_ID_FIRST = 1
const STUDENT_ID_SECOND = 2

const MOCK_STUDENTS: StudentResponseDto[] = [
  {
    id: STUDENT_ID_FIRST,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: '1234567890A',
    fullName: 'Jean Dupont',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: STUDENT_ID_SECOND,
    nom: 'Martin',
    prenom: 'Marie',
    classe: '3ème B',
    ine: '0987654321B',
    fullName: 'Marie Martin',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
]

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useStudentList', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({
          success: true,
          data: { students: MOCK_STUDENTS }
        })
      }
    })
  })

  it('fetches student list and transforms to view models', async () => {
    const { result } = renderHook(() => useStudentList(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(MOCK_STUDENTS.length)
    expect(result.current.data?.[0]?.displayName).toBe('Jean Dupont')
  })

  it('throws when ipc result indicates failure', async () => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })

    const { result } = renderHook(() => useStudentList(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})

describe('useStudentById', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        get: vi.fn().mockResolvedValue({
          success: true,
          data: MOCK_STUDENTS[0]
        })
      }
    })
  })

  it('fetches single student by id', async () => {
    const { result } = renderHook(() => useStudentById(STUDENT_ID_FIRST), {
      wrapper: createWrapper()
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.id).toBe(STUDENT_ID_FIRST)
    expect(result.current.data?.displayName).toBe('Jean Dupont')
  })

  it('does not fetch when id is not positive', () => {
    const { result } = renderHook(() => useStudentById(0), { wrapper: createWrapper() })

    expect(result.current.fetchStatus).toBe('idle')
  })

  it('throws when ipc result indicates failure', async () => {
    vi.stubGlobal('electronAPI', {
      student: {
        get: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })

    const { result } = renderHook(() => useStudentById(STUDENT_ID_FIRST), {
      wrapper: createWrapper()
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})
