import { FrequentationResponseDto, CreateFrequentationDto } from '@shared/types'
import { FrequentationViewModel } from '../../types/view.models'

export const frequentationHelpers = {
  // Transform DTO to ViewModel
  toViewModel(dto: FrequentationResponseDto): FrequentationViewModel {
    const startTime = new Date(dto.startsAt)
    const now = new Date()
    const diffMs = now.getTime() - startTime.getTime()
    const isOngoing = diffMs >= 0 && diffMs < 24 * 60 * 60 * 1000 // Less than 24 hours

    const hours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60))
    const minutes = Math.floor((Math.abs(diffMs) % (1000 * 60 * 60)) / (1000 * 60))

    return {
      ...dto,
      isSelected: false,
      isEditing: false,
      durationText: isOngoing ? `${hours}h ${minutes}min` : 'Terminé',
      statusText: isOngoing ? 'En cours' : 'Terminé',
      dateText: startTime.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
  },

  // Transform DTO array to ViewModel array
  toViewModels(dtos: FrequentationResponseDto[]): FrequentationViewModel[] {
    return dtos.map((dto) => this.toViewModel(dto))
  },

  // Validate frequentation form data
  validateForm(data: Partial<CreateFrequentationDto>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.startsAt) {
      errors.push('La date de début est obligatoire')
    } else {
      const startDate = new Date(data.startsAt)
      if (isNaN(startDate.getTime())) {
        errors.push('La date de début est invalide')
      } else if (startDate > new Date()) {
        errors.push('La date de début ne peut pas être dans le futur')
      }
    }

    if (!data.activity || data.activity.trim().length === 0) {
      errors.push("L'activité est obligatoire")
    } else if (data.activity.trim().length > 200) {
      errors.push("L'activité ne peut pas dépasser 200 caractères")
    }

    if (!data.studentId || data.studentId <= 0) {
      errors.push("L'étudiant est obligatoire")
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Format duration for display
  formatDuration(startTime: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - startTime.getTime()

    if (diffMs < 0) return 'Non commencé'

    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}min`
  },

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
