import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Modal } from '@ui/components/Modal'
import { useCreateStudent, useUpdateStudent } from '@student/api/useStudentMutations'
import { studentFormSchema } from './validations/studentFormSchema'
import { mapFormToCreateDto, mapFormToUpdateDto } from './helpers/mapFormToCreateDto'
import { StudentFormFields } from './components/StudentFormFields'
import { StudentFormActions } from './components/StudentFormActions'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from './types/StudentFormData'

const EMPTY_FORM_VALUES: StudentFormData = {
  nom: '',
  prenom: '',
  classe: '',
  ine: ''
}

type FormMode = 'create' | 'edit'

interface StudentFormProps {
  mode: FormMode
  student: StudentViewModel | null
  open: boolean
  onClose: () => void
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

export function StudentForm({ mode, student, open, onClose }: StudentFormProps) {
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

  const onSubmit = handleSubmit(handleFormSubmit)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      footer={
        <StudentFormActions
          isSubmitting={isSubmitting}
          submitLabel={submitLabel}
          onCancel={handleClose}
          onSubmit={onSubmit}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <StudentFormFields register={register} errors={errors} />
      </form>
    </Modal>
  )
}
