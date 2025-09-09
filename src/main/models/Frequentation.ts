export class Frequentation {
  id: number
  starts_at: string
  activity: string
  created_at: string
  student_id: number
  // Données jointes de l'étudiant
  nom: string
  prenom: string
  classe: string

  constructor(
    id: number,
    starts_at: string,
    activity: string,
    created_at: string,
    student_id: number,
    nom: string,
    prenom: string,
    classe: string
  ) {
    this.id = id
    this.starts_at = starts_at
    this.activity = activity
    this.created_at = created_at
    this.student_id = student_id
    this.nom = nom
    this.prenom = prenom
    this.classe = classe
  }

  // Méthodes utilitaires
  getStudentFullName(): string {
    return `${this.prenom} ${this.nom}`
  }

  getStartTime(): Date {
    return new Date(this.starts_at)
  }

  getFormattedStartTime(): string {
    return this.getStartTime().toLocaleString('fr-FR')
  }

  getDuration(endTime?: Date): number {
    const start = this.getStartTime()
    const end = endTime || new Date()
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60)) // minutes
  }

  static fromDbRow(row: Record<string, unknown>): Frequentation {
    return new Frequentation(
      row.id as number,
      row.starts_at as string,
      row.activity as string,
      row.created_at as string,
      row.student_id as number,
      row.nom as string,
      row.prenom as string,
      row.classe as string
    )
  }

  toJSON(): object {
    return {
      id: this.id,
      starts_at: this.starts_at,
      activity: this.activity,
      created_at: this.created_at,
      student_id: this.student_id,
      student: {
        id: this.student_id,
        nom: this.nom,
        prenom: this.prenom,
        classe: this.classe,
        fullName: this.getStudentFullName()
      },
      formattedStartTime: this.getFormattedStartTime()
    }
  }

  // Validation
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!this.activity?.trim()) {
      errors.push('L\'activité est requise')
    }

    if (!this.starts_at) {
      errors.push('L\'heure de début est requise')
    }

    if (!this.student_id || this.student_id <= 0) {
      errors.push('L\'ID de l\'étudiant est requis')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
