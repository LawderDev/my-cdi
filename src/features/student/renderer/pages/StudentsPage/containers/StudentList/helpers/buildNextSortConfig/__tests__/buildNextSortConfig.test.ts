import { describe, it, expect } from 'vitest'
import { buildNextSortConfig } from '../buildNextSortConfig'

describe('buildNextSortConfig', () => {
  it('toggles asc to desc when clicking the active field', () => {
    expect(buildNextSortConfig({ field: 'nom', direction: 'asc' }, 'nom')).toEqual({
      field: 'nom',
      direction: 'desc'
    })
  })

  it('resets to asc when clicking the active field while desc', () => {
    expect(buildNextSortConfig({ field: 'nom', direction: 'desc' }, 'nom')).toEqual({
      field: 'nom',
      direction: 'asc'
    })
  })

  it('switches field and starts asc when clicking a different field', () => {
    expect(buildNextSortConfig({ field: 'nom', direction: 'desc' }, 'classe')).toEqual({
      field: 'classe',
      direction: 'asc'
    })
  })
})
