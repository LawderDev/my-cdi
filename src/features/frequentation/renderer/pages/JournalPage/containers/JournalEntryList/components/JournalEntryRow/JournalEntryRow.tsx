import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Avatar } from '@ui/components/Avatar'
import { IconButton } from '@ui/components/IconButton'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { ActivityChip } from '@frequentation/components/ActivityChip'
import { getEntryPeriod } from '../../helpers/getEntryPeriod'
import type { JournalEntryViewModel } from '@frequentation/types'

interface JournalEntryRowProps {
  entry: JournalEntryViewModel
  selected: boolean
  onToggleSelect?: () => void
  onEdit: () => void
  onDelete: () => void
}

const TIME_FORMAT = 'HH:mm'

const NAME_FONT_SIZE_PX = 13
const NAME_FONT_WEIGHT = 500
const CLASSE_FONT_SIZE_PX = 11
const CLASSE_FONT_WEIGHT = 500
const TIME_FONT_SIZE_PX = 11
const PERIOD_FONT_SIZE_PX = 10
const PERIOD_FONT_WEIGHT = 600

const ACTIONS_CLASS = 'att-actions'

function buildInitials(prenom: string, nom: string): string {
  return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
}

export function JournalEntryRow({ entry, selected, onEdit, onDelete }: JournalEntryRowProps) {
  const { t } = useTranslation('frequentation')
  const period = getEntryPeriod(entry.startsAt)
  const periodLabel = period === 'matin' ? t('period.matin') : t('period.aprem')
  const periodClass = period === 'matin' ? 'period-matin' : 'period-aprem'
  const time = dayjs(entry.startsAt).format(TIME_FORMAT)

  function handleEditClick(event: React.MouseEvent) {
    event.stopPropagation()
    onEdit()
  }

  function handleDeleteClick(event: React.MouseEvent) {
    event.stopPropagation()
    onDelete()
  }

  return (
    <Box
      role="row"
      onClick={onEdit}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 1.5,
        py: 1.25,
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        transition: 'background-color 0.15s',
        bgcolor: selected ? 'var(--accent-bg)' : 'transparent',
        mt: 0.5,
        '&:hover': {
          bgcolor: selected ? 'var(--accent-bg)' : 'var(--surface)'
        },
        [`&:hover .${ACTIONS_CLASS}`]: {
          opacity: 1
        }
      }}
    >
      <Avatar
        initials={buildInitials(entry.student.prenom, entry.student.nom)}
        colorSeed={entry.student.id}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            fontSize: `${NAME_FONT_SIZE_PX}px`,
            fontWeight: NAME_FONT_WEIGHT,
            display: 'flex',
            alignItems: 'center',
            gap: 0.75
          }}
        >
          {entry.student.displayName}
          <Box
            component="span"
            sx={{
              fontSize: `${CLASSE_FONT_SIZE_PX}px`,
              color: 'var(--text-dim)',
              fontWeight: CLASSE_FONT_WEIGHT,
              ml: 0.5
            }}
          >
            {entry.student.classe}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
          <Box
            component="span"
            sx={{
              fontFamily: MONO_FONT_FAMILY,
              fontSize: `${TIME_FONT_SIZE_PX}px`,
              color: 'var(--text-dim)'
            }}
          >
            {time}
          </Box>
          <Box
            component="span"
            className={periodClass}
            sx={{
              fontSize: `${PERIOD_FONT_SIZE_PX}px`,
              fontWeight: PERIOD_FONT_WEIGHT,
              px: 0.75,
              py: '1px',
              borderRadius: 'var(--radius-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {periodLabel}
          </Box>
          <ActivityChip activity={entry.activity} label={entry.activityLabel} />
        </Box>
      </Box>
      <Box
        className={ACTIONS_CLASS}
        sx={{ display: 'flex', gap: 0.25, opacity: 0, transition: 'opacity 0.15s' }}
      >
        <IconButton iconName="edit" aria-label={t('row.edit')} onClick={handleEditClick} />
        <IconButton
          iconName="delete"
          tone="danger"
          aria-label={t('row.delete')}
          onClick={handleDeleteClick}
        />
      </Box>
    </Box>
  )
}
