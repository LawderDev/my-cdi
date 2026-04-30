import { Box, TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { Search, Clear, Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import type { ChangeEvent } from 'react'
import type { SxProps, Theme } from '@mui/material'

interface StudentListToolbarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
  onAddStudent: () => void
  onImportCsv: () => void
}

const TOOLBAR_BOTTOM_MARGIN = 2
const SEARCH_RIGHT_MARGIN = 2
const BUTTON_GAP = 1

const toolbarStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: TOOLBAR_BOTTOM_MARGIN
}

const searchFieldStyles: SxProps<Theme> = {
  flex: 1,
  mr: SEARCH_RIGHT_MARGIN
}

const buttonGroupStyles: SxProps<Theme> = {
  display: 'flex',
  gap: BUTTON_GAP
}

export function StudentListToolbar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  onAddStudent,
  onImportCsv
}: StudentListToolbarProps) {
  const { t } = useTranslation('student')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  return (
    <Box sx={toolbarStyles}>
      <TextField
        placeholder={t('fields.search')}
        value={searchTerm}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchTerm ? (
              <InputAdornment position="end">
                <IconButton onClick={onClearSearch} size="small">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ) : null
          }
        }}
        sx={searchFieldStyles}
      />
      <Box sx={buttonGroupStyles}>
        <Button variant="contained" startIcon={<Add />} onClick={onAddStudent}>
          {t('add')}
        </Button>
        <Button variant="outlined" onClick={onImportCsv}>
          {t('import')}
        </Button>
      </Box>
    </Box>
  )
}
