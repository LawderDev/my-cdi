import { describe, it, expect } from 'vitest'
import { filterEntriesByPeriod } from '../filterEntriesByPeriod'
import { ActivityType } from '@types'
import type { JournalEntryViewModel } from '@frequentation/types'

const FIRST_ID = 1
const SECOND_ID = 2
const STUDENT_ID = 7

function buildEntry(id: number, startsAt: string): JournalEntryViewModel {
  return {
    id,
    startsAt,
    activity: ActivityType.WORK,
    student: {
      id: STUDENT_ID,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3A',
      ine: 'INE-1',
      displayName: 'Jean Dupont'
    },
    activityLabel: 'Travail',
    activityColor: '#000'
  }
}

describe('filterEntriesByPeriod', () => {
  const morning = buildEntry(FIRST_ID, '2026-04-30T09:00:00')
  const afternoon = buildEntry(SECOND_ID, '2026-04-30T14:00:00')
  const all = [morning, afternoon]

  it('returns the same array when filter is "all"', () => {
    expect(filterEntriesByPeriod(all, 'all')).toEqual(all)
  })

  it('keeps only morning entries when filter is "morning"', () => {
    expect(filterEntriesByPeriod(all, 'morning')).toEqual([morning])
  })

  it('keeps only afternoon entries when filter is "afternoon"', () => {
    expect(filterEntriesByPeriod(all, 'afternoon')).toEqual([afternoon])
  })
})
