import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudentFilters } from '../useStudentFilters'

describe('useStudentFilters', () => {
  it('initializes with empty search and no class filter', () => {
    const { result } = renderHook(() => useStudentFilters())
    expect(result.current.searchTerm).toBe('')
    expect(result.current.classeFilter).toBeNull()
  })

  it('updates search term', () => {
    const { result } = renderHook(() => useStudentFilters())
    act(() => result.current.setSearchTerm('Dupont'))
    expect(result.current.searchTerm).toBe('Dupont')
  })

  it('updates classe filter', () => {
    const { result } = renderHook(() => useStudentFilters())
    act(() => result.current.setClasseFilter('3ème A'))
    expect(result.current.classeFilter).toBe('3ème A')
  })

  it('clears all filters', () => {
    const { result } = renderHook(() => useStudentFilters())
    act(() => {
      result.current.setSearchTerm('x')
      result.current.setClasseFilter('y')
    })
    act(() => result.current.clearFilters())
    expect(result.current.searchTerm).toBe('')
    expect(result.current.classeFilter).toBeNull()
  })
})
