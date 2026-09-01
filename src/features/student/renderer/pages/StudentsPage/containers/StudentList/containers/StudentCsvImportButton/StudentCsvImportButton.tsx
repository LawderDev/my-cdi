import type { RefObject, ChangeEvent, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { Button } from '@ui/components/Button'
import { Modal } from '@ui/components/Modal'
import { Icon } from '@ui/components/Icon'
import type { CsvImportResult } from '@student-shared'
import {
  VISUALLY_HIDDEN_STYLE,
  TRIGGER_ICON_STYLE,
  DROPZONE_ICON_STYLE,
  DROPZONE_PADDING_PX,
  DROPZONE_TITLE_FONT_SIZE_PX,
  DROPZONE_TITLE_FONT_WEIGHT,
  DROPZONE_SUBTITLE_FONT_SIZE_PX,
  HINT_TITLE_FONT_WEIGHT,
  HINT_FONT_SIZE_PX,
  SELECTED_FILE_FONT_SIZE_PX,
  SELECTED_FILE_FONT_WEIGHT
} from './StudentCsvImportButton.styles'

const CSV_ACCEPT = '.csv'

interface StudentCsvImportButtonProps {
  isModalOpen: boolean
  pendingFile: File | null
  result: CsvImportResult | null
  errorLines: string[]
  error: string | null
  isPending: boolean
  inputRef: RefObject<HTMLInputElement | null>
  openModal: () => void
  closeModal: () => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDropzoneClick: () => void
  handleDropzoneKeyDown: (event: KeyboardEvent) => void
  handleSubmit: () => void
}

export function StudentCsvImportButton(props: StudentCsvImportButtonProps) {
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
    openModal,
    closeModal,
    handleFileChange,
    handleDropzoneClick,
    handleDropzoneKeyDown,
    handleSubmit
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
        <Box
          role="button"
          tabIndex={0}
          onClick={handleDropzoneClick}
          onKeyDown={handleDropzoneKeyDown}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--border)',
            borderRadius: 'var(--radius)',
            p: `${DROPZONE_PADDING_PX}px`,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            mb: 2,
            '&:hover': { borderColor: 'var(--accent)' }
          }}
        >
          <Icon
            name="cloud_upload"
            style={{ ...DROPZONE_ICON_STYLE, marginBottom: '8px', color: 'var(--text-dim)' }}
          />
          <Box
            component="p"
            sx={{
              fontSize: `${DROPZONE_TITLE_FONT_SIZE_PX}px`,
              fontWeight: DROPZONE_TITLE_FONT_WEIGHT,
              mb: 0.5,
              m: 0
            }}
          >
            {t('csvImport.dropzoneTitle')}
          </Box>
          <Box
            component="small"
            sx={{ fontSize: `${DROPZONE_SUBTITLE_FONT_SIZE_PX}px`, color: 'var(--text-dim)' }}
          >
            {t('csvImport.dropzoneSubtitle')}
          </Box>
          {pendingFile ? (
            <Box
              sx={{
                mt: 1.5,
                fontSize: `${SELECTED_FILE_FONT_SIZE_PX}px`,
                color: 'var(--text)',
                fontWeight: SELECTED_FILE_FONT_WEIGHT
              }}
            >
              {pendingFile.name}
            </Box>
          ) : null}
        </Box>
        <input
          ref={inputRef}
          type="file"
          accept={CSV_ACCEPT}
          aria-hidden
          tabIndex={-1}
          onChange={handleFileChange}
          style={VISUALLY_HIDDEN_STYLE}
        />

        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : null}

        {result ? (
          <Alert severity={result.errors > 0 ? 'warning' : 'success'} sx={{ mb: 2 }}>
            {result.created > 0
              ? t('csvImport.success', { count: result.created })
              : t('csvImport.noStudentsCreated')}
            {result.errors > 0 ? ` (${result.errors} ${t('csvImport.errors')})` : ''}
          </Alert>
        ) : null}

        {result && result.errorDetails.length > 0 ? (
          <Box
            sx={{
              bgcolor: 'var(--surface)',
              borderRadius: 'var(--radius-sm)',
              p: 1.75,
              fontSize: `${HINT_FONT_SIZE_PX}px`,
              color: 'var(--text-dim)',
              lineHeight: 1.5,
              mb: 2,
              maxHeight: '200px',
              overflowY: 'auto'
            }}
          >
            {errorLines.map((errorLine, index) => (
              <Box key={index} sx={{ color: 'var(--danger)', mb: 0.5 }}>
                {errorLine}
              </Box>
            ))}
          </Box>
        ) : null}

        <Box
          sx={{
            bgcolor: 'var(--surface)',
            borderRadius: 'var(--radius-sm)',
            p: 1.75,
            fontSize: `${HINT_FONT_SIZE_PX}px`,
            color: 'var(--text-dim)',
            lineHeight: 1.5
          }}
        >
          <Box sx={{ fontWeight: HINT_TITLE_FONT_WEIGHT, color: 'var(--text)', mb: 0.5 }}>
            {t('csvImport.expectedColumns')}
          </Box>
          {t('csvImport.expectedColumnsList')}
          <Box
            component="small"
            sx={{ display: 'block', mt: 0.5, fontSize: `${HINT_FONT_SIZE_PX}px` }}
          >
            {t('csvImport.expectedColumnsHint')}
          </Box>
        </Box>
      </Modal>
    </>
  )
}
