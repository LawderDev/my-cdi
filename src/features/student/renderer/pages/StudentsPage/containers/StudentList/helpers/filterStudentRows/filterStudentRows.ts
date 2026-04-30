import type { StudentViewModel } from '@student/types'

function matchesSearchTerm(student: StudentViewModel, term: string): boolean {
  const lowerTerm = term.toLowerCase()
  return (
    student.nom.toLowerCase().includes(lowerTerm) ||
    student.prenom.toLowerCase().includes(lowerTerm) ||
    student.classe.toLowerCase().includes(lowerTerm) ||
    student.ine.toLowerCase().includes(lowerTerm)
  )
}

export function filterStudentRows(
  students: StudentViewModel[],
  searchTerm: string
): StudentViewModel[] {
  const trimmedTerm = searchTerm.trim()
  if (trimmedTerm.length === 0) {
    return students
  }
  return students.filter((student) => matchesSearchTerm(student, trimmedTerm))
}
