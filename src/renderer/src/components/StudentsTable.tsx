import { FC, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { useStudentsTable } from '../hooks/useStudentsTable'
import type { Frequentation } from '../types/frequentation'
import {
  rootBoxStyles,
  paperStyles,
  tableStyles,
  selectableRowStyles,
  deleteButtonStyles
} from '../styles/StudentsTable.styles'

interface StudentsTableProps {
  frequentations: Frequentation[]
  selectedFrequentations: number[]
  onSelectedFrequentationsChange: (ids: number[]) => void
  onDeleteFrequentation: (ids: number[]) => void
}

const StudentsTable: FC<StudentsTableProps> = ({
  frequentations,
  selectedFrequentations,
  onSelectedFrequentationsChange,
  onDeleteFrequentation
}) => {
  const { isSelected, handleRowClick, handleCheckboxChange, handleDeleteClick } = useStudentsTable({
    selectedFrequentations,
    onSelectedFrequentationsChange,
    onDeleteFrequentation
  })

  // Plain handler — not memoized because it's not passed to a memoized child
  const handleModifyFrequentation = (event: MouseEvent<HTMLButtonElement>, id: number): void => {
    event.stopPropagation()
    console.log('Modify frequentation with id:', id)
  }

  return (
    <Box sx={rootBoxStyles}>
      <Paper sx={paperStyles}>
        <TableContainer>
          <Table sx={tableStyles} stickyHeader aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell align="center" padding="normal">
                  Nom
                </TableCell>
                <TableCell align="center" padding="normal">
                  Prénom
                </TableCell>
                <TableCell align="center" padding="normal">
                  Classe
                </TableCell>
                <TableCell align="center" padding="normal">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {frequentations.map((row, index) => {
                const labelId = `Table-checkbox-${index}`
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected(row.id)}
                    tabIndex={-1}
                    key={labelId}
                    selected={isSelected(row.id)}
                    sx={selectableRowStyles}
                    onClick={() => handleRowClick(row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isSelected(row.id)}
                        onChange={(event) => handleCheckboxChange(event, row.id)}
                        slotProps={{
                          input: {
                            'aria-labelledby': labelId
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" padding="normal">
                      {row.student.nom}
                    </TableCell>
                    <TableCell align="center" padding="normal">
                      {row.student.prenom}
                    </TableCell>
                    <TableCell align="center" padding="normal">
                      {row.student.classe}
                    </TableCell>
                    <TableCell align="center" padding="normal">
                      <IconButton
                        aria-label="modifier"
                        size="small"
                        onClick={(event) => handleModifyFrequentation(event, row.id)}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="supprimer"
                        size="small"
                        sx={deleteButtonStyles}
                        onClick={(event) => handleDeleteClick(event, row.id)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default StudentsTable
