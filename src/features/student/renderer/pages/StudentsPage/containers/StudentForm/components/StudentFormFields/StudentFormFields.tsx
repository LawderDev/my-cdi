import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import type { StudentFormData } from '../../types/StudentFormData'
import { getValidationErrorMessage } from './helpers/getValidationErrorMessage'
import {
  LABEL_FONT_SIZE_PX,
  LABEL_FONT_WEIGHT,
  INPUT_HEIGHT_PX,
  INPUT_FONT_SIZE_PX,
  ERROR_FONT_SIZE_PX
} from './StudentFormFields.styles'

interface StudentFormFieldsProps {
  register: UseFormRegister<StudentFormData>
  errors: FieldErrors<StudentFormData>
}

const FIELD_KEYS: readonly (keyof StudentFormData)[] = ['nom', 'prenom', 'classe', 'ine']

export function StudentFormFields({ register, errors }: StudentFormFieldsProps) {
  const { t } = useTranslation('student')
  return (
    <Box>
      {FIELD_KEYS.map((key) => {
        const fieldId = `student-field-${String(key)}`
        const hasError = Boolean(errors[key])
        const errorMessage = getValidationErrorMessage(String(key), hasError, t)
        return (
          <Box key={String(key)} sx={{ mb: 2 }}>
            <Box
              component="label"
              htmlFor={fieldId}
              sx={{
                display: 'block',
                fontSize: `${LABEL_FONT_SIZE_PX}px`,
                fontWeight: LABEL_FONT_WEIGHT,
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                mb: 0.75
              }}
            >
              {t(`fields.${String(key)}`)}
            </Box>
            <TextField
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: `${INPUT_HEIGHT_PX}px`,
                  fontSize: `${INPUT_FONT_SIZE_PX}px`,
                  bgcolor: 'var(--surface)',
                  color: 'var(--title)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'border-color 0.2s'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: hasError ? 'var(--danger)' : 'var(--border)'
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: hasError ? 'var(--danger)' : 'var(--border-light)'
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: hasError ? 'var(--danger)' : 'var(--accent)',
                  boxShadow: hasError ? 'none' : '0 0 0 3px var(--accent-bg)'
                }
              }}
            />
            {errorMessage ? (
              <Box
                sx={{
                  mt: 0.5,
                  fontSize: `${ERROR_FONT_SIZE_PX}px`,
                  color: 'var(--danger)'
                }}
              >
                {errorMessage}
              </Box>
            ) : null}
          </Box>
        )
      })}
    </Box>
  )
}
