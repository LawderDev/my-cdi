import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useToast } from '@ui/hooks/useToast'
import { useStudentList } from '@student/api/useStudentQueries'
import { useCreateStudent, useUpdateStudent } from '@student/api/useStudentMutations'
import { studentFormSchema } from '../../validations/studentFormSchema'
import { mapFormToCreateDto, mapFormToUpdateDto } from '../../helpers/mapFormToCreateDto'
import { findStudentByIne } from './helpers/findStudentByIne'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from '../../types/StudentFormData'

const EMPTY_FORM_VALUES: StudentFormData = {
  nom: '',
  prenom: '',
  classe: '',
  ine: ''
}

export type StudentFormMode = 'create' | 'edit'

interface PendingReplace {
  student: StudentViewModel
  data: StudentFormData
}

function buildFormValues(student: StudentViewModel | null): StudentFormData {
  if (!student) {
    return EMPTY_FORM_VALUES
  }
  return {
    nom: student.nom,
    prenom: student.prenom,
    classe: student.classe,
    ine: student.ine
  }
}

interface UseStudentFormArgs {
  mode: StudentFormMode
  student: StudentViewModel | null
  onClose: () => void
}

export function useStudentForm({ mode, student, onClose }: UseStudentFormArgs) {
  const { t } = useTranslation('student')
  const { t: tCommon } = useTranslation('common')
  const { mutate: createStudent } = useCreateStudent()
  const { mutate: updateStudent } = useUpdateStudent()
  const { data: students } = useStudentList()
  const { toast, show, dismiss } = useToast()
  const [pendingReplace, setPendingReplace] = useState<PendingReplace | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    values: buildFormValues(student)
  })

  // The form re-renders on INE changes so the duplicate info can update live;
  // useWatch is forbidden by the guidelines, so watch('ine') scopes the
  // subscription to this single field.
  const ineValue = watch('ine')
  const duplicateStudent = findStudentByIne(students ?? [], ineValue, student?.id)

  function closeForm() {
    reset()
    setPendingReplace(null)
    onClose()
  }

  function handleClose() {
    closeForm()
  }

  function handleFormSubmit(data: StudentFormData) {
    if (mode === 'create') {
      const duplicate = findStudentByIne(students ?? [], data.ine)
      if (duplicate) {
        setPendingReplace({ student: duplicate, data })
        return
      }
      createStudent(mapFormToCreateDto(data), {
        onSuccess: () => {
          show(t('createSuccess'))
          closeForm()
        },
        onError: (error: Error) => {
          show(error.message, 'error')
        }
      })
      return
    }
    if (student) {
      updateStudent(
        { id: student.id, data: mapFormToUpdateDto(student, data) },
        {
          onSuccess: () => {
            show(t('updateSuccess'))
            closeForm()
          },
          onError: (error: Error) => {
            show(error.message, 'error')
          }
        }
      )
    }
  }

  function confirmReplace() {
    if (pendingReplace === null) {
      return
    }
    const { student: existing, data } = pendingReplace
    updateStudent(
      { id: existing.id, data: mapFormToUpdateDto(existing, data) },
      {
        onSuccess: () => {
          show(t('replaceSuccess'))
          closeForm()
        },
        onError: (error: Error) => {
          show(error.message, 'error')
        }
      }
    )
  }

  function cancelReplace() {
    setPendingReplace(null)
  }

  const title = mode === 'create' ? t('add') : t('edit')
  const submitLabel = mode === 'create' ? tCommon('app.add') : tCommon('app.save')

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(handleFormSubmit),
    handleClose,
    title,
    submitLabel,
    duplicateStudent,
    pendingReplaceStudent: pendingReplace?.student ?? null,
    confirmReplace,
    cancelReplace,
    toast,
    dismissToast: dismiss
  }
}
