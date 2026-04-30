import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import type { StudentFormData } from '../../types/StudentFormData'

interface StudentFormFieldsProps {
  register: UseFormRegister<StudentFormData>
  errors: FieldErrors<StudentFormData>
}

const FIELD_KEYS: readonly (keyof StudentFormData)[] = ['nom', 'prenom', 'classe', 'ine']

const LABEL_FONT_SIZE_PX = 11
const LABEL_FONT_WEIGHT = 600
const INPUT_HEIGHT_PX = 40
const INPUT_FONT_SIZE_PX = 13
const ERROR_FONT_SIZE_PX = 11

export function StudentFormFields({ register, errors }: StudentFormFieldsProps) {
  const { t } = useTranslation('student')
  return (
    <Box>
      {FIELD_KEYS.map((key) => {
        const fieldId = `student-field-${key}`
        const error = errors[key]
        const errorMessage = error?.message
        return (
          <Box key={key} sx={{ mb: 2 }}>
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
              {t(`fields.${key}`)}
            </Box>
            <TextField
              id={fieldId}
              type="text"
              size="small"
              variant="outlined"
              fullWidth
              error={Boolean(error)}
              slotProps={{
                input: {
                  'aria-invalid': Boolean(error)
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
                  borderColor: error ? 'var(--danger)' : 'var(--border)'
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: error ? 'var(--danger)' : 'var(--border-light)'
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: error ? 'var(--danger)' : 'var(--accent)',
                  boxShadow: error ? 'none' : '0 0 0 3px var(--accent-bg)'
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
