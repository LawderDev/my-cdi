import { useQuery } from '@tanstack/react-query'
import { studentKeys } from '../studentKeys'
import { toViewModel, toViewModelList } from '@student/helpers/studentTransformers'
import type { StudentViewModel } from '@student/types'

const STUDENT_LIST_DEFAULT_FILTERS = {}

async function fetchStudentList(): Promise<StudentViewModel[]> {
  const result = await window.electronAPI.student.list(STUDENT_LIST_DEFAULT_FILTERS)
  if (!result.success) {
    throw new Error(result.error)
  }
  return toViewModelList(result.data.students)
}

async function fetchStudentById(id: number): Promise<StudentViewModel> {
  const result = await window.electronAPI.student.get({ id })
  if (!result.success) {
    throw new Error(result.error)
  }
  return toViewModel(result.data)
}

export function useStudentList() {
  return useQuery({
    queryKey: [...studentKeys.lists()],
    queryFn: fetchStudentList
  })
}

export function useStudentById(id: number) {
  return useQuery({
    queryKey: [...studentKeys.detail(id)],
    queryFn: () => fetchStudentById(id),
    enabled: id > 0
  })
}
