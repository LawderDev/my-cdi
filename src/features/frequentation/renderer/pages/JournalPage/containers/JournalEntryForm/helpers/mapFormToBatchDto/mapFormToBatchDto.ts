import dayjs from 'dayjs'
import type { CreateFrequentationBatchDto } from '@frequentation-shared'
import type { JournalEntryFormData } from '../../types/JournalEntryFormData'

const TIME_PARTS_COUNT = 2
const ZERO = 0

function parseHourMinute(time: string): { hour: number; minute: number } {
  const parts = time.split(':')
  if (parts.length !== TIME_PARTS_COUNT) {
    return { hour: ZERO, minute: ZERO }
  }
  const [hourPart, minutePart] = parts
  const hour = Number.parseInt(hourPart ?? '', 10)
  const minute = Number.parseInt(minutePart ?? '', 10)
  return {
    hour: Number.isFinite(hour) ? hour : ZERO,
    minute: Number.isFinite(minute) ? minute : ZERO
  }
}

export function mapFormToBatchDto(
  form: JournalEntryFormData,
  selectedIsoDate: string
): CreateFrequentationBatchDto {
  const { hour, minute } = parseHourMinute(form.time)
  const startsAt = dayjs(selectedIsoDate)
    .hour(hour)
    .minute(minute)
    .second(ZERO)
    .millisecond(ZERO)
    .toISOString()

  return {
    frequentations: form.studentIds.map((studentId) => ({
      startsAt,
      activity: form.activity,
      studentId
    }))
  }
}
