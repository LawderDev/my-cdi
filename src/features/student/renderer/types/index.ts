import type { StudentResponseDto } from '@student-shared'

export interface StudentViewModel extends StudentResponseDto {
  displayName: string
  classLabel: string
}

export type StudentSortField = 'nom' | 'prenom' | 'classe' | 'ine'

export type SortDirection = 'asc' | 'desc'

export interface StudentSortConfig {
  field: StudentSortField
  direction: SortDirection
}

export interface StudentFilterCriteria {
  searchTerm: string
}
