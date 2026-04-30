import { useRef } from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useImportStudentsCsv } from '@student/api/useStudentMutations'

const CSV_ACCEPT = '.csv'

const hiddenInputStyle = { display: 'none' }

export function StudentCsvImportButton() {
  const { t } = useTranslation('student')
  const inputRef = useRef<HTMLInputElement>(null)
  const { mutate: importStudents, isPending } = useImportStudentsCsv()

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const csv = await file.text()
    importStudents({ csv })
    event.target.value = ''
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={CSV_ACCEPT}
        onChange={handleFile}
        style={hiddenInputStyle}
      />
      <Button variant="outlined" onClick={handleClick} disabled={isPending}>
        {t('import')}
      </Button>
    </>
  )
}
