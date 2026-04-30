import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@ui/components/Button'
import { Icon } from '@ui/components/Icon'
import { StudentCsvImportButton } from '../../containers/StudentCsvImportButton'

interface StudentListToolbarProps {
  searchTerm: string
  totalCount: number
  onSearchChange: (value: string) => void
  onAddStudent: () => void
}

const TOOLBAR_CLASSES = 'students-toolbar flex items-center gap-3 mb-5'
const SEARCH_WRAPPER_CLASSES = 'students-search relative flex-1 max-w-[380px]'
const SEARCH_INPUT_CLASSES =
  'w-full h-10 bg-surface border border-border rounded-sm pl-[38px] pr-[14px] text-[13px] outline-none transition-[border] duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-bg)]'
const SEARCH_ICON_CLASSES = 'absolute left-[10px] top-1/2 -translate-y-1/2 text-text-dim text-lg'
const COUNT_CLASSES = 'students-count text-xs text-text-dim font-medium'
const SPACER_CLASSES = 'flex-1'
const SMALL_ICON_FONT_SIZE = 16
const SMALL_ICON_STYLE = { fontSize: SMALL_ICON_FONT_SIZE } as const

export function StudentListToolbar({
  searchTerm,
  totalCount,
  onSearchChange,
  onAddStudent
}: StudentListToolbarProps) {
  const { t } = useTranslation('student')

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value)
  }

  return (
    <div className={TOOLBAR_CLASSES}>
      <div className={SEARCH_WRAPPER_CLASSES}>
        <Icon name="search" className={SEARCH_ICON_CLASSES} />
        <input
          type="text"
          aria-label={t('searchPlaceholder')}
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={handleSearchChange}
          className={SEARCH_INPUT_CLASSES}
        />
      </div>
      <span className={COUNT_CLASSES}>{t('count', { count: totalCount })}</span>
      <div className={SPACER_CLASSES} />
      <StudentCsvImportButton />
      <Button
        variant="primary"
        iconLeft={<Icon name="person_add" style={SMALL_ICON_STYLE} />}
        onClick={onAddStudent}
      >
        {t('add')}
      </Button>
    </div>
  )
}
