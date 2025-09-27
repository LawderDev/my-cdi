import { JSX } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'

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
}

function StudentsTable({ frequentations }: StudentsTableProps): JSX.Element {
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
              </TableRow>
            </TableHead>
            <TableBody>
              {frequentations.map((row, index) => {
                const labelId = `Table-checkbox-${index}`
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={false}
                    tabIndex={-1}
                    key={labelId}
                    selected={false}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={false}
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
