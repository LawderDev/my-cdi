import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete } from '@ui/components/Autocomplete'
import type { AutocompleteOption } from '@ui/components/Autocomplete'

import {
  LABEL_FONT_SIZE_PX,
  LABEL_FONT_WEIGHT,
  LOADING_FONT_SIZE_PX,
  CHIPS_MIN_HEIGHT_PX
} from './StudentMultiSelect.styles'

interface StudentMultiSelectProps {
  options: AutocompleteOption<number>[]
  selectedIds: number[]
  chipNodes: ReactNode[]
  inputValue: string
  onInputChange: (value: string) => void
  onSelect: (option: AutocompleteOption<number>) => void
  loading: boolean
}

export function StudentMultiSelect({
  options,
  selectedIds,
  chipNodes,
  inputValue,
  onInputChange,
  onSelect,
  loading
}: StudentMultiSelectProps) {
  const { t } = useTranslation('frequentation')

  return (
    <Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          fontSize: `${LABEL_FONT_SIZE_PX}px`,
          fontWeight: LABEL_FONT_WEIGHT,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
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
        onSelect={onSelect}
        inputValue={inputValue}
        onInputChange={onInputChange}
        excludedValues={selectedIds}
        disableCloseOnSelect
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
        {chipNodes}
      </Box>
    </Box>
  )
}
