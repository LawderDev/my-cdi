import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import { Icon } from '@ui/components/Icon'
import { theme } from '@ui/theme'
import type { EntryPeriodFilter } from '../../helpers/filterEntriesByPeriod'
import {
  CountBadge,
  PeriodSelect,
  SearchField,
  ToolbarControls,
  ToolbarRoot,
  ToolbarTitle,
  SEARCH_ICON_FONT_SIZE_PX,
  TITLE_ICON_FONT_SIZE_PX
} from './JournalEntryToolbarPresenter.styles'

interface JournalEntryToolbarPresenterProps {
  entryCount: number
  period: EntryPeriodFilter
  onPeriodChange: (value: string) => void
  searchTerm: string
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function JournalEntryToolbarPresenter({
  entryCount,
  period,
  onPeriodChange,
  searchTerm,
  onSearchChange
}: JournalEntryToolbarPresenterProps) {
  const { t } = useTranslation('frequentation')

  return (
    <ToolbarRoot>
      <ToolbarTitle>
        <Icon
          name="groups"
          style={{ fontSize: TITLE_ICON_FONT_SIZE_PX, color: theme.palette.primary.main }}
        />
        {t('present')}
        <CountBadge>{entryCount}</CountBadge>
      </ToolbarTitle>
      <ToolbarControls>
        <SearchField
          type="search"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder={t('searchPlaceholder')}
          size="small"
          variant="outlined"
          slotProps={{
            input: {
              'aria-label': t('searchPlaceholder'),
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    name="search"
                    style={{
                      color: theme.palette.text.disabled,
                      fontSize: SEARCH_ICON_FONT_SIZE_PX
                    }}
                  />
                </InputAdornment>
              )
            }
          }}
        />
        <PeriodSelect
          value={period}
          onChange={(event) => onPeriodChange(String(event.target.value))}
          size="small"
          inputProps={{ 'aria-label': t('period.label') }}
        >
          <MenuItem value="all">{t('period.all')}</MenuItem>
          <MenuItem value="morning">{t('period.morning')}</MenuItem>
          <MenuItem value="afternoon">{t('period.afternoon')}</MenuItem>
        </PeriodSelect>
      </ToolbarControls>
    </ToolbarRoot>
  )
}
