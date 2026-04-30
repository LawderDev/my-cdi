import { Icon } from '../Icon'
import { useAutocomplete } from './hooks/useAutocomplete'
import type { AutocompleteOption, AutocompleteProps } from './types/AutocompleteProps'

const WRAP_CLASSES = 'relative mb-3'

const INPUT_CLASSES =
  'w-full h-[42px] bg-surface border border-border rounded-sm pr-10 pl-[14px] text-[13px] outline-none transition-colors duration-200 placeholder:text-text-dim focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-bg)]'

const SEARCH_ICON_CLASSES =
  'absolute right-[10px] top-1/2 -translate-y-1/2 text-text-dim pointer-events-none'

const SEARCH_ICON_FONT_SIZE_PX = 20
const SEARCH_ICON_STYLE = { fontSize: SEARCH_ICON_FONT_SIZE_PX } as const

const DROPDOWN_BASE_CLASSES =
  'absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-sm shadow-lg z-[100] max-h-[200px] overflow-y-auto'

const OPTION_BASE_CLASSES =
  'px-[14px] py-[10px] cursor-pointer transition-colors duration-100 flex items-center gap-[10px] text-[13px]'

const OPTION_HIGHLIGHTED_CLASSES = 'bg-accent-bg'

const OPTION_BADGE_CLASSES = 'text-text-dim text-[11px] ml-auto bg-surface px-2 py-0.5 rounded-xs'

export function Autocomplete<T>({
  placeholder,
  options,
  onSelect,
  inputValue,
  onInputChange,
  excludedValues,
  maxResults
}: AutocompleteProps<T>) {
  const {
    inputValue: currentValue,
    isOpen,
    highlightedIndex,
    filteredOptions,
    setInputValue,
    open,
    close,
    highlight,
    selectAt,
    handleKeyDown
  } = useAutocomplete<T>({
    options,
    onSelect,
    inputValue,
    onInputChange,
    excludedValues,
    maxResults
  })

  function handleBlur() {
    // Delay close so option click can register
    const closeDelayMs = 120
    setTimeout(close, closeDelayMs)
  }

  function renderOption(option: AutocompleteOption<T>, index: number) {
    const className = [
      OPTION_BASE_CLASSES,
      index === highlightedIndex ? OPTION_HIGHLIGHTED_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <div
        key={String(option.value)}
        role="option"
        aria-selected={index === highlightedIndex}
        className={className}
        onMouseEnter={() => highlight(index)}
        onMouseDown={(event) => {
          // Prevent input blur before click registers
          event.preventDefault()
          selectAt(index)
        }}
      >
        <span>{option.label}</span>
        {option.badge ? <span className={OPTION_BADGE_CLASSES}>{option.badge}</span> : null}
      </div>
    )
  }

  return (
    <div className={WRAP_CLASSES}>
      <input
        type="text"
        className={INPUT_CLASSES}
        placeholder={placeholder}
        value={currentValue}
        onChange={(event) => setInputValue(event.target.value)}
        onFocus={open}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
      />
      <Icon name="search" className={SEARCH_ICON_CLASSES} style={SEARCH_ICON_STYLE} />
      {isOpen && filteredOptions.length > 0 ? (
        <div role="listbox" className={DROPDOWN_BASE_CLASSES}>
          {filteredOptions.map(renderOption)}
        </div>
      ) : null}
    </div>
  )
}
