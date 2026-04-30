import { useCallback, useMemo, useState } from 'react'
import type { AutocompleteOption } from '../../types/AutocompleteProps'

const DEFAULT_MAX_RESULTS = 8
const NO_HIGHLIGHT = -1
const FIRST_INDEX = 0
const STEP = 1

export interface UseAutocompleteParams<T> {
  options: AutocompleteOption<T>[]
  onSelect: (option: AutocompleteOption<T>) => void
  inputValue?: string
  onInputChange?: (next: string) => void
  excludedValues?: T[]
  maxResults?: number
}

export interface UseAutocompleteReturn<T> {
  inputValue: string
  isOpen: boolean
  highlightedIndex: number
  filteredOptions: AutocompleteOption<T>[]
  setInputValue: (next: string) => void
  open: () => void
  close: () => void
  highlight: (index: number) => void
  selectAt: (index: number) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export function useAutocomplete<T>({
  options,
  onSelect,
  inputValue,
  onInputChange,
  excludedValues,
  maxResults = DEFAULT_MAX_RESULTS
}: UseAutocompleteParams<T>): UseAutocompleteReturn<T> {
  const isControlled = inputValue !== undefined
  const [internalValue, setInternalValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(NO_HIGHLIGHT)

  const currentValue = isControlled ? inputValue : internalValue

  const filteredOptions = useMemo(() => {
    const excluded = new Set(excludedValues ?? [])
    const search = currentValue.trim().toLowerCase()
    const matches = options.filter((option) => {
      if (excluded.has(option.value)) {
        return false
      }
      if (search.length === 0) {
        return true
      }
      return option.label.toLowerCase().includes(search)
    })
    return matches.slice(FIRST_INDEX, maxResults)
  }, [options, excludedValues, currentValue, maxResults])

  const setInputValue = useCallback(
    (next: string) => {
      if (isControlled) {
        if (onInputChange) {
          onInputChange(next)
        }
      } else {
        setInternalValue(next)
        if (onInputChange) {
          onInputChange(next)
        }
      }
      setIsOpen(true)
      setHighlightedIndex(NO_HIGHLIGHT)
    },
    [isControlled, onInputChange]
  )

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setHighlightedIndex(NO_HIGHLIGHT)
  }, [])

  const highlight = useCallback((index: number) => {
    setHighlightedIndex(index)
  }, [])

  const selectAt = useCallback(
    (index: number) => {
      const option = filteredOptions[index]
      if (!option) {
        return
      }
      onSelect(option)
      if (isControlled) {
        if (onInputChange) {
          onInputChange('')
        }
      } else {
        setInternalValue('')
        if (onInputChange) {
          onInputChange('')
        }
      }
      setIsOpen(false)
      setHighlightedIndex(NO_HIGHLIGHT)
    },
    [filteredOptions, onSelect, isControlled, onInputChange]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (filteredOptions.length === 0) {
          return
        }
        setIsOpen(true)
        setHighlightedIndex((prev) => {
          const next = prev + STEP
          if (next >= filteredOptions.length) {
            return FIRST_INDEX
          }
          return next
        })
        return
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (filteredOptions.length === 0) {
          return
        }
        setIsOpen(true)
        setHighlightedIndex((prev) => {
          if (prev <= FIRST_INDEX) {
            return filteredOptions.length - STEP
          }
          return prev - STEP
        })
        return
      }
      if (event.key === 'Enter') {
        if (highlightedIndex >= FIRST_INDEX) {
          event.preventDefault()
          selectAt(highlightedIndex)
        }
        return
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    },
    [filteredOptions, highlightedIndex, selectAt, close]
  )

  return {
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
  }
}
