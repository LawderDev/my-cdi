import dayjs from 'dayjs'
import type { CreateFrequentationBatchDto } from '@frequentation-shared'
import type { JournalEntryFormData } from '../../types/JournalEntryFormData'

const DEFAULT_HOUR = 9
const DEFAULT_MINUTE = 0
const DEFAULT_SECOND = 0
const DEFAULT_MILLISECOND = 0

export function mapFormToBatchDto(
  form: JournalEntryFormData,
  selectedIsoDate: string
): CreateFrequentationBatchDto {
  const startsAt = dayjs(selectedIsoDate)
    .hour(DEFAULT_HOUR)
    .minute(DEFAULT_MINUTE)
    .second(DEFAULT_SECOND)
    .millisecond(DEFAULT_MILLISECOND)
    .toISOString()

  return {
    frequentations: form.studentIds.map((studentId) => ({
      startsAt,
      activity: form.activity,
      studentId
    }))
  }
}
