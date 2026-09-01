import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { Modal } from '@ui/components/Modal'
import { Button } from '@ui/components/Button'
import { Avatar } from '@ui/components/Avatar'
import { ActivityGridPresenter } from '@frequentation/presenters/ActivityGridPresenter'
import { EntrySummary, StudentClasse, StudentName } from './JournalEntryEditDialogPresenter.styles'

export interface EditDialogEntryViewModel {
  initials: string
  colorSeed: number
  displayName: string
  classe: string
}

interface JournalEntryEditDialogPresenterProps {
  open: boolean
  tileNodes: ReactNode[]
  onSubmit: () => void
  onClose: () => void
  entry?: EditDialogEntryViewModel
}

export function JournalEntryEditDialogPresenter({
  open,
  tileNodes,
  onSubmit,
  onClose,
  entry
}: JournalEntryEditDialogPresenterProps) {
  const { t } = useTranslation('frequentation')

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('edit.title')}
      maxWidth="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('form.cancel')}
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {t('edit.save')}
          </Button>
        </>
      }
    >
      {entry ? (
        <EntrySummary>
          <Avatar initials={entry.initials} colorSeed={entry.colorSeed} />
          <div>
            <StudentName>{entry.displayName}</StudentName>
            <StudentClasse>{entry.classe}</StudentClasse>
          </div>
        </EntrySummary>
      ) : null}
      <ActivityGridPresenter tileNodes={tileNodes} />
    </Modal>
  )
}
