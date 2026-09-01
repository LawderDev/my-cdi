import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@ui/components/Modal'
import { StudentFormActionsPresenter } from './presenters/StudentFormActionsPresenter'
import { StudentFormFieldsPresenter } from './presenters/StudentFormFieldsPresenter'
import { useStudentForm } from './hooks/useStudentForm'
import { getValidationErrorMessage } from './presenters/StudentFormFieldsPresenter/helpers/getValidationErrorMessage'
import { FieldError, FieldInput, FieldLabel, FieldRow } from './StudentFormContainer.styles'
import type { StudentViewModel } from '@student/types'
import type { StudentFormData } from './types/StudentFormData'

type FormMode = 'create' | 'edit'

interface StudentFormContainerProps {
  mode: FormMode
  student: StudentViewModel | null
  open: boolean
  onClose: () => void
}

const FIELD_KEYS: readonly (keyof StudentFormData)[] = ['nom', 'prenom', 'classe', 'ine']

export function StudentFormContainer({ mode, student, open, onClose }: StudentFormContainerProps) {
  const { t } = useTranslation('student')
  const { register, errors, isSubmitting, onSubmit, handleClose, title, submitLabel } =
    useStudentForm({ mode, student, onClose })

  const fieldRowNodes: ReactNode[] = FIELD_KEYS.map((key) => {
    const fieldId = `student-field-${String(key)}`
    const hasError = Boolean(errors[key])
    const errorMessage = getValidationErrorMessage(String(key), hasError, t)
    return (
      <FieldRow key={String(key)}>
        <FieldLabel htmlFor={fieldId}>{t(`fields.${String(key)}`)}</FieldLabel>
        <FieldInput
          id={fieldId}
          type="text"
          size="small"
          variant="outlined"
          fullWidth
          error={hasError}
          slotProps={{
            input: {
              'aria-invalid': hasError
            }
          }}
          {...register(key)}
        />
        {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
      </FieldRow>
    )
  })

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      footer={
        <StudentFormActionsPresenter
          isSubmitting={isSubmitting}
          submitLabel={submitLabel}
          onCancel={handleClose}
          onSubmit={onSubmit}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <StudentFormFieldsPresenter fieldRowNodes={fieldRowNodes} />
      </form>
    </Modal>
  )
}
