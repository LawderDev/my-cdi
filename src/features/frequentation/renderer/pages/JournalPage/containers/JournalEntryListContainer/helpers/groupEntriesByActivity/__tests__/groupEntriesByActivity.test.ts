import { describe, it, expect } from 'vitest'
import { groupEntriesByActivity } from '../groupEntriesByActivity'
import { ActivityType } from '@types'
import type { JournalEntryViewModel } from '@frequentation/types'

const ID_FIRST = 1
const ID_SECOND = 2
const ID_THIRD = 3
const WORK_COUNT = 2
const READING_COUNT = 1

const makeEntry = (
  id: number,
  activity: ActivityType,
  prenom = 'X',
  nom = 'Y'
): JournalEntryViewModel => ({
  id,
  startsAt: '2026-04-01T09:00:00.000Z',
  activity,
  student: { id, nom, prenom, classe: '3A', ine: `INE-${id}`, displayName: `${prenom} ${nom}` },
  activityLabel: '',
  activityColor: ''
})

describe('groupEntriesByActivity', () => {
  it('groups entries by ActivityType', () => {
    const result = groupEntriesByActivity([
      makeEntry(ID_FIRST, ActivityType.WORK),
      makeEntry(ID_SECOND, ActivityType.READING),
      makeEntry(ID_THIRD, ActivityType.WORK)
    ])
    expect(result[ActivityType.WORK]).toHaveLength(WORK_COUNT)
    expect(result[ActivityType.READING]).toHaveLength(READING_COUNT)
  })

  it('returns an empty array for activities with no entries', () => {
    const result = groupEntriesByActivity([])
    expect(result[ActivityType.WORK]).toEqual([])
  })
})
