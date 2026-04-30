import type { StudentSortConfig, StudentSortField } from '@student/types'

const SORT_INDICATOR_ASC = ' ↑'
const SORT_INDICATOR_DESC = ' ↓'

export function renderSortIndicator(current: StudentSortConfig, field: StudentSortField): string {
  if (current.field !== field) {
    return ''
  }
  return current.direction === 'asc' ? SORT_INDICATOR_ASC : SORT_INDICATOR_DESC
}
