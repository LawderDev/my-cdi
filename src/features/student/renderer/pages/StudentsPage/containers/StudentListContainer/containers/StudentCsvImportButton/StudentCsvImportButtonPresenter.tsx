import type { RefObject, ChangeEvent, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Button } from '@ui/components/Button'
import { Modal } from '@ui/components/Modal'
import { Icon } from '@ui/components/Icon'
import { Toast } from '@ui/components/Toast'
import type { CsvImportResult } from '@student-shared'
import type { ToastContent } from '@ui/components/Toast'
import {
  VISUALLY_HIDDEN_STYLE,
  TRIGGER_ICON_STYLE,
  Dropzone,
  DropzoneIcon,
  DropzoneSubtitle,
  DropzoneTitle,
  ErrorLine,
  ErrorLinesPanel,
  HintPanel,
  HintSmall,
  HintTitle,
  ReportActions,
  ResultAlert,
  SelectedFileName
} from './StudentCsvImportButtonPresenter.styles'

const CSV_ACCEPT = '.csv'

interface StudentCsvImportButtonPresenterProps {
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

export function StudentCsvImportButtonPresenter(props: StudentCsvImportButtonPresenterProps) {
  const { t } = useTranslation('student')
  const { t: tCommon } = useTranslation('common')

  const {
    isModalOpen,
    pendingFile,
    result,
    errorLines,
    error,
    isPending,
    inputRef,
    toast,
    canDownloadReport,
    updateExisting,
    openModal,
    closeModal,
    handleFileChange,
    handleDropzoneClick,
    handleDropzoneKeyDown,
    handleSubmit,
    handleToggleUpdateExisting,
    handleDownloadReport,
    dismissToast
  } = props

  return (
    <>
      <Button
        variant="secondary"
        iconLeft={<Icon name="upload_file" style={TRIGGER_ICON_STYLE} />}
        onClick={openModal}
        disabled={isPending}
      >
        {t('import')}
      </Button>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={t('csvImport.title')}
        maxWidth="lg"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={closeModal} disabled={isPending}>
              {tCommon('app.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              iconLeft={<Icon name="upload_file" style={TRIGGER_ICON_STYLE} />}
              onClick={handleSubmit}
              disabled={!pendingFile || isPending}
            >
              {t('csvImport.submit')}
            </Button>
          </>
        }
      >
        <Dropzone
          role="button"
          tabIndex={0}
          onClick={handleDropzoneClick}
          onKeyDown={handleDropzoneKeyDown}
        >
          <DropzoneIcon name="cloud_upload" />
          <DropzoneTitle variant="body1">{t('csvImport.dropzoneTitle')}</DropzoneTitle>
          <DropzoneSubtitle variant="body2">{t('csvImport.dropzoneSubtitle')}</DropzoneSubtitle>
          {pendingFile ? (
            <SelectedFileName variant="body2">{pendingFile.name}</SelectedFileName>
          ) : null}
        </Dropzone>
        <input
          ref={inputRef}
          type="file"
          accept={CSV_ACCEPT}
          aria-hidden
          tabIndex={-1}
          onChange={handleFileChange}
          style={VISUALLY_HIDDEN_STYLE}
        />

        <FormControlLabel
          control={<Checkbox checked={updateExisting} onChange={handleToggleUpdateExisting} />}
          label={t('csvImport.updateExisting')}
        />

        {error ? <ResultAlert severity="error">{error}</ResultAlert> : null}

        {result && result.errors > 0 ? (
          <ResultAlert severity="warning">
            {t('csvImport.summary', {
              count: result.created,
              updated: result.updated,
              errors: result.errors
            })}
          </ResultAlert>
        ) : null}

        {result && result.errorDetails.length > 0 ? (
          <>
            <ErrorLinesPanel>
              {errorLines.map((errorLine, index) => (
                <ErrorLine key={index}>{errorLine}</ErrorLine>
              ))}
            </ErrorLinesPanel>
            <ReportActions>
              <Button
                variant="secondary"
                iconLeft={<Icon name="download" style={TRIGGER_ICON_STYLE} />}
                onClick={handleDownloadReport}
                disabled={!canDownloadReport}
              >
                {t('csvImport.downloadReport')}
              </Button>
            </ReportActions>
          </>
        ) : null}

        <HintPanel>
          <HintTitle>{t('csvImport.expectedColumns')}</HintTitle>
          {t('csvImport.expectedColumnsList')}
          <HintSmall>{t('csvImport.expectedColumnsHint')}</HintSmall>
        </HintPanel>
      </Modal>

      <Toast toast={toast} onClose={dismissToast} />
    </>
  )
}
