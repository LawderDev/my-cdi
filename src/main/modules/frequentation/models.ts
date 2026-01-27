// Frequentation Module Models
// Object-based business models (no classes)

import {
  FrequentationModel,
  FrequentationBusinessModel,
  FrequentationValidationResult,
  FrequentationDuration
} from '../../../shared/types/models/frequentation.model'

// Create a frequentation model from raw data
export function createFrequentationModel(
  id: number,
  startsAt: Date,
  activity: string,
  studentId: number,
  studentName: string,
  studentClass: string
): FrequentationModel {
  return {
    id,
    startsAt,
    activity,
    studentId,
    studentName,
    studentClass
  }
}

// Create a frequentation model from entity data with student info
export function createFrequentationModelFromEntityWithStudent(entity: {
  id: number
  starts_at: string
  activity: string
  student_id: number
  nom: string
  prenom: string
  classe: string
}): FrequentationModel {
  return createFrequentationModel(
    entity.id,
    new Date(entity.starts_at),
    entity.activity,
    entity.student_id,
    `${entity.prenom} ${entity.nom}`.trim(),
    entity.classe
  )
}

// Create a frequentation model from entity data (without student info)
export function createFrequentationModelFromEntity(entity: {
  id: number
  starts_at: string
  activity: string
  student_id: number
}): FrequentationModel {
  // This would need student info to be complete - in practice, this would be joined
  return createFrequentationModel(
    entity.id,
    new Date(entity.starts_at),
    entity.activity,
    entity.student_id,
    'Unknown Student', // Placeholder - should be populated from JOIN
    'Unknown Class' // Placeholder - should be populated from JOIN
  )
}

// Business model functions (object-based operations)
export const FrequentationBusinessOperations = {
  // Validate a frequentation object
  validate(frequentation: Partial<FrequentationModel>): FrequentationValidationResult {
    const errors: string[] = []

    // Only validate startsAt if provided
    if (frequentation.startsAt !== undefined) {
      if (!frequentation.startsAt) {
        errors.push('La date et heure de début sont obligatoires')
      } else if (
        frequentation.startsAt instanceof Date &&
        isNaN(frequentation.startsAt.getTime())
      ) {
        errors.push('La date et heure de début ne sont pas valides')
      }
    }

    // Only validate activity if provided
    if (frequentation.activity !== undefined) {
      if (!frequentation.activity?.trim()) {
        errors.push("L'activité est obligatoire")
      } else if (frequentation.activity.trim().length > 100) {
        errors.push("L'activité ne peut pas dépasser 100 caractères")
      }
    }

    // Only validate studentId if provided
    if (frequentation.studentId !== undefined) {
      if (!frequentation.studentId || frequentation.studentId <= 0) {
        errors.push("L'identifiant de l'étudiant est obligatoire")
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Calculate duration (assuming activities have a standard duration)
  getDuration(activityDuration: number = 60): FrequentationDuration {
    const minutes = activityDuration
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    let formatted = ''
    if (hours > 0) {
      formatted += `${hours}h`
    }
    if (remainingMinutes > 0) {
      if (formatted) formatted += ' '
      formatted += `${remainingMinutes}min`
    }

    return {
      hours,
      minutes: remainingMinutes,
      formatted: formatted || '0min'
    }
  },

  // Format start time for display
  getFormattedStartTime(frequentation: FrequentationModel): string {
    return frequentation.startsAt.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  // Get student display name
  getStudentDisplayName(frequentation: FrequentationModel): string {
    return frequentation.studentName
  },

  // Check if frequentation is in date range
  isInDateRange(frequentation: FrequentationModel, start: Date, end: Date): boolean {
    return frequentation.startsAt >= start && frequentation.startsAt <= end
  },

  // Create a business model wrapper
  createBusinessModel(frequentation: FrequentationModel): FrequentationBusinessModel {
    return {
      ...frequentation,
      validate: () => FrequentationBusinessOperations.validate(frequentation),
      getDuration: (activityDuration?: number) =>
        FrequentationBusinessOperations.getDuration(activityDuration || 60),
      getFormattedStartTime: () =>
        FrequentationBusinessOperations.getFormattedStartTime(frequentation),
      getStudentDisplayName: () =>
        FrequentationBusinessOperations.getStudentDisplayName(frequentation)
    }
  }
}

// Utility functions for frequentation collections
export const FrequentationCollectionOperations = {
  // Find frequentation by ID
  findById(frequentations: FrequentationModel[], id: number): FrequentationModel | undefined {
    return frequentations.find((f) => f.id === id)
  },

  // Find frequentations by student ID
  findByStudentId(frequentations: FrequentationModel[], studentId: number): FrequentationModel[] {
    return frequentations.filter((f) => f.studentId === studentId)
  },

  // Find frequentations by date range
  findByDateRange(
    frequentations: FrequentationModel[],
    start: Date,
    end: Date
  ): FrequentationModel[] {
    return frequentations.filter((f) =>
      FrequentationBusinessOperations.isInDateRange(f, start, end)
    )
  },

  // Sort frequentations by start time (most recent first)
  sortByStartTime(frequentations: FrequentationModel[]): FrequentationModel[] {
    return [...frequentations].sort((a, b) => b.startsAt.getTime() - a.startsAt.getTime())
  },

  // Group frequentations by date
  groupByDate(frequentations: FrequentationModel[]): Record<string, FrequentationModel[]> {
    return frequentations.reduce(
      (groups, f) => {
        const dateKey = f.startsAt.toISOString().split('T')[0] // YYYY-MM-DD format
        if (!groups[dateKey]) {
          groups[dateKey] = []
        }
        groups[dateKey].push(f)
        return groups
      },
      {} as Record<string, FrequentationModel[]>
    )
  },

  // Group frequentations by student
  groupByStudent(frequentations: FrequentationModel[]): Record<number, FrequentationModel[]> {
    return frequentations.reduce(
      (groups, f) => {
        const studentId = f.studentId
        if (!groups[studentId]) {
          groups[studentId] = []
        }
        groups[studentId].push(f)
        return groups
      },
      {} as Record<number, FrequentationModel[]>
    )
  },

  // Get statistics
  getStats(frequentations: FrequentationModel[]): {
    total: number
    byActivity: Record<string, number>
    byStudent: Record<number, number>
    dateRange: { earliest: Date | null; latest: Date | null }
  } {
    const byActivity: Record<string, number> = {}
    const byStudent: Record<number, number> = {}

    let earliest: Date | null = null
    let latest: Date | null = null

    frequentations.forEach((f) => {
      // Count by activity
      byActivity[f.activity] = (byActivity[f.activity] || 0) + 1

      // Count by student
      byStudent[f.studentId] = (byStudent[f.studentId] || 0) + 1

      // Track date range
      if (!earliest || f.startsAt < earliest) {
        earliest = f.startsAt
      }
      if (!latest || f.startsAt > latest) {
        latest = f.startsAt
      }
    })

    return {
      total: frequentations.length,
      byActivity,
      byStudent,
      dateRange: { earliest, latest }
    }
  }
}
