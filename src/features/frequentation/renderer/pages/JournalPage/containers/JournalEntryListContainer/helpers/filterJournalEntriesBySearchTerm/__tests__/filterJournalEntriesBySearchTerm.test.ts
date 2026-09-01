import { describe, it, expect } from 'vitest'
import { filterJournalEntriesBySearchTerm } from '../filterJournalEntriesBySearchTerm'
import { ActivityType } from '@types'
import type { JournalEntryViewModel } from '@frequentation/types'

const FIRST_ID = 1
const SECOND_ID = 2
const STUDENT_ID = 7

function buildEntry(
  id: number,
  startsAt: string,
  overrides: Partial<JournalEntryViewModel['student'] & { activityLabel?: string }> = {}
): JournalEntryViewModel {
  return {
    id,
    startsAt,
    activity: ActivityType.WORK,
    student: {
      id: STUDENT_ID,
      nom: overrides.nom ?? 'Dupont',
      prenom: overrides.prenom ?? 'Jean',
      classe: overrides.classe ?? '3A',
      ine: 'INE-1',
      displayName: `${overrides.prenom ?? 'Jean'} ${overrides.nom ?? 'Dupont'}`
    },
    activityLabel: overrides.activityLabel ?? 'Travail',
    activityColor: '#000'
  }
}

describe('filterJournalEntriesBySearchTerm', () => {
  const morningEntry = buildEntry(FIRST_ID, '2026-04-30T09:00:00', {
    prenom: 'Jean',
    nom: 'Dupont',
    classe: '3A',
    activityLabel: 'Travail'
  })
  const afternoonEntry = buildEntry(SECOND_ID, '2026-04-30T14:30:00', {
    prenom: 'Marie',
    nom: 'Martin',
    classe: '4B',
    activityLabel: 'Lecture'
  })
  const all = [morningEntry, afternoonEntry]

  it('returns all entries when search term is empty', () => {
    expect(filterJournalEntriesBySearchTerm(all, '')).toEqual(all)
    expect(filterJournalEntriesBySearchTerm(all, '   ')).toEqual(all)
  })

  it('filters by student display name (case-insensitive)', () => {
    expect(filterJournalEntriesBySearchTerm(all, 'jean')).toEqual([morningEntry])
    expect(filterJournalEntriesBySearchTerm(all, 'MARIE')).toEqual([afternoonEntry])
    expect(filterJournalEntriesBySearchTerm(all, 'dupont')).toEqual([morningEntry])
  })

  it('filters by classe (case-insensitive)', () => {
    expect(filterJournalEntriesBySearchTerm(all, '3A')).toEqual([morningEntry])
    expect(filterJournalEntriesBySearchTerm(all, '4b')).toEqual([afternoonEntry])
  })

  it('filters by activity label (case-insensitive)', () => {
    expect(filterJournalEntriesBySearchTerm(all, 'travail')).toEqual([morningEntry])
    expect(filterJournalEntriesBySearchTerm(all, 'LECTURE')).toEqual([afternoonEntry])
  })

  it('filters by time', () => {
    expect(filterJournalEntriesBySearchTerm(all, '09:00')).toEqual([morningEntry])
    expect(filterJournalEntriesBySearchTerm(all, '14:30')).toEqual([afternoonEntry])
  })

  it('returns empty array when no entry matches', () => {
    expect(filterJournalEntriesBySearchTerm(all, 'zzz')).toEqual([])
  })
})
