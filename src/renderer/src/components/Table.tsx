import { JSX, useState } from 'react'
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

interface FrequentationItem {
  id: number
  starts_at: string
  activity: string
  created_at: string
  student: {
    id: number
    nom: string
    prenom: string
    classe: string
    fullName: string
  }
  formattedStartTime: string
}

interface StudentsTableProps {
  frequentations: FrequentationItem[]
  selectedFrequentations: number[]
  onSelectedFrequentationsChange: (ids: number[]) => void
  onDeleteFrequentation: (ids: number[]) => void
}

function StudentsTable({
  frequentations,
  selectedFrequentations,
  onSelectedFrequentationsChange,
  onDeleteFrequentation,
}: StudentsTableProps): JSX.Element {
  const isFrequentationSelected = (id: number): boolean => selectedFrequentations.includes(id)

  const handleSelectFrequentation = (id: number): void => {
    if (isFrequentationSelected(id)) {
      onSelectedFrequentationsChange(selectedFrequentations.filter((sid) => sid !== id))
      return
    }
    onSelectedFrequentationsChange([...selectedFrequentations, id])
  }

  const deleteFrequentation = (event: React.MouseEvent, id: number): void => {
    event.stopPropagation()
    onDeleteFrequentation([id])
  }

  const modifyFrequentation = (event: React.MouseEvent, id: number): void => {
    event.stopPropagation()
    console.log('Modify frequentation with id:', id)
  }

  return (
    <Box sx={{ width: '100%', height: '77vh' }}>
      <Paper sx={{ width: '100%', height: '100%', mb: 2, overflow: 'scroll', margin: 0, p: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, maxHeight: 100 }}
            stickyHeader
            aria-labelledby="tableTitle"
            size="medium"
          >
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
                    aria-checked={isFrequentationSelected(row.id)}
                    tabIndex={-1}
                    key={labelId}
                    selected={isFrequentationSelected(row.id)}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleSelectFrequentation(row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isFrequentationSelected(row.id)}
                        onChange={() => handleSelectFrequentation(row.id)}
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
                        onClick={(event) => {
                          modifyFrequentation(event, row.id)
                        }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="supprimer"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={(event) => {
                          deleteFrequentation(event, row.id)
                        }}
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
