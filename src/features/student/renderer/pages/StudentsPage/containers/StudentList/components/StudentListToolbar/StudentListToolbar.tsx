import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { Button } from '@ui/components/Button'
import { Icon } from '@ui/components/Icon'
import { StudentCsvImportButton } from '../../containers/StudentCsvImportButton'

interface StudentListToolbarProps {
  searchTerm: string
  totalCount: number
  onSearchChange: (value: string) => void
  onAddStudent: () => void
}

const SMALL_ICON_FONT_SIZE_PX = 16
const SMALL_ICON_STYLE = { fontSize: SMALL_ICON_FONT_SIZE_PX } as const

const SEARCH_WRAPPER_MAX_WIDTH_PX = 380
const SEARCH_INPUT_HEIGHT_PX = 40
const SEARCH_INPUT_FONT_SIZE_PX = 13
const SEARCH_ICON_FONT_SIZE_PX = 18
const COUNT_FONT_SIZE_PX = 12
const COUNT_FONT_WEIGHT = 500

export function StudentListToolbar({
  searchTerm,
  totalCount,
  onSearchChange,
  onAddStudent
}: StudentListToolbarProps) {
  const { t } = useTranslation('student')

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
      <TextField
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
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
        sx={{
          flex: 1,
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
      <Box
        component="span"
        sx={{
          fontSize: `${COUNT_FONT_SIZE_PX}px`,
          color: 'var(--text-dim)',
          fontWeight: COUNT_FONT_WEIGHT
        }}
      >
        {t('count', { count: totalCount })}
      </Box>
      <Box sx={{ flex: 1 }} />
      <StudentCsvImportButton />
      <Button
        variant="primary"
        iconLeft={<Icon name="person_add" style={SMALL_ICON_STYLE} />}
        onClick={onAddStudent}
      >
        {t('add')}
      </Button>
    </Box>
  )
}
