// Frontend-specific view models and UI state types

import { StudentResponseDto, FrequentationResponseDto } from '../../../shared/types'

// Extended Student model for UI with additional state
export interface StudentViewModel extends StudentResponseDto {
  isSelected?: boolean
  isEditing?: boolean
  isExpanded?: boolean
  // Computed display properties
  displayName: string // "prenom nom"
  classLabel: string // Formatted class name
}

// Extended Frequentation model for UI with additional state
export interface FrequentationViewModel extends FrequentationResponseDto {
  isSelected?: boolean
  isEditing?: boolean
  // Computed display properties
  durationText?: string // "2h 30min"
  statusText?: string // "En cours", "Terminé"
  dateText?: string // Formatted date for display
}

// Form types
export interface StudentFormData {
  nom: string
  prenom: string
  classe: string
}

export interface FrequentationFormData {
  startsAt: string
  activity: string
  studentId: number
}

// Validation errors
export interface FormErrors {
  [key: string]: string[]
}
