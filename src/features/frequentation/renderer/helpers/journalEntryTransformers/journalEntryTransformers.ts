import type { JournalEntryDto } from '@frequentation-shared'
import type { ActivityType } from '@types'
import type { JournalEntryViewModel } from '@frequentation/types'
import { getActivityColor } from '@frequentation/helpers/activityFormatters'

const DISPLAY_NAME_SEPARATOR = ' '

export function toJournalEntryViewModel(
  dto: JournalEntryDto,
  activityLabelLookup: (activity: ActivityType) => string
): JournalEntryViewModel {
  return {
    id: dto.frequentation.id,
    startsAt: dto.frequentation.startsAt,
    activity: dto.frequentation.activity,
    student: {
      ...dto.student,
      displayName: `${dto.student.prenom.trim()}${DISPLAY_NAME_SEPARATOR}${dto.student.nom.trim()}`
    },
    activityLabel: activityLabelLookup(dto.frequentation.activity),
    activityColor: getActivityColor(dto.frequentation.activity)
  }
}
