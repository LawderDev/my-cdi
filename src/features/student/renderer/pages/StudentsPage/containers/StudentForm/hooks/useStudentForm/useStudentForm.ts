import { useState } from 'react'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from '../../types/StudentFormData'

const EMPTY_FORM: StudentFormData = {
  nom: '',
  prenom: '',
  classe: '',
  ine: ''
}

type FormMode = 'create' | 'edit'

interface UseStudentFormOptions {
  mode: FormMode
  student: StudentViewModel | null
  onCreateSubmit: (dto: StudentFormData) => Promise<boolean>
  onUpdateSubmit: (student: StudentViewModel, data: StudentFormData) => Promise<boolean>
  onClose: () => void
}

interface UseStudentFormReturn {
  mode: FormMode
  formValues: StudentFormData
  setFieldValue: (field: keyof StudentFormData, value: string) => void
  resetForm: () => void
  handleSubmit: () => Promise<void>
  isSubmitting: boolean
}

function buildInitialForm(student: StudentViewModel | null): StudentFormData {
  if (student) {
    return {
      nom: student.nom,
      prenom: student.prenom,
      classe: student.classe,
      ine: student.ine
    }
  }
  return EMPTY_FORM
}

export function useStudentForm({
  mode,
  student,
  onCreateSubmit,
  onUpdateSubmit,
  onClose
}: UseStudentFormOptions): UseStudentFormReturn {
  const initialForm = buildInitialForm(student)

  const [formValues, setFormValues] = useState<StudentFormData>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function setFieldValue(field: keyof StudentFormData, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  function resetForm() {
    setFormValues(initialForm)
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    try {
      if (mode === 'create') {
        const success = await onCreateSubmit(formValues)
        if (success) {
          setFormValues(EMPTY_FORM)
          onClose()
        }
        return
      }
      if (student) {
        const success = await onUpdateSubmit(student, formValues)
        if (success) {
          onClose()
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    mode,
    formValues,
    setFieldValue,
    resetForm,
    handleSubmit,
    isSubmitting
  }
}
