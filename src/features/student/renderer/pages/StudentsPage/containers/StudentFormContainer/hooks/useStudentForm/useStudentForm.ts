import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCreateStudent, useUpdateStudent } from '@student/api/useStudentMutations'
import { studentFormSchema } from '../../validations/studentFormSchema'
import { mapFormToCreateDto, mapFormToUpdateDto } from '../../helpers/mapFormToCreateDto'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from '../../types/StudentFormData'

const EMPTY_FORM_VALUES: StudentFormData = {
  nom: '',
  prenom: '',
  classe: '',
  ine: ''
}

export type StudentFormMode = 'create' | 'edit'

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    values: buildFormValues(student)
  })

  function handleClose() {
    reset()
    onClose()
  }

  function handleFormSubmit(data: StudentFormData) {
    if (mode === 'create') {
      createStudent(mapFormToCreateDto(data), {
        onSuccess: () => {
          reset()
          onClose()
        }
      })
      return
    }
    if (student) {
      updateStudent(
        { id: student.id, data: mapFormToUpdateDto(student, data) },
        {
          onSuccess: () => {
            onClose()
          }
        }
      )
    }
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
    submitLabel
  }
}
