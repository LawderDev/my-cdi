import { useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent, RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { useImportStudentsCsv } from '@student/api/useStudentMutations'
import type { CsvImportResult } from '@student-shared'
import { readFileBuffer, decodeText } from '../../helpers/decodeCsvFile'
import { formatImportError } from '../../helpers/formatImportError'

export interface CsvImportButtonState {
  isModalOpen: boolean
  pendingFile: File | null
  result: CsvImportResult | null
  errorLines: string[]
  error: string | null
  isPending: boolean
  inputRef: RefObject<HTMLInputElement | null>
}

export interface CsvImportButtonActions {
  openModal: () => void
  closeModal: () => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDropzoneClick: () => void
  handleDropzoneKeyDown: (event: KeyboardEvent) => void
  handleSubmit: () => void
}

export function useCsvImportButton(): CsvImportButtonState & CsvImportButtonActions {
  const { t: tCommon } = useTranslation('common')
  const { t: tStudent } = useTranslation('student')
  const inputRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [result, setResult] = useState<CsvImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { mutate: importStudents, isPending } = useImportStudentsCsv()

  function openModal() {
    setIsModalOpen(true)
    setResult(null)
    setError(null)
  }

  function closeModal() {
    setIsModalOpen(false)
    setPendingFile(null)
    setResult(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    setPendingFile(file)
    setResult(null)
    setError(null)
  }

  function handleDropzoneClick() {
    inputRef.current?.click()
  }

  function handleDropzoneKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      handleDropzoneClick()
    }
  }

  async function handleSubmit() {
    if (!pendingFile) {
      return
    }

    try {
      const buffer = await readFileBuffer(pendingFile)
      const csv = decodeText(buffer)

      importStudents(
        { csv },
        {
          onSuccess: (data) => {
            setResult(data)
            if (data.errors === 0) {
              closeModal()
            }
          },
          onError: (err) => {
            setError(err instanceof Error ? err.message : tCommon('app.unknownError'))
          }
        }
      )
    } catch {
      setError(tStudent('csvImport.fileReadError'))
    }
  }

  const errorLines: string[] = result
    ? result.errorDetails.map((errorDetail) => formatImportError(errorDetail, tStudent))
    : []

  return {
    isModalOpen,
    pendingFile,
    result,
    errorLines,
    error,
    isPending,
    inputRef,
    openModal,
    closeModal,
    handleFileChange,
    handleDropzoneClick,
    handleDropzoneKeyDown,
    handleSubmit
  }
}
