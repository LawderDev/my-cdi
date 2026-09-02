import { useTranslation } from 'react-i18next'
import type { ReactNode, RefObject } from 'react'
import Box from '@mui/material/Box'
import { Autocomplete } from '@ui/components/Autocomplete'
import type { AutocompleteOption } from '@ui/components/Autocomplete'
import { Loader } from '@ui/components/Loader'

import { ChipsRow, FieldLabel } from './StudentMultiSelectPresenter.styles'

interface StudentMultiSelectPresenterProps {
  options: AutocompleteOption<number>[]
  selectedIds: number[]
  chipNodes: ReactNode[]
  inputValue: string
  onInputChange: (value: string) => void
  onSelect: (option: AutocompleteOption<number>) => void
  loading: boolean
  inputRef?: RefObject<HTMLInputElement | null>
}

export function StudentMultiSelectPresenter({
  options,
  selectedIds,
  chipNodes,
  inputValue,
  onInputChange,
  onSelect,
  loading,
  inputRef
}: StudentMultiSelectPresenterProps) {
  const { t } = useTranslation('frequentation')

  return (
    <Box>
      <FieldLabel variant="overline">{t('form.selectStudents')}</FieldLabel>
      {loading ? <Loader message={t('loading')} /> : null}
      <Autocomplete<number>
        placeholder={t('form.searchStudent')}
        options={options}
        onSelect={onSelect}
        inputValue={inputValue}
        onInputChange={onInputChange}
        excludedValues={selectedIds}
        disableCloseOnSelect
        inputRef={inputRef}
      />
      {chipNodes.length > 0 ? <ChipsRow>{chipNodes}</ChipsRow> : null}
    </Box>
  )
}
