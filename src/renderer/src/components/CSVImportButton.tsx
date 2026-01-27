import React from 'react'
import { Button } from '@mui/material'
import Papa from 'papaparse'
import StudentService from '@renderer/lib/api/student.service'

interface Props {
  onImported?: () => void
}

const CSVImportButton: React.FC<Props> = ({ onImported }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      delimiter: ';',
      complete: async (results) => {
        const rows = results.data as Array<Record<string, string>>
        // Map headers (case-insensitive) to nom/prenom/classe
        const mapped = rows.map((r) => ({
          nom: ((r['Nom de famille'] || r['nom'] || r['NOM'] || '') as string).trim(),
          prenom: ((r['Prénom 1'] || r['prenom'] || r['PRENOM'] || '') as string).trim(),
          classe: ((r['Division'] || r['classe'] || '') as string).trim()
        }))

        // Basic validation: nom & prenom
        const valid = mapped.filter((m) => m.nom && m.prenom)
        try {
          const res = await StudentService.importStudents(valid)
          if (res.success) {
            if (onImported) onImported()
          } else {
            console.error('Import failed:', res.error)
          }
        } catch (err) {
          console.error('Import failed', err)
        }
      }
    })
  }

  return (
    <>
      <input
        id="csv-input"
        type="file"
        accept=".csv"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
      <label htmlFor="csv-input">
        <Button variant="outlined" component="span">
          Importer CSV
        </Button>
      </label>
    </>
  )
}

export default CSVImportButton
