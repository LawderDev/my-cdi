// Frequentation Model - Business Logic Type (Shared between Frontend and Backend)

export interface FrequentationModel {
  id: number
  startsAt: Date
  activity: string
  studentId: number
  studentName: string // Computed: "prenom nom"
  studentClass: string
}

// Validation result
export interface FrequentationValidationResult {
  isValid: boolean
  errors: string[]
}

// Duration calculation result
export interface FrequentationDuration {
  hours: number
  minutes: number
  formatted: string // "2h 30min"
}

// Frequentation business operations interface
export interface FrequentationBusinessModel extends FrequentationModel {
  // Business methods
  validate(): FrequentationValidationResult
  getDuration(): FrequentationDuration
  getFormattedStartTime(): string
  getStudentDisplayName(): string
}
