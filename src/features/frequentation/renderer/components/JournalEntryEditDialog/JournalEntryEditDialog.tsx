import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Modal } from '@ui/components/Modal'
import { Button } from '@ui/components/Button'
import { Avatar } from '@ui/components/Avatar'
import { ActivityGrid } from '@frequentation/components/ActivityGrid'
import type { ActivityGridOption } from '@frequentation/components/ActivityGrid'
import type { JournalEntryViewModel } from '@frequentation/types'
import type { ActivityType } from '@types'
import { buildInitials } from './helpers/buildInitials'
import { CLASSE_FONT_SIZE_PX, NAME_FONT_SIZE_PX, NAME_FONT_WEIGHT } from './JournalEntryEditDialog.styles'

interface JournalEntryEditDialogProps {
  open: boolean
  activity: ActivityType
  activities: ActivityGridOption[]
  onActivityChange: (next: ActivityType) => void
  onSubmit: () => void
  onClose: () => void
  entry?: JournalEntryViewModel
}

export function JournalEntryEditDialog({
  open,
  activity,
  activities,
  onActivityChange,
  onSubmit,
  onClose,
  entry
}: JournalEntryEditDialogProps) {
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
          <Avatar
            initials={buildInitials(entry.student.prenom, entry.student.nom)}
            colorSeed={entry.student.id}
          />
          <Box>
            <Box sx={{ fontWeight: NAME_FONT_WEIGHT, fontSize: `${NAME_FONT_SIZE_PX}px` }}>
              {entry.student.displayName}
            </Box>
            <Box sx={{ fontSize: `${CLASSE_FONT_SIZE_PX}px`, color: 'var(--text-dim)' }}>
              {entry.student.classe}
            </Box>
          </Box>
        </Box>
      ) : null}
      <ActivityGrid options={activities} value={activity} onChange={onActivityChange} />
    </Modal>
  )
}
