import React from 'react'
import { TableCell, TableRow, Checkbox } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface StudentTableHeaderProps {
  showCheckbox?: boolean
  showActions?: boolean
  allSelected?: boolean
  onSelectAll?: () => void
}

export const StudentTableHeader: React.FC<StudentTableHeaderProps> = ({
  showCheckbox = false,
  showActions = true,
  allSelected = false,
  onSelectAll
}) => {
  const { t } = useTranslation()

  return (
    <TableRow>
      {showCheckbox && (
        <TableCell padding="checkbox">
          {onSelectAll && (
            <Checkbox
              checked={allSelected}
              onChange={onSelectAll}
              indeterminate={allSelected === false ? false : undefined}
            />
          )}
        </TableCell>
      )}
      <TableCell>Nom</TableCell>
      <TableCell>Prénom</TableCell>
      <TableCell>Classe</TableCell>
      {showActions && <TableCell align="right">{t('table.actions')}</TableCell>}
    </TableRow>
  )
}
