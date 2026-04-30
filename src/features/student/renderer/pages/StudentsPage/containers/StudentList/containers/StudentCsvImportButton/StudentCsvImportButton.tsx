import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Button } from '@ui/components/Button'
import { Modal } from '@ui/components/Modal'
import { Icon } from '@ui/components/Icon'
import { useImportStudentsCsv } from '@student/api/useStudentMutations'

const CSV_ACCEPT = '.csv'

const HIDDEN_INPUT_STYLE = { display: 'none' } as const
const TRIGGER_ICON_FONT_SIZE_PX = 16
const TRIGGER_ICON_STYLE = { fontSize: TRIGGER_ICON_FONT_SIZE_PX } as const
const DROPZONE_ICON_FONT_SIZE_PX = 40
const DROPZONE_ICON_STYLE = { fontSize: DROPZONE_ICON_FONT_SIZE_PX } as const

const DROPZONE_PADDING_PX = 40
const DROPZONE_TITLE_FONT_SIZE_PX = 13
const DROPZONE_TITLE_FONT_WEIGHT = 500
const DROPZONE_SUBTITLE_FONT_SIZE_PX = 12
const HINT_TITLE_FONT_WEIGHT = 600
const HINT_FONT_SIZE_PX = 12
const SELECTED_FILE_FONT_SIZE_PX = 12
const SELECTED_FILE_FONT_WEIGHT = 500

export function StudentCsvImportButton() {
  const { t } = useTranslation('student')
  const { t: tCommon } = useTranslation('common')
  const inputRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const { mutate: importStudents, isPending } = useImportStudentsCsv()

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setPendingFile(null)
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
  }

  function handleDropzoneClick() {
    inputRef.current?.click()
  }

  async function handleSubmit() {
    if (!pendingFile) {
      return
    }
    const csv = await pendingFile.text()
    importStudents(
      { csv },
      {
        onSuccess: () => {
          closeModal()
        }
      }
    )
  }

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
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleDropzoneClick()
            }
          }}
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
        <Box
          component="input"
          ref={inputRef}
          type="file"
          accept={CSV_ACCEPT}
          onChange={handleFileChange}
          sx={HIDDEN_INPUT_STYLE}
        />
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
