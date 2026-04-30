import { useTranslation } from 'react-i18next'
import { Icon } from '@ui/components/Icon'
import type { EntryPeriodFilter } from '../../helpers/filterEntriesByPeriod'

interface JournalEntryToolbarProps {
  entryCount: number
  period: EntryPeriodFilter
  onPeriodChange: (next: EntryPeriodFilter) => void
}

const HEADER_CLASSES =
  'attendance-header flex items-center justify-between px-5 py-4 border-b border-border'

const TITLE_CLASSES = 'text-[15px] font-semibold flex items-center gap-2'
const TITLE_ICON_CLASSES = 'text-accent text-lg'

const COUNT_CLASSES =
  'attendance-count text-xs bg-accent-bg text-accent px-2.5 py-0.5 rounded-[10px] font-semibold'

const FILTERS_CLASSES = 'flex gap-2'

const SELECT_CLASSES =
  'h-[30px] pr-6 pl-2 bg-surface border border-border rounded-xs text-xs text-text cursor-pointer outline-none appearance-none'

function isPeriodFilter(value: string): value is EntryPeriodFilter {
  return value === 'all' || value === 'matin' || value === 'aprem'
}

export function JournalEntryToolbar({
  entryCount,
  period,
  onPeriodChange
}: JournalEntryToolbarProps) {
  const { t } = useTranslation('frequentation')

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value
    if (isPeriodFilter(next)) {
      onPeriodChange(next)
    }
  }

  return (
    <div className={HEADER_CLASSES}>
      <h3 className={TITLE_CLASSES}>
        <Icon name="groups" className={TITLE_ICON_CLASSES} />
        {t('present')}
        <span className={COUNT_CLASSES}>{entryCount}</span>
      </h3>
      <div className={FILTERS_CLASSES}>
        <select className={SELECT_CLASSES} value={period} onChange={handleChange}>
          <option value="all">{t('period.all')}</option>
          <option value="matin">{t('period.matin')}</option>
          <option value="aprem">{t('period.aprem')}</option>
        </select>
      </div>
    </div>
  )
}
