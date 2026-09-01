import { StudentCsvImportButtonPresenter } from './StudentCsvImportButtonPresenter'
import { useCsvImportButton } from './hooks/useCsvImportButton/useCsvImportButton'

export function StudentCsvImportButtonContainer() {
  const props = useCsvImportButton()

  return <StudentCsvImportButtonPresenter {...props} />
}
