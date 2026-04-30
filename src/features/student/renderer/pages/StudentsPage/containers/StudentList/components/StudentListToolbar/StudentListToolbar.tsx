import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
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
const SEARCH_INPUT_PADDING_LEFT_PX = 38
const SEARCH_INPUT_PADDING_RIGHT_PX = 14
const SEARCH_ICON_LEFT_PX = 10
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
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          maxWidth: `${SEARCH_WRAPPER_MAX_WIDTH_PX}px`
        }}
      >
        <Icon
          name="search"
          style={{
            position: 'absolute',
            left: `${SEARCH_ICON_LEFT_PX}px`,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-dim)',
            fontSize: `${SEARCH_ICON_FONT_SIZE_PX}px`
          }}
        />
        <Box
          component="input"
          type="text"
          aria-label={t('searchPlaceholder')}
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: '100%',
            height: `${SEARCH_INPUT_HEIGHT_PX}px`,
            bgcolor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            pl: `${SEARCH_INPUT_PADDING_LEFT_PX}px`,
            pr: `${SEARCH_INPUT_PADDING_RIGHT_PX}px`,
            fontSize: `${SEARCH_INPUT_FONT_SIZE_PX}px`,
            outline: 'none',
            transition: 'border 0.2s',
            color: 'var(--title)',
            '&:focus': {
              borderColor: 'var(--accent)',
              boxShadow: '0 0 0 3px var(--accent-bg)'
            }
          }}
        />
      </Box>
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
