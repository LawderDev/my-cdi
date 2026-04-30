import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateStudent, useUpdateStudent } from '@student/api/useStudentMutations'
import { studentFormSchema } from './validations/studentFormSchema'
import { mapFormToCreateDto, mapFormToUpdateDto } from './helpers/mapFormToCreateDto'
import { StudentFormFields } from './components/StudentFormFields'
import { StudentFormActions } from './components/StudentFormActions'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from './types/StudentFormData'

const CREATE_TITLE = 'Ajouter un élève'
const EDIT_TITLE = "Modifier l'élève"
const CREATE_SUBMIT_LABEL = 'Ajouter'
const EDIT_SUBMIT_LABEL = 'Enregistrer'

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

  const title = mode === 'create' ? CREATE_TITLE : EDIT_TITLE
  const submitLabel = mode === 'create' ? CREATE_SUBMIT_LABEL : EDIT_SUBMIT_LABEL

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <StudentFormFields register={register} errors={errors} />
        </DialogContent>
        <StudentFormActions
          isSubmitting={isSubmitting}
          onCancel={handleClose}
          submitLabel={submitLabel}
        />
      </form>
    </Dialog>
  )
}
