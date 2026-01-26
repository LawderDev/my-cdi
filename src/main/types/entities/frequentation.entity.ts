// Frequentation Entity - Database Row Structure (Backend Only)
export interface FrequentationEntity {
  id: number
  starts_at: string // ISO string from database
  activity: string
  student_id: number
  created_at: string // ISO string from database
  updated_at: string // ISO string from database
}

// For JOIN queries that include student data
export interface FrequentationWithStudentEntity {
  id: number
  starts_at: string
  activity: string
  student_id: number
  nom: string // student.nom
  prenom: string // student.prenom
  classe: string // student.classe
  created_at: string
  updated_at: string
}

// Database row validation types
export interface FrequentationDbRow {
  id: number
  starts_at: string
  activity: string
  student_id: number
  created_at: string
  updated_at: string
}

export interface FrequentationWithStudentDbRow extends FrequentationDbRow {
  nom: string
  prenom: string
  classe: string
}
