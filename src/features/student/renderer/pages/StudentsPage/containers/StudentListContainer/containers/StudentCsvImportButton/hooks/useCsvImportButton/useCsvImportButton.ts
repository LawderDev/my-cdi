import { useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent, RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { useImportStudentsCsv } from '@student/api/useStudentMutations'
import { useToast } from '@ui/hooks/useToast'
import { downloadTextFile } from '@ui/helpers/downloadTextFile'
import type { CsvImportResult } from '@student-shared'
import type { ToastContent } from '@ui/components/Toast'
import { readFileBuffer, decodeText } from '../../helpers/decodeCsvFile'
import { formatImportError } from '../../helpers/formatImportError'
import { buildErrorReport } from '../../helpers/buildErrorReport'
import { buildReportFileName } from '../../helpers/buildReportFileName'

export interface CsvImportButtonState {
  isModalOpen: boolean
  pendingFile: File | null
  result: CsvImportResult | null
  errorLines: string[]
  error: string | null
  isPending: boolean
  inputRef: RefObject<HTMLInputElement | null>
  toast: ToastContent | null
  canDownloadReport: boolean
  updateExisting: boolean
}

export interface CsvImportButtonActions {
  openModal: () => void
  closeModal: () => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDropzoneClick: () => void
  handleDropzoneKeyDown: (event: KeyboardEvent) => void
  handleSubmit: () => void
  handleToggleUpdateExisting: () => void
  handleDownloadReport: () => void
  dismissToast: () => void
}

export function useCsvImportButton(): CsvImportButtonState & CsvImportButtonActions {
  const { t: tCommon } = useTranslation('common')
  const { t: tStudent } = useTranslation('student')
  const { toast, show, dismiss } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [result, setResult] = useState<CsvImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [updateExisting, setUpdateExisting] = useState(false)
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

  function handleToggleUpdateExisting() {
    setUpdateExisting((previous) => !previous)
  }

  function handleDownloadReport() {
    if (!result || !pendingFile) {
      return
    }
    const report = buildErrorReport({
      fileName: pendingFile.name,
      created: result.created,
      updated: result.updated,
      errorLines: result.errorDetails.map((errorDetail) =>
        formatImportError(errorDetail, tStudent)
      ),
      translate: tStudent
    })
    downloadTextFile(report, buildReportFileName(pendingFile.name, new Date()))
  }

  async function handleSubmit() {
    if (!pendingFile) {
      return
    }

    try {
      const buffer = await readFileBuffer(pendingFile)
      const csv = decodeText(buffer)

      importStudents(
        { csv, onDuplicateIne: updateExisting ? 'replace' : 'skip' },
        {
          onSuccess: (data) => {
            setResult(data)
            if (data.errors === 0) {
              closeModal()
              show(
                tStudent('csvImport.summary', {
                  count: data.created,
                  updated: data.updated,
                  errors: 0
                })
              )
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
    toast,
    canDownloadReport: result !== null && pendingFile !== null,
    updateExisting,
    openModal,
    closeModal,
    handleFileChange,
    handleDropzoneClick,
    handleDropzoneKeyDown,
    handleSubmit,
    handleToggleUpdateExisting,
    handleDownloadReport,
    dismissToast: dismiss
  }
}
