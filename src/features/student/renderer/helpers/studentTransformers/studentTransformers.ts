import type { StudentResponseDto } from '@student-shared'
import type { StudentViewModel } from '@student/types'

const DISPLAY_NAME_SEPARATOR = ' '

export function toViewModel(studentData: StudentResponseDto): StudentViewModel {
  return {
    ...studentData,
    displayName: `${studentData.prenom.trim()}${DISPLAY_NAME_SEPARATOR}${studentData.nom.trim()}`,
    classLabel: studentData.classe.trim()
  }
}

export function toViewModelList(students: StudentResponseDto[]): StudentViewModel[] {
  return students.map(toViewModel)
}
