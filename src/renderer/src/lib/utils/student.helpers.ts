import { StudentResponseDto, CreateStudentDto } from '@shared/types'
import { StudentViewModel } from '../../types/view.models'

export const studentHelpers = {
  // Transform DTO to ViewModel
  toViewModel(dto: StudentResponseDto): StudentViewModel {
    return {
      ...dto,
      displayName: `${dto.prenom} ${dto.nom}`.trim(),
      classLabel: dto.classe,
      isSelected: false,
      isEditing: false,
      isExpanded: false
    }
  },

  // Transform DTO array to ViewModel array
  toViewModels(dtos: StudentResponseDto[]): StudentViewModel[] {
    return dtos.map((dto) => this.toViewModel(dto))
  },

  // Validate student form data
  validateForm(data: Partial<CreateStudentDto>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.nom || data.nom.trim().length === 0) {
      errors.push('Le nom est obligatoire')
    } else if (data.nom.trim().length > 100) {
      errors.push('Le nom ne peut pas dépasser 100 caractères')
    }

    if (!data.prenom || data.prenom.trim().length === 0) {
      errors.push('Le prénom est obligatoire')
    } else if (data.prenom.trim().length > 100) {
      errors.push('Le prénom ne peut pas dépasser 100 caractères')
    }

    if (!data.classe || data.classe.trim().length === 0) {
      errors.push('La classe est obligatoire')
    } else if (data.classe.trim().length > 50) {
      errors.push('La classe ne peut pas dépasser 50 caractères')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
