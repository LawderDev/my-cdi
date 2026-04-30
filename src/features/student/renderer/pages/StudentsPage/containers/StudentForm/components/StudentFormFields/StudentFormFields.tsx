import { TextField, Stack } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { StudentFormData } from '../../types/StudentFormData'

interface StudentFormFieldsProps {
  register: UseFormRegister<StudentFormData>
  errors: FieldErrors<StudentFormData>
}

const FIELD_KEYS: readonly (keyof StudentFormData)[] = ['nom', 'prenom', 'classe', 'ine']

const STACK_TOP_MARGIN = 1
const STACK_SPACING = 2

const stackStyles: SxProps<Theme> = {
  mt: STACK_TOP_MARGIN
}

export function StudentFormFields({ register, errors }: StudentFormFieldsProps) {
  const { t } = useTranslation('student')
  return (
    <Stack spacing={STACK_SPACING} sx={stackStyles}>
      {FIELD_KEYS.map((key) => (
        <TextField
          key={key}
          label={t(`fields.${key}`)}
          {...register(key)}
          fullWidth
          required
          error={Boolean(errors[key])}
          helperText={errors[key]?.message ?? ''}
        />
      ))}
    </Stack>
  )
}
