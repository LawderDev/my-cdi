import type { StudentSortConfig, StudentSortField } from '@student/types'

export function buildNextSortConfig(
  current: StudentSortConfig,
  field: StudentSortField
): StudentSortConfig {
  const isCurrentField = current.field === field
  const direction = isCurrentField && current.direction === 'asc' ? 'desc' : 'asc'
  return { field, direction }
}
