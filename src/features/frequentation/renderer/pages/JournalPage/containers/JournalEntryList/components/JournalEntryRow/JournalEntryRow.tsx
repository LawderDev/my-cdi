import { TableRow, TableCell, Checkbox, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ActivityChip } from '@frequentation/components/ActivityChip'
import type { JournalEntryViewModel } from '@frequentation/types'

interface JournalEntryRowProps {
  entry: JournalEntryViewModel
  selected: boolean
  onToggleSelection: (id: number) => void
  onEdit: (entry: JournalEntryViewModel) => void
  onDelete: (entry: JournalEntryViewModel) => void
}

export function JournalEntryRow({
  entry,
  selected,
  onToggleSelection,
  onEdit,
  onDelete
}: JournalEntryRowProps) {
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={() => onToggleSelection(entry.id)} />
      </TableCell>
      <TableCell>{entry.student.displayName}</TableCell>
      <TableCell>{entry.student.classe}</TableCell>
      <TableCell>
        <ActivityChip
          activity={entry.activity}
          label={entry.activityLabel}
          color={entry.activityColor}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={() => onEdit(entry)} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(entry)} aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
