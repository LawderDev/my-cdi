// Student Module Models
// Object-based business models (no classes)

import {
  StudentModel,
  StudentBusinessModel,
  StudentValidationResult
} from '../../../shared/types/models/student.model'

// Create a student model from raw data
export function createStudentModel(
  id: number,
  nom: string,
  prenom: string,
  classe: string
): StudentModel {
  return {
    id,
    nom,
    prenom,
    classe,
    fullName: `${prenom} ${nom}`.trim()
  }
}

// Create a student model from entity data
export function createStudentModelFromEntity(entity: {
  id: number
  nom: string
  prenom: string
  classe: string
}): StudentModel {
  return createStudentModel(entity.id, entity.nom, entity.prenom, entity.classe)
}

// Business model functions (object-based operations)
export const StudentBusinessOperations = {
  // Validate a student object
  validate(student: Partial<StudentModel>): StudentValidationResult {
    const errors: string[] = []

    if (!student.nom?.trim()) {
      errors.push('Le nom est obligatoire')
    } else if (student.nom.trim().length > 100) {
      errors.push('Le nom ne peut pas dépasser 100 caractères')
    }

    if (!student.prenom?.trim()) {
      errors.push('Le prénom est obligatoire')
    } else if (student.prenom.trim().length > 100) {
      errors.push('Le prénom ne peut pas dépasser 100 caractères')
    }

    if (!student.classe?.trim()) {
      errors.push('La classe est obligatoire')
    } else if (student.classe.trim().length > 50) {
      errors.push('La classe ne peut pas dépasser 50 caractères')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Get display name for a student
  getDisplayName(student: StudentModel): string {
    return student.fullName
  },

  // Check if two students are the same person
  isSamePerson(student1: StudentModel, student2: StudentModel): boolean {
    return (
      student1.nom.toLowerCase() === student2.nom.toLowerCase() &&
      student1.prenom.toLowerCase() === student2.prenom.toLowerCase()
    )
  },

  // Get student initials
  getInitials(student: StudentModel): string {
    return `${student.prenom.charAt(0)}${student.nom.charAt(0)}`.toUpperCase()
  },

  // Format student for display
  formatForDisplay(student: StudentModel): string {
    return `${student.prenom} ${student.nom} (${student.classe})`
  },

  // Create a business model wrapper (object with methods)
  createBusinessModel(student: StudentModel): StudentBusinessModel {
    return {
      ...student,
      validate: () => StudentBusinessOperations.validate(student),
      getDisplayName: () => StudentBusinessOperations.getDisplayName(student)
    }
  }
}

// Utility functions for student collections
export const StudentCollectionOperations = {
  // Find student by ID
  findById(students: StudentModel[], id: number): StudentModel | undefined {
    return students.find((student) => student.id === id)
  },

  // Find students by class
  findByClass(students: StudentModel[], classe: string): StudentModel[] {
    return students.filter((student) => student.classe === classe)
  },

  // Sort students by name
  sortByName(students: StudentModel[]): StudentModel[] {
    return [...students].sort((a, b) => {
      const nameA = a.nom.toLowerCase()
      const nameB = b.nom.toLowerCase()
      if (nameA !== nameB) return nameA.localeCompare(nameB)
      return a.prenom.toLowerCase().localeCompare(b.prenom.toLowerCase())
    })
  },

  // Group students by class
  groupByClass(students: StudentModel[]): Record<string, StudentModel[]> {
    return students.reduce(
      (groups, student) => {
        const classe = student.classe
        if (!groups[classe]) {
          groups[classe] = []
        }
        groups[classe].push(student)
        return groups
      },
      {} as Record<string, StudentModel[]>
    )
  },

  // Get statistics
  getStats(students: StudentModel[]): {
    total: number
    byClass: Record<string, number>
    classes: string[]
  } {
    const byClass = StudentCollectionOperations.groupByClass(students)
    const classes = Object.keys(byClass).sort()

    return {
      total: students.length,
      byClass: Object.fromEntries(classes.map((classe) => [classe, byClass[classe].length])),
      classes
    }
  },

  // Check for duplicates
  findDuplicates(students: StudentModel[]): Array<{
    student: StudentModel
    duplicates: StudentModel[]
  }> {
    const duplicates: Array<{
      student: StudentModel
      duplicates: StudentModel[]
    }> = []

    for (let i = 0; i < students.length; i++) {
      const student = students[i]
      const studentDuplicates: StudentModel[] = []

      for (let j = i + 1; j < students.length; j++) {
        if (StudentBusinessOperations.isSamePerson(student, students[j])) {
          studentDuplicates.push(students[j])
        }
      }

      if (studentDuplicates.length > 0) {
        duplicates.push({
          student,
          duplicates: studentDuplicates
        })
      }
    }

    return duplicates
  }
}
