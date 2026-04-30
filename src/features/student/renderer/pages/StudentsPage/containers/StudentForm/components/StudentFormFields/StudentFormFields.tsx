import { TextField, Stack } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { StudentFormData } from '../../types/StudentFormData'

interface StudentFormFieldsProps {
  register: UseFormRegister<StudentFormData>
  errors: FieldErrors<StudentFormData>
}

interface FieldConfig {
  key: keyof StudentFormData
  label: string
}

const FIELD_CONFIGS: readonly FieldConfig[] = [
  { key: 'nom', label: 'Nom' },
  { key: 'prenom', label: 'Prénom' },
  { key: 'classe', label: 'Classe' },
  { key: 'ine', label: 'INE' }
]

const STACK_TOP_MARGIN = 1
const STACK_SPACING = 2

const stackStyles: SxProps<Theme> = {
  mt: STACK_TOP_MARGIN
}

export function StudentFormFields({ register, errors }: StudentFormFieldsProps) {
  return (
    <Stack spacing={STACK_SPACING} sx={stackStyles}>
      {FIELD_CONFIGS.map(({ key, label }) => (
        <TextField
          key={key}
          label={label}
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
