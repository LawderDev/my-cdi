import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useStudentListData } from '../useStudentListData'
import type { StudentResponseDto } from '@student-shared'

const STUDENT_ID_FIRST = 1
const STUDENT_ID_SECOND = 2
const STUDENT_ID_THIRD = 3
const STUDENT_COUNT = 3
const SINGLE_RESULT = 1

const MOCK_DTOS: StudentResponseDto[] = [
  {
    id: STUDENT_ID_FIRST,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: '111A',
    fullName: 'Jean Dupont',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: STUDENT_ID_SECOND,
    nom: 'Martin',
    prenom: 'Marie',
    classe: '3ème B',
    ine: '222B',
    fullName: 'Marie Martin',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: STUDENT_ID_THIRD,
    nom: 'Bernard',
    prenom: 'Luc',
    classe: '4ème C',
    ine: '333C',
    fullName: 'Luc Bernard',
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

describe('useStudentListData', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({ success: true, data: { students: MOCK_DTOS } })
      }
    })
  })

  it('fetches and returns students as view models', async () => {
    const { result } = renderHook(() => useStudentListData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.students.length).toBe(STUDENT_COUNT))

    expect(result.current.students[0]?.displayName).toBe('Jean Dupont')
  })

  it('filters students by search term', async () => {
    const { result } = renderHook(() => useStudentListData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.students.length).toBeGreaterThan(0))

    act(() => {
      result.current.setSearchTerm('dup')
    })

    expect(result.current.filteredStudents.length).toBe(SINGLE_RESULT)
    expect(result.current.filteredStudents[0]?.nom).toBe('Dupont')
  })

  it('sorts students by field', async () => {
    const { result } = renderHook(() => useStudentListData(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.students.length).toBeGreaterThan(0))

    act(() => {
      result.current.setSortConfig({ field: 'prenom', direction: 'asc' })
    })

    expect(result.current.filteredStudents[0]?.prenom).toBe('Jean')
  })

  it('returns loading state', async () => {
    const { result } = renderHook(() => useStudentListData(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })
})
