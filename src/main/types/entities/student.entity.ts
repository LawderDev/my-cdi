// Student Entity - Database Row Structure (Backend Only)
export interface StudentEntity {
  id: number
  nom: string
  prenom: string
  classe: string
  created_at: string // ISO string from database
  updated_at: string // ISO string from database
}

// Database row validation type
export interface StudentDbRow {
  id: number
  nom: string
  prenom: string
  classe: string
  created_at: string
  updated_at: string
}
