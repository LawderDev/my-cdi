import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { studentKeys } from '../studentKeys'
import { toViewModel, toViewModelList } from '@student/helpers/studentTransformers'
import type { StudentViewModel } from '@student/types'

const STUDENT_LIST_DEFAULT_FILTERS = {}

export function useStudentList() {
  const { t } = useTranslation('common')
  return useQuery({
    queryKey: [...studentKeys.lists()],
    queryFn: async (): Promise<StudentViewModel[]> => {
      const result = await window.electronAPI.student.list(STUDENT_LIST_DEFAULT_FILTERS)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return toViewModelList(result.data.students)
    }
  })
}

export function useStudentById(id: number) {
  const { t } = useTranslation('common')
  return useQuery({
    queryKey: [...studentKeys.detail(id)],
    queryFn: async (): Promise<StudentViewModel> => {
      const result = await window.electronAPI.student.get({ id })
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return toViewModel(result.data)
    },
    enabled: id > 0
  })
}
