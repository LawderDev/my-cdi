import { describe, it, expect } from 'vitest'
import { journalEntryFormSchema } from '../journalEntryFormSchema'
import { ActivityType } from '@types'

const FIRST_ID = 1
const SECOND_ID = 2

describe('journalEntryFormSchema', () => {
  it('accepts a valid form value', () => {
    expect(
      journalEntryFormSchema.safeParse({
        studentIds: [FIRST_ID, SECOND_ID],
        activity: ActivityType.WORK
      }).success
    ).toBe(true)
  })

  it('rejects empty studentIds', () => {
    expect(
      journalEntryFormSchema.safeParse({ studentIds: [], activity: ActivityType.WORK }).success
    ).toBe(false)
  })

  it('rejects unknown activity', () => {
    expect(
      journalEntryFormSchema.safeParse({ studentIds: [FIRST_ID], activity: 'BOGUS' }).success
    ).toBe(false)
  })
})
