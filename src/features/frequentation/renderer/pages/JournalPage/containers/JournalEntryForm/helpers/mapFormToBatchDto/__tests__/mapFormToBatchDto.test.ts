import { describe, it, expect } from 'vitest'
import { mapFormToBatchDto } from '../mapFormToBatchDto'
import { ActivityType } from '@types'

const FIRST_ID = 1
const SECOND_ID = 2
const EXPECTED_COUNT = 2

describe('mapFormToBatchDto', () => {
  it('combines selectedDate with the form time into a batch DTO', () => {
    const result = mapFormToBatchDto(
      { studentIds: [FIRST_ID, SECOND_ID], activity: ActivityType.WORK, time: '10:30' },
      '2026-04-01'
    )
    expect(result.frequentations).toHaveLength(EXPECTED_COUNT)
    const [first] = result.frequentations
    if (!first) {
      throw new Error('Expected at least one frequentation in the batch')
    }
    expect(first.activity).toBe(ActivityType.WORK)
    expect(first.studentId).toBe(FIRST_ID)
    expect(first.startsAt).toMatch(/^2026-04-01T/)
  })
})
