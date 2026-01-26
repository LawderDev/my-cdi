// Student Model - Business Logic Type (Shared between Frontend and Backend)

export interface StudentModel {
  id: number
  nom: string
  prenom: string
  classe: string
  fullName: string // Computed property
}

// Validation result
export interface StudentValidationResult {
  isValid: boolean
  errors: string[]
}

// Student business operations interface
export interface StudentBusinessModel extends StudentModel {
  // Business methods can be defined here as interfaces for implementation
  validate(): StudentValidationResult
  getDisplayName(): string
}
