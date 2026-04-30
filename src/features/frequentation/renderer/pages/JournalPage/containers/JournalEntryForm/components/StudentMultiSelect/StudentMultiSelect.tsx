import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Autocomplete } from '@ui/components/Autocomplete'
import { Chip } from '@ui/components/Chip'
import type { AutocompleteOption } from '@ui/components/Autocomplete'

interface StudentOption {
  id: number
  displayName: string
  classe: string
}

interface StudentMultiSelectProps {
  students: StudentOption[]
  selectedIds: number[]
  onChange: (ids: number[]) => void
  loading: boolean
}

const LABEL_CLASSES =
  'block text-[11px] font-semibold uppercase tracking-wider text-text-dim mb-1.5'

const CHIPS_ROW_CLASSES = 'flex flex-wrap gap-1.5 min-h-7'

const LOADING_CLASSES = 'text-xs text-text-dim mb-2'

export function StudentMultiSelect({
  students,
  selectedIds,
  onChange,
  loading
}: StudentMultiSelectProps) {
  const { t } = useTranslation('frequentation')
  const [inputValue, setInputValue] = useState<string>('')

  const options: AutocompleteOption<number>[] = students.map((student) => ({
    value: student.id,
    label: student.displayName,
    badge: student.classe
  }))

  const selectedStudents = students.filter((student) => selectedIds.includes(student.id))

  function handleSelect(option: AutocompleteOption<number>) {
    if (selectedIds.includes(option.value)) {
      return
    }
    onChange([...selectedIds, option.value])
    setInputValue('')
  }

  function handleRemove(id: number) {
    onChange(selectedIds.filter((existing) => existing !== id))
  }

  return (
    <div>
      <span className={LABEL_CLASSES}>{t('form.selectStudents')}</span>
      {loading ? <div className={LOADING_CLASSES}>{t('loading')}</div> : null}
      <Autocomplete<number>
        placeholder={t('form.searchStudent')}
        options={options}
        onSelect={handleSelect}
        inputValue={inputValue}
        onInputChange={setInputValue}
        excludedValues={selectedIds}
      />
      <div className={CHIPS_ROW_CLASSES}>
        {selectedStudents.map((student) => (
          <Chip
            key={student.id}
            label={student.displayName}
            onRemove={() => handleRemove(student.id)}
          />
        ))}
      </div>
    </div>
  )
}
