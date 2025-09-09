export class Student {
  id: number
  nom: string
  prenom: string
  classe: string
  created_at: string
  updated_at: string

  constructor(
    id: number,
    nom: string,
    prenom: string,
    classe: string,
    created_at: string,
    updated_at: string
  ) {
    this.id = id
    this.nom = nom
    this.prenom = prenom
    this.classe = classe
    this.created_at = created_at
    this.updated_at = updated_at
  }

  // Méthodes utilitaires
  getFullName(): string {
    return `${this.prenom} ${this.nom}`
  }

  static fromDbRow(row: Record<string, unknown>): Student {
    return new Student(
      row.id as number,
      row.nom as string,
      row.prenom as string,
      row.classe as string,
      row.created_at as string,
      row.updated_at as string
    )
  }

  toJSON(): object {
    return {
      id: this.id,
      nom: this.nom,
      prenom: this.prenom,
      classe: this.classe,
      fullName: this.getFullName(),
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }

  // Validation
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!this.nom?.trim()) {
      errors.push('Le nom est requis')
    }

    if (!this.prenom?.trim()) {
      errors.push('Le prénom est requis')
    }

    if (!this.classe?.trim()) {
      errors.push('La classe est requise')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
