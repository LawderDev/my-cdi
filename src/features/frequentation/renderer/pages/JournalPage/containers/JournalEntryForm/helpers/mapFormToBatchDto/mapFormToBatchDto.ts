import dayjs from 'dayjs'
import type { CreateFrequentationBatchDto } from '@frequentation-shared'
import type { JournalEntryFormData } from '../../types/JournalEntryFormData'

export function mapFormToBatchDto(form: JournalEntryFormData): CreateFrequentationBatchDto {
  const startsAt = dayjs(form.startsAt).toISOString()

  return {
    frequentations: form.studentIds.map((studentId) => ({
      startsAt,
      activity: form.activity,
      studentId
    }))
  }
}
