import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import { Button } from '@ui/components/Button'
import { Icon } from '@ui/components/Icon'
import { StudentCsvImportButtonContainer } from '../../containers/StudentCsvImportButton'
import {
  SMALL_ICON_STYLE,
  SEARCH_ICON_FONT_SIZE_PX,
  CountLabel,
  SearchField,
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
                <Icon
                  name="search"
                  style={{
                    color: 'var(--text-dim)',
                    fontSize: `${SEARCH_ICON_FONT_SIZE_PX}px`
                  }}
                />
              </InputAdornment>
            )
          }
        }}
      />
      <CountLabel>{t('count', { count: totalCount })}</CountLabel>
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
