import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Modal } from '@ui/components/Modal'
import { Button } from '@ui/components/Button'
import { Avatar } from '@ui/components/Avatar'
import { ActivityGridPresenter } from '@frequentation/components/ActivityGridPresenter'
import {
  CLASSE_FONT_SIZE_PX,
  NAME_FONT_SIZE_PX,
  NAME_FONT_WEIGHT
} from './JournalEntryEditDialogPresenter.styles'

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            mb: 2,
            p: 1.25,
            bgcolor: 'var(--surface)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <Avatar initials={entry.initials} colorSeed={entry.colorSeed} />
          <Box>
            <Box sx={{ fontWeight: NAME_FONT_WEIGHT, fontSize: `${NAME_FONT_SIZE_PX}px` }}>
              {entry.displayName}
            </Box>
            <Box sx={{ fontSize: `${CLASSE_FONT_SIZE_PX}px`, color: 'var(--text-dim)' }}>
              {entry.classe}
            </Box>
          </Box>
        </Box>
      ) : null}
      <ActivityGridPresenter tileNodes={tileNodes} />
    </Modal>
  )
}
