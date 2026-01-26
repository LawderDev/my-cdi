import React from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Search, Clear } from '@mui/icons-material'
import type { SxProps } from '@mui/material'
import type { Theme } from '@mui/material/styles'

interface StudentSearchBarProps {
  searchTerm: string
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  sx?: SxProps<Theme>
}

export const StudentSearchBar: React.FC<StudentSearchBarProps> = ({
  searchTerm,
  onSearch,
  onClear,
  sx
}) => {
  return (
    <TextField
      fullWidth
      placeholder="Rechercher des élèves..."
      value={searchTerm}
      onChange={onSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <IconButton onClick={onClear} size="small">
              <Clear />
            </IconButton>
          </InputAdornment>
        )
      }}
      sx={{
        mb: 2,
        ...sx
      }}
    />
  )
}
