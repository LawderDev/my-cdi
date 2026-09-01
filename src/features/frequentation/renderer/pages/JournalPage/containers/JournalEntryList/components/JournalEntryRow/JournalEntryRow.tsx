import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Avatar } from '@ui/components/Avatar'
import { IconButton } from '@ui/components/IconButton'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { ActivityChip } from '@frequentation/components/ActivityChip'
import {
  ACTIONS_CLASS,
  CLASSE_FONT_SIZE_PX,
  CLASSE_FONT_WEIGHT,
  NAME_FONT_SIZE_PX,
  NAME_FONT_WEIGHT,
  PERIOD_FONT_SIZE_PX,
  PERIOD_FONT_WEIGHT,
  TIME_FONT_SIZE_PX
} from './JournalEntryRow.styles'

export interface JournalEntryRowProps {
  initials: string
  avatarColorSeed: number
  displayName: string
  classe: string
  time: string
  periodLabel: string
  periodClass: string
  activityCssClass: string
  activityLabel: string
  selected: boolean
  onRowClick: (event: React.MouseEvent) => void
  onEditClick: (event: React.MouseEvent) => void
  onDeleteClick: (event: React.MouseEvent) => void
}

export function JournalEntryRow({
  initials,
  avatarColorSeed,
  displayName,
  classe,
  time,
  periodLabel,
  periodClass,
  activityCssClass,
  activityLabel,
  selected,
  onRowClick,
  onEditClick,
  onDeleteClick
}: JournalEntryRowProps) {
  const { t } = useTranslation('frequentation')

  return (
    <Box
      role="row"
      onClick={onRowClick}
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
      <Avatar initials={initials} colorSeed={avatarColorSeed} />
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
          {displayName}
          <Box
            component="span"
            sx={{
              fontSize: `${CLASSE_FONT_SIZE_PX}px`,
              color: 'var(--text-dim)',
              fontWeight: CLASSE_FONT_WEIGHT,
              ml: 0.5
            }}
          >
            {classe}
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
          <ActivityChip cssClass={activityCssClass} label={activityLabel} />
        </Box>
      </Box>
      <Box
        className={ACTIONS_CLASS}
        sx={{ display: 'flex', gap: 0.25, opacity: 0, transition: 'opacity 0.15s' }}
      >
        <IconButton iconName="edit" aria-label={t('row.edit')} onClick={onEditClick} />
        <IconButton
          iconName="delete"
          tone="danger"
          aria-label={t('row.delete')}
          onClick={onDeleteClick}
        />
      </Box>
    </Box>
  )
}
