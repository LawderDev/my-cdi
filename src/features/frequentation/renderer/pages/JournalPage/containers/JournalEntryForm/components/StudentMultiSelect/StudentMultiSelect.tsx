import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Autocomplete } from '@ui/components/Autocomplete'
import { Chip } from '@ui/components/Chip'
import type { AutocompleteOption } from '@ui/components/Autocomplete'

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

const LABEL_FONT_SIZE_PX = 11
const LABEL_FONT_WEIGHT = 600
const LOADING_FONT_SIZE_PX = 12
const CHIPS_MIN_HEIGHT_PX = 28

export function StudentMultiSelect({
  students,
  selectedIds,
  onChange,
  loading
}: StudentMultiSelectProps) {
  const { t } = useTranslation('frequentation')
  const [inputValue, setInputValue] = useState<string>('')

  const options: AutocompleteOption<number>[] = students.map((student) => ({
    value: student.id,
    label: student.displayName,
    badge: student.classe
  }))

  const selectedStudents = students.filter((student) => selectedIds.includes(student.id))

  function handleSelect(option: AutocompleteOption<number>) {
    if (selectedIds.includes(option.value)) {
      return
    }
    onChange([...selectedIds, option.value])
    setInputValue('')
  }

  function handleRemove(id: number) {
    onChange(selectedIds.filter((existing) => existing !== id))
  }

  return (
    <Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          fontSize: `${LABEL_FONT_SIZE_PX}px`,
          fontWeight: LABEL_FONT_WEIGHT,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-dim)',
          mb: 0.75
        }}
      >
        {t('form.selectStudents')}
      </Box>
      {loading ? (
        <Box sx={{ fontSize: `${LOADING_FONT_SIZE_PX}px`, color: 'var(--text-dim)', mb: 1 }}>
          {t('loading')}
        </Box>
      ) : null}
      <Autocomplete<number>
        placeholder={t('form.searchStudent')}
        options={options}
        onSelect={handleSelect}
        inputValue={inputValue}
        onInputChange={setInputValue}
        excludedValues={selectedIds}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.75,
          minHeight: `${CHIPS_MIN_HEIGHT_PX}px`,
          mt: 1
        }}
      >
        {selectedStudents.map((student) => (
          <Chip
            key={student.id}
            label={student.displayName}
            onRemove={() => handleRemove(student.id)}
          />
        ))}
      </Box>
    </Box>
  )
}
