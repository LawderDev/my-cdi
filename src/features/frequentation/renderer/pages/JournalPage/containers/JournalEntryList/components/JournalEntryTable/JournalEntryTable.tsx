import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { JournalEntryRow } from '../JournalEntryRow'
import type { JournalEntryViewModel } from '@frequentation/types'

interface JournalEntryTableProps {
  entries: JournalEntryViewModel[]
  selectedIds: number[]
  onToggleSelection: (id: number) => void
  onEdit: (entry: JournalEntryViewModel) => void
  onDelete: (entry: JournalEntryViewModel) => void
}

const EMPTY_PADDING = 3

export function JournalEntryTable({
  entries,
  selectedIds,
  onToggleSelection,
  onEdit,
  onDelete
}: JournalEntryTableProps) {
  const { t } = useTranslation('frequentation')

  if (entries.length === 0) {
    return (
      <Box sx={{ p: EMPTY_PADDING, textAlign: 'center' }}>
        <Typography color="text.secondary">{t('noEntries')}</Typography>
      </Box>
    )
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>{t('fields.student')}</TableCell>
            <TableCell>{t('fields.classe')}</TableCell>
            <TableCell>{t('fields.activity')}</TableCell>
            <TableCell align="right">{t('fields.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <JournalEntryRow
              key={entry.id}
              entry={entry}
              selected={selectedIds.includes(entry.id)}
              onToggleSelection={onToggleSelection}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
