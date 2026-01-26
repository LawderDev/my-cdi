import { useState, useEffect } from 'react'
import StudentService from '../services/student.service'
import { studentHelpers } from '../helpers/student.helpers'
import { StudentViewModel } from '../types'

export const useStudentsData = () => {
  const [students, setStudents] = useState<StudentViewModel[]>([])
  const [editing, setEditing] = useState<StudentViewModel | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const result = await StudentService.getAll()
      const viewModels = studentHelpers.toViewModels(result.students)
      setStudents(viewModels)
    } catch (err) {
      setError('Erreur lors du chargement des étudiants')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const openEdit = (student: StudentViewModel): void => setEditing(student)
  const closeEdit = (): void => setEditing(null)

  const handleSave = async (): Promise<void> => {
    if (!editing) return

    try {
      setError(null)
      await StudentService.updateLegacy(editing.id, {
        nom: editing.nom,
        prenom: editing.prenom,
        classe: editing.classe
      })
      closeEdit()
      await fetchAll()
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'étudiant")
      console.error('Error updating student:', err)
    }
  }

  const updateEditingStudent = (updates: Partial<StudentViewModel>): void => {
    if (!editing) return
    setEditing({ ...editing, ...updates })
  }

  const openDelete = (id: number): void => setDeleting(id)
  const closeDelete = (): void => setDeleting(null)

  const confirmDelete = async (): Promise<void> => {
    if (!deleting) return

    try {
      setError(null)
      await StudentService.deleteLegacy([deleting])
      closeDelete()
      await fetchAll()
    } catch (err) {
      setError("Erreur lors de la suppression de l'étudiant")
      console.error('Error deleting student:', err)
    }
  }

  const createStudent = async (studentData: {
    nom: string
    prenom: string
    classe: string
  }): Promise<boolean> => {
    try {
      setError(null)
      const result = await StudentService.create(studentData)
      if (result.success) {
        await fetchAll()
        return true
      } else {
        setError(result.error || 'Erreur lors de la création')
        return false
      }
    } catch (err) {
      setError("Erreur lors de la création de l'étudiant")
      console.error('Error creating student:', err)
      return false
    }
  }

  return {
    students,
    editing,
    deleting,
    loading,
    error,
    fetchAll,
    createStudent,
    openEdit,
    closeEdit,
    handleSave,
    updateEditingStudent,
    openDelete,
    closeDelete,
    confirmDelete
  }
}
