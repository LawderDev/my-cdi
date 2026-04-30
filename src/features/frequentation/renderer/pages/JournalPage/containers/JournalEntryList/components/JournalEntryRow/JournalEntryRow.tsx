import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@ui/components/Avatar'
import { IconButton } from '@ui/components/IconButton'
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

const ROW_BASE_CLASSES =
  'attendance-row group relative flex items-center gap-3 px-3 py-2.5 rounded-sm cursor-pointer transition-colors duration-150 hover:bg-surface mt-0.5'

const ROW_SELECTED_CLASSES = 'bg-accent-bg'

const INFO_CLASSES = 'flex-1 min-w-0'
const NAME_CLASSES = 'text-[13px] font-medium flex items-center gap-1.5'
const CLASSE_CLASSES = 'att-class text-[11px] text-text-dim font-medium ml-1'
const META_CLASSES = 'flex items-center gap-2 mt-0.5'
const TIME_CLASSES = 'att-time font-mono text-[11px] text-text-dim'

const PERIOD_BASE_CLASSES =
  'period-badge text-[10px] font-semibold px-1.5 py-px rounded-xs uppercase tracking-wider'

const PERIOD_MATIN_CLASSES = 'period-matin bg-amber-400/10 text-amber-400'
const PERIOD_APREM_CLASSES = 'period-aprem bg-blue-400/10 text-blue-400'

const ACTIONS_CLASSES =
  'att-actions flex gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100'

const TIME_FORMAT = 'HH:mm'

function buildInitials(prenom: string, nom: string): string {
  return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
}

function buildPeriodClass(period: 'matin' | 'aprem'): string {
  return [PERIOD_BASE_CLASSES, period === 'matin' ? PERIOD_MATIN_CLASSES : PERIOD_APREM_CLASSES]
    .filter(Boolean)
    .join(' ')
}

export function JournalEntryRow({ entry, selected, onEdit, onDelete }: JournalEntryRowProps) {
  const { t } = useTranslation('frequentation')
  const period = getEntryPeriod(entry.startsAt)
  const periodLabel = period === 'matin' ? t('period.matin') : t('period.aprem')
  const time = dayjs(entry.startsAt).format(TIME_FORMAT)
  const rowClass = [ROW_BASE_CLASSES, selected ? ROW_SELECTED_CLASSES : '']
    .filter(Boolean)
    .join(' ')

  function handleEditClick(event: React.MouseEvent) {
    event.stopPropagation()
    onEdit()
  }

  function handleDeleteClick(event: React.MouseEvent) {
    event.stopPropagation()
    onDelete()
  }

  return (
    <div role="row" className={rowClass} onClick={onEdit}>
      <Avatar
        initials={buildInitials(entry.student.prenom, entry.student.nom)}
        colorSeed={entry.student.id}
      />
      <div className={INFO_CLASSES}>
        <div className={NAME_CLASSES}>
          {entry.student.displayName}
          <span className={CLASSE_CLASSES}>{entry.student.classe}</span>
        </div>
        <div className={META_CLASSES}>
          <span className={TIME_CLASSES}>{time}</span>
          <span className={buildPeriodClass(period)}>{periodLabel}</span>
          <ActivityChip activity={entry.activity} label={entry.activityLabel} />
        </div>
      </div>
      <div className={ACTIONS_CLASSES}>
        <IconButton iconName="edit" aria-label={t('row.edit')} onClick={handleEditClick} />
        <IconButton
          iconName="delete"
          tone="danger"
          aria-label={t('row.delete')}
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  )
}
