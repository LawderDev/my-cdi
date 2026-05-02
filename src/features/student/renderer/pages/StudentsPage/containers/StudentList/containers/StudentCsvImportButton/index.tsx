import { StudentCsvImportButton as StudentCsvImportButtonPresenter } from './StudentCsvImportButton'
import { useCsvImportButton } from './hooks/useCsvImportButton/useCsvImportButton'

export function StudentCsvImportButton() {
  const props = useCsvImportButton()

  return <StudentCsvImportButtonPresenter {...props} />
}
