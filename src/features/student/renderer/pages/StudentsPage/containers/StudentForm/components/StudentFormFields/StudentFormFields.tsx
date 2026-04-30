import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { StudentFormData } from '../../types/StudentFormData'

interface StudentFormFieldsProps {
  register: UseFormRegister<StudentFormData>
  errors: FieldErrors<StudentFormData>
}

const FIELD_KEYS: readonly (keyof StudentFormData)[] = ['nom', 'prenom', 'classe', 'ine']

export function StudentFormFields({ register, errors }: StudentFormFieldsProps) {
  const { t } = useTranslation('student')
  return (
    <div>
      {FIELD_KEYS.map((key) => {
        const fieldId = `student-field-${key}`
        const error = errors[key]
        return (
          <div key={key} className="field">
            <label htmlFor={fieldId}>{t(`fields.${key}`)}</label>
            <input id={fieldId} type="text" aria-invalid={Boolean(error)} {...register(key)} />
            {error?.message ? <div className="field-error">{error.message}</div> : null}
          </div>
        )
      })}
    </div>
  )
}
