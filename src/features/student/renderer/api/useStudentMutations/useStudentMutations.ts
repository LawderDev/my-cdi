import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentKeys } from '../studentKeys'
import type { CreateStudentDto, UpdateStudentDto } from '@student-shared'

interface DeleteStudentInput {
  id: number
}

interface UpdateStudentInput {
  id: number
  data: UpdateStudentDto
}

interface ImportStudentsCsvInput {
  csv: string
}

async function createStudent(dto: CreateStudentDto) {
  const result = await window.electronAPI.student.create(dto)
  if (!result.success) {
    throw new Error(result.error)
  }
  return result.data
}

async function updateStudent(input: UpdateStudentInput) {
  const result = await window.electronAPI.student.update({ id: input.id, ...input.data })
  if (!result.success) {
    throw new Error(result.error)
  }
  return result.data
}

async function deleteStudent(input: DeleteStudentInput) {
  const result = await window.electronAPI.student.delete(input)
  if (!result.success) {
    throw new Error(result.error)
  }
  return result.data
}

async function importStudentsCsv(input: ImportStudentsCsvInput) {
  const result = await window.electronAPI.student.importCsv(input)
  if (!result.success) {
    throw new Error(result.error)
  }
  return result.data
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
    }
  })
}

export function useUpdateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
    }
  })
}

interface UseDeleteStudentOptions {
  onSuccess?: () => void
}

export function useDeleteStudent(options: UseDeleteStudentOptions = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
      options.onSuccess?.()
    }
  })
}

export function useImportStudentsCsv() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: importStudentsCsv,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
    }
  })
}
