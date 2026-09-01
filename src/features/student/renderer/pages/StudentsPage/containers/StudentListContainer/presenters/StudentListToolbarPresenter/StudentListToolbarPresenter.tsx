import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import { Button } from '@ui/components/Button'
import { Icon } from '@ui/components/Icon'
import { StudentCsvImportButtonContainer } from '../../containers/StudentCsvImportButton'
import {
  SMALL_ICON_STYLE,
  CountLabel,
  SearchField,
  SearchIcon,
  ToolbarRoot,
  ToolbarSpacer
} from './StudentListToolbarPresenter.styles'

interface StudentListToolbarPresenterProps {
  searchTerm: string
  totalCount: number
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onAddStudent: () => void
}

export function StudentListToolbarPresenter({
  searchTerm,
  totalCount,
  onSearchChange,
  onAddStudent
}: StudentListToolbarPresenterProps) {
  const { t } = useTranslation('student')

  return (
    <ToolbarRoot>
      <SearchField
        type="search"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={t('searchPlaceholder')}
        size="small"
        variant="outlined"
        fullWidth
        slotProps={{
          input: {
            'aria-label': t('searchPlaceholder'),
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon name="search" />
              </InputAdornment>
            )
          }
        }}
      />
      <CountLabel variant="body2">{t('count', { count: totalCount })}</CountLabel>
      <ToolbarSpacer />
      <StudentCsvImportButtonContainer />
      <Button
        variant="primary"
        iconLeft={<Icon name="person_add" style={SMALL_ICON_STYLE} />}
        onClick={onAddStudent}
      >
        {t('add')}
      </Button>
    </ToolbarRoot>
  )
}
