import type {
  StudentViewModel,
  StudentSortConfig,
  StudentSortField,
  SortDirection
} from '@student/types'

const COLLATOR = new Intl.Collator('fr', { sensitivity: 'base' })

function getFieldValue(student: StudentViewModel, field: StudentSortField): string {
  return student[field]
}

function compareByField(field: StudentSortField, direction: SortDirection) {
  return (a: StudentViewModel, b: StudentViewModel): number => {
    const aValue = getFieldValue(a, field)
    const bValue = getFieldValue(b, field)
    const comparison = COLLATOR.compare(aValue, bValue)
    return direction === 'asc' ? comparison : -comparison
  }
}

export function sortStudentRows(
  students: StudentViewModel[],
  config: StudentSortConfig
): StudentViewModel[] {
  return [...students].sort(compareByField(config.field, config.direction))
}
