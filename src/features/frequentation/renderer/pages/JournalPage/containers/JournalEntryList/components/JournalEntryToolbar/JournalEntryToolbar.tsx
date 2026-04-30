import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import { Icon } from '@ui/components/Icon'
import type { EntryPeriodFilter } from '../../helpers/filterEntriesByPeriod'

interface JournalEntryToolbarProps {
  entryCount: number
  period: EntryPeriodFilter
  onPeriodChange: (next: EntryPeriodFilter) => void
}

const TITLE_FONT_SIZE_PX = 15
const TITLE_FONT_WEIGHT = 600
const TITLE_ICON_FONT_SIZE_PX = 18
const COUNT_FONT_SIZE_PX = 12
const COUNT_FONT_WEIGHT = 600
const COUNT_BORDER_RADIUS_PX = 10
const SELECT_HEIGHT_PX = 30
const SELECT_FONT_SIZE_PX = 12

function isPeriodFilter(value: string): value is EntryPeriodFilter {
  return value === 'all' || value === 'matin' || value === 'aprem'
}

export function JournalEntryToolbar({
  entryCount,
  period,
  onPeriodChange
}: JournalEntryToolbarProps) {
  const { t } = useTranslation('frequentation')

  function handleChange(event: SelectChangeEvent<EntryPeriodFilter>) {
    const next = event.target.value
    if (isPeriodFilter(next)) {
      onPeriodChange(next)
    }
  }

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
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Select
          value={period}
          onChange={handleChange}
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
          <MenuItem value="matin">{t('period.matin')}</MenuItem>
          <MenuItem value="aprem">{t('period.aprem')}</MenuItem>
        </Select>
      </Box>
    </Box>
  )
}
