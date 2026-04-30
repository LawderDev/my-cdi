import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@ui/components/Button'
import { Modal } from '@ui/components/Modal'
import { Icon } from '@ui/components/Icon'
import { useImportStudentsCsv } from '@student/api/useStudentMutations'

const CSV_ACCEPT = '.csv'

const HIDDEN_INPUT_STYLE = { display: 'none' } as const
const TRIGGER_ICON_FONT_SIZE = 16
const TRIGGER_ICON_STYLE = { fontSize: TRIGGER_ICON_FONT_SIZE } as const
const DROPZONE_ICON_FONT_SIZE = 40
const DROPZONE_ICON_STYLE = { fontSize: DROPZONE_ICON_FONT_SIZE } as const

const DROPZONE_CLASSES =
  'flex flex-col items-center justify-center border-2 border-dashed border-border rounded p-10 text-center cursor-pointer transition-colors duration-200 hover:border-accent mb-4'
const DROPZONE_ICON_CLASSES = 'block mb-2 text-text-dim'
const DROPZONE_TITLE_CLASSES = 'text-sm font-medium mb-1'
const DROPZONE_SUBTITLE_CLASSES = 'text-xs text-text-dim'
const HINT_BOX_CLASSES = 'bg-surface rounded-sm p-3.5 text-xs text-text-dim leading-relaxed'
const HINT_TITLE_CLASSES = 'font-semibold text-text mb-1'
const HINT_HINT_CLASSES = 'block mt-1 text-xs'
const SELECTED_FILE_CLASSES = 'mt-3 text-xs text-text font-medium'

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
        <div
          role="button"
          tabIndex={0}
          className={DROPZONE_CLASSES}
          onClick={handleDropzoneClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleDropzoneClick()
            }
          }}
        >
          <Icon name="cloud_upload" className={DROPZONE_ICON_CLASSES} style={DROPZONE_ICON_STYLE} />
          <p className={DROPZONE_TITLE_CLASSES}>{t('csvImport.dropzoneTitle')}</p>
          <small className={DROPZONE_SUBTITLE_CLASSES}>{t('csvImport.dropzoneSubtitle')}</small>
          {pendingFile ? <div className={SELECTED_FILE_CLASSES}>{pendingFile.name}</div> : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={CSV_ACCEPT}
          onChange={handleFileChange}
          style={HIDDEN_INPUT_STYLE}
        />
        <div className={HINT_BOX_CLASSES}>
          <div className={HINT_TITLE_CLASSES}>{t('csvImport.expectedColumns')}</div>
          {t('csvImport.expectedColumnsList')}
          <small className={HINT_HINT_CLASSES}>{t('csvImport.expectedColumnsHint')}</small>
        </div>
      </Modal>
    </>
  )
}
