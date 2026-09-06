import { describe, it, expect } from 'vitest'
import { toJournalEntryViewModel } from '../journalEntryTransformers'
import { theme } from '@ui/theme'
import { ActivityType } from '@types'
import type { JournalEntryDto } from '@frequentation-shared'

const STUDENT_ID = 7

const journalEntryDtoStub: JournalEntryDto = {
  frequentation: {
    id: 1,
    startsAt: '2026-04-01T09:00:00.000Z',
    activity: ActivityType.WORK,
    studentId: STUDENT_ID,
    studentName: 'Jean Dupont',
    studentClass: '3ème A',
    studentIne: 'INE-1',
    createdAt: '2026-04-01T09:00:00.000Z',
    updatedAt: '2026-04-01T09:00:00.000Z'
  },
  student: {
    id: STUDENT_ID,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: 'INE-1'
  }
}

describe('toJournalEntryViewModel', () => {
  it('produces a view model with displayName and label/color', () => {
    const labelLookup = (a: ActivityType) => `LABEL_${a}`
    const result = toJournalEntryViewModel(journalEntryDtoStub, labelLookup, theme.palette.activity)

    expect(result.id).toBe(1)
    expect(result.activity).toBe(ActivityType.WORK)
    expect(result.student.displayName).toBe('Jean Dupont')
    expect(result.activityLabel).toBe(`LABEL_${ActivityType.WORK}`)
    expect(result.activityColor).toMatch(/^#/)
  })
})
