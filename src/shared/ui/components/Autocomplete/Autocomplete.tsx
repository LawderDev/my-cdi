import { useMemo } from 'react'
import MuiAutocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import { Icon } from '../Icon'
import type { AutocompleteOption, AutocompleteProps } from './types/AutocompleteProps'

const DEFAULT_MAX_RESULTS = 8
const SEARCH_ICON_FONT_SIZE_PX = 20
const OPTION_GAP_SPACING = 1.25
const BADGE_PY_SPACING = 0.25

export function Autocomplete<T>({
  placeholder,
  options,
  onSelect,
  inputValue,
  onInputChange,
  excludedValues,
  maxResults = DEFAULT_MAX_RESULTS
}: AutocompleteProps<T>) {
  const excludedSet = useMemo(() => new Set(excludedValues ?? []), [excludedValues])

  const filteredOptions = useMemo(
    () => options.filter((option) => !excludedSet.has(option.value)),
    [options, excludedSet]
  )

  function getOptionLabel(option: AutocompleteOption<T>): string {
    return option.label
  }

  function isOptionEqualToValue(
    option: AutocompleteOption<T>,
    value: AutocompleteOption<T>
  ): boolean {
    return option.value === value.value
  }

  function handleChange(_event: unknown, value: AutocompleteOption<T> | null): void {
    if (value !== null) {
      onSelect(value)
      if (onInputChange) {
        onInputChange('')
      }
    }
  }

  function handleInputChange(_event: unknown, value: string): void {
    if (onInputChange) {
      onInputChange(value)
    }
  }

  function filterOptions(
    candidates: AutocompleteOption<T>[],
    state: { inputValue: string }
  ): AutocompleteOption<T>[] {
    const term = state.inputValue.trim().toLowerCase()
    const matches =
      term.length === 0
        ? candidates
        : candidates.filter((option) => option.label.toLowerCase().includes(term))
    return matches.slice(0, maxResults)
  }

  return (
    <MuiAutocomplete<AutocompleteOption<T>, false, false, false>
      options={filteredOptions}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={filterOptions}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      blurOnSelect
      clearOnBlur={false}
      value={null}
      renderOption={(props, option) => {
        const { key, ...rest } = props
        return (
          <Box
            component="li"
            key={key}
            {...rest}
            sx={{ display: 'flex', alignItems: 'center', gap: OPTION_GAP_SPACING }}
          >
            <span>{option.label}</span>
            {option.badge ? (
              <Box
                component="span"
                sx={{
                  ml: 'auto',
                  fontSize: '11px',
                  color: 'var(--text-dim)',
                  backgroundColor: 'var(--surface)',
                  px: 1,
                  py: BADGE_PY_SPACING,
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                {option.badge}
              </Box>
            ) : null}
          </Box>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          slotProps={{
            input: {
              ...params.slotProps.input,
              endAdornment: (
                <InputAdornment position="end">
                  <Icon
                    name="search"
                    style={{
                      fontSize: `${SEARCH_ICON_FONT_SIZE_PX}px`,
                      color: 'var(--text-dim)'
                    }}
                  />
                </InputAdornment>
              )
            },
            htmlInput: params.slotProps.htmlInput
          }}
        />
      )}
    />
  )
}
