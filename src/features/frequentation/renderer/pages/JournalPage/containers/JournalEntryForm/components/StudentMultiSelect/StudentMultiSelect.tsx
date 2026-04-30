import { Autocomplete, TextField, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

const SPINNER_SIZE = 20

interface StudentOption {
  id: number
  displayName: string
  classe: string
}

interface StudentMultiSelectProps {
  students: StudentOption[]
  selectedIds: number[]
  onChange: (ids: number[]) => void
  loading: boolean
}

export function StudentMultiSelect({
  students,
  selectedIds,
  onChange,
  loading
}: StudentMultiSelectProps) {
  const { t } = useTranslation('frequentation')

  const selectedOptions = students.filter((student) => selectedIds.includes(student.id))

  return (
    <Autocomplete
      multiple
      options={students}
      value={selectedOptions}
      loading={loading}
      getOptionLabel={(option) => `${option.displayName} (${option.classe})`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => onChange(newValue.map((option) => option.id))}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('form.selectStudents')}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={SPINNER_SIZE} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}
