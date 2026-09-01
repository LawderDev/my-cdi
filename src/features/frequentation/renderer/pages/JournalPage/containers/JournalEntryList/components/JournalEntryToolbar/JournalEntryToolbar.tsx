import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import { Icon } from '@ui/components/Icon'
import type { EntryPeriodFilter } from '../../helpers/filterEntriesByPeriod'
import {
  COUNT_BORDER_RADIUS_PX,
  COUNT_FONT_SIZE_PX,
  COUNT_FONT_WEIGHT,
  SELECT_FONT_SIZE_PX,
  SELECT_HEIGHT_PX,
  TITLE_FONT_SIZE_PX,
  TITLE_FONT_WEIGHT,
  TITLE_ICON_FONT_SIZE_PX,
  SEARCH_WRAPPER_MAX_WIDTH_PX,
  SEARCH_INPUT_HEIGHT_PX,
  SEARCH_INPUT_FONT_SIZE_PX,
  SEARCH_ICON_FONT_SIZE_PX
} from './JournalEntryToolbar.styles'

interface JournalEntryToolbarProps {
  entryCount: number
  period: EntryPeriodFilter
  onPeriodChange: (event: SelectChangeEvent<EntryPeriodFilter>) => void
  searchTerm: string
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function JournalEntryToolbar({
  entryCount,
  period,
  onPeriodChange,
  searchTerm,
  onSearchChange
}: JournalEntryToolbarProps) {
  const { t } = useTranslation('frequentation')

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2.5,
        py: 2,
        borderBottom: '1px solid var(--border)'
      }}
    >
      <Box
        component="h3"
        sx={{
          fontSize: `${TITLE_FONT_SIZE_PX}px`,
          fontWeight: TITLE_FONT_WEIGHT,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          m: 0
        }}
      >
        <Icon
          name="groups"
          style={{ fontSize: `${TITLE_ICON_FONT_SIZE_PX}px`, color: 'var(--accent)' }}
        />
        {t('present')}
        <Box
          component="span"
          sx={{
            fontSize: `${COUNT_FONT_SIZE_PX}px`,
            bgcolor: 'var(--accent-bg)',
            color: 'var(--accent)',
            px: 1.25,
            py: 0.25,
            borderRadius: `${COUNT_BORDER_RADIUS_PX}px`,
            fontWeight: COUNT_FONT_WEIGHT
          }}
        >
          {entryCount}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TextField
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
                      color: 'var(--text-dim)',
                      fontSize: `${SEARCH_ICON_FONT_SIZE_PX}px`
                    }}
                  />
                </InputAdornment>
              )
            }
          }}
          sx={{
            maxWidth: `${SEARCH_WRAPPER_MAX_WIDTH_PX}px`,
            '& .MuiOutlinedInput-root': {
              height: `${SEARCH_INPUT_HEIGHT_PX}px`,
              fontSize: `${SEARCH_INPUT_FONT_SIZE_PX}px`,
              bgcolor: 'var(--surface)',
              color: 'var(--title)',
              borderRadius: 'var(--radius-sm)',
              transition: 'border-color 0.2s'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border)'
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border-light)'
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--accent)',
              boxShadow: '0 0 0 3px var(--accent-bg)'
            }
          }}
        />
        <Select
          value={period}
          onChange={onPeriodChange}
          size="small"
          inputProps={{ 'aria-label': t('period.label') }}
          sx={{
            height: `${SELECT_HEIGHT_PX}px`,
            fontSize: `${SELECT_FONT_SIZE_PX}px`,
            color: 'var(--text)',
            bgcolor: 'var(--surface)',
            borderRadius: 'var(--radius-xs)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border)'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border-light)'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--accent)'
            },
            '& .MuiSelect-select': {
              py: 0,
              pl: 1.25,
              pr: 3,
              display: 'flex',
              alignItems: 'center',
              minHeight: 0,
              height: `${SELECT_HEIGHT_PX}px`
            }
          }}
        >
          <MenuItem value="all">{t('period.all')}</MenuItem>
          <MenuItem value="morning">{t('period.morning')}</MenuItem>
          <MenuItem value="afternoon">{t('period.afternoon')}</MenuItem>
        </Select>
      </Box>
    </Box>
  )
}
