import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import StudentService from '../../../lib/api/student.service'
import { studentHelpers } from '../../../lib/utils/student.helpers'
import { StudentViewModel } from '../../../types'
import type { CreateStudentDto } from '@shared/types'

export const useStudentsData = (): {
  students: StudentViewModel[]
  editing: StudentViewModel | null
  deleting: number | null
  loading: boolean
  error: string | null
  createStudent: (studentData: CreateStudentDto) => Promise<boolean>
  openEdit: (student: StudentViewModel) => void
  closeEdit: () => void
  handleSave: () => Promise<void>
  updateEditingStudent: (updates: Partial<StudentViewModel>) => void
  openDelete: (id: number) => void
  closeDelete: () => void
  confirmDelete: () => Promise<void>
} => {
  const [editing, setEditing] = useState<StudentViewModel | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)
  const queryClient = useQueryClient()

  const {
    data: students = [],
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const result = await StudentService.getAll()
      return studentHelpers.toViewModels(result.students)
    }
  })

  const createMutation = useMutation({
    mutationFn: async (studentData: CreateStudentDto) => {
      const result = await StudentService.create(studentData)
      if (!result.success) throw new Error(result.error || 'Failed to create student')
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['journal'] })
    }
  })

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: number
      data: { nom: string; prenom: string; classe: string }
    }) => {
      const result = await StudentService.updateLegacy(id, data)
      if (!result.success) throw new Error(result.error || 'Failed to update student')
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['journal'] })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const result = await StudentService.deleteLegacy(ids)
      if (!result.success) throw new Error(result.error || 'Failed to delete students')
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['journal'] })
    }
  })

  const createStudent = async (studentData: CreateStudentDto): Promise<boolean> => {
    try {
      await createMutation.mutateAsync(studentData)
      return true
    } catch (err) {
      console.error('Error creating student:', err)
      return false
    }
  }

  const openEdit = (student: StudentViewModel): void => setEditing(student)
  const closeEdit = (): void => setEditing(null)

  const handleSave = async (): Promise<void> => {
    if (!editing) return
    try {
      await updateMutation.mutateAsync({
        id: editing.id,
        data: { nom: editing.nom, prenom: editing.prenom, classe: editing.classe }
      })
      closeEdit()
    } catch (err) {
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
      await deleteMutation.mutateAsync([deleting])
      closeDelete()
    } catch (err) {
      console.error('Error deleting student:', err)
    }
  }

  return {
    students,
    editing,
    deleting,
    loading,
    error: error ? 'Erreur lors du chargement des étudiants' : null,
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
