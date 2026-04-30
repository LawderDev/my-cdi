import type { CreateStudentDto, UpdateStudentDto } from '@student-shared'
import type { StudentFormData } from '../../types/StudentFormData'

interface OriginalStudentValues {
  nom: string
  prenom: string
  classe: string
  ine: string
}

export function mapFormToCreateDto(formData: StudentFormData): CreateStudentDto {
  return {
    nom: formData.nom.trim(),
    prenom: formData.prenom.trim(),
    classe: formData.classe.trim(),
    ine: formData.ine.trim()
  }
}

export function mapFormToUpdateDto(
  original: OriginalStudentValues,
  formData: StudentFormData
): UpdateStudentDto {
  const result: UpdateStudentDto = {}

  const nextNom = formData.nom.trim()
  if (nextNom !== original.nom) {
    result.nom = nextNom
  }

  const nextPrenom = formData.prenom.trim()
  if (nextPrenom !== original.prenom) {
    result.prenom = nextPrenom
  }

  const nextClasse = formData.classe.trim()
  if (nextClasse !== original.classe) {
    result.classe = nextClasse
  }

  const nextIne = formData.ine.trim()
  if (nextIne !== original.ine) {
    result.ine = nextIne
  }

  return result
}
