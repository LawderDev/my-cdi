import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete } from '@ui/components/Autocomplete'
import type { AutocompleteOption } from '@ui/components/Autocomplete'

import { ChipsRow, FieldLabel, LoadingText } from './StudentMultiSelectPresenter.styles'

interface StudentMultiSelectPresenterProps {
  options: AutocompleteOption<number>[]
  selectedIds: number[]
  chipNodes: ReactNode[]
  inputValue: string
  onInputChange: (value: string) => void
  onSelect: (option: AutocompleteOption<number>) => void
  loading: boolean
}

export function StudentMultiSelectPresenter({
  options,
  selectedIds,
  chipNodes,
  inputValue,
  onInputChange,
  onSelect,
  loading
}: StudentMultiSelectPresenterProps) {
  const { t } = useTranslation('frequentation')

  return (
    <Box>
      <FieldLabel>{t('form.selectStudents')}</FieldLabel>
      {loading ? <LoadingText>{t('loading')}</LoadingText> : null}
      <Autocomplete<number>
        placeholder={t('form.searchStudent')}
        options={options}
        onSelect={onSelect}
        inputValue={inputValue}
        onInputChange={onInputChange}
        excludedValues={selectedIds}
        disableCloseOnSelect
      />
      <ChipsRow>{chipNodes}</ChipsRow>
    </Box>
  )
}
