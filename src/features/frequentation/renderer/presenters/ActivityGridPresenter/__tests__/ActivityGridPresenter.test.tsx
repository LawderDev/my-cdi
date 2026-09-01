import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@ui/theme'
import { ActivityGridPresenter } from '../ActivityGridPresenter'
import { buildActivityTiles } from '../helpers/buildActivityTiles'
import { buildActivityTileNodes } from '../helpers/buildActivityTileNodes'
import { ActivityType } from '@types'
import type { ActivityGridOption } from '../types/ActivityGridPresenterProps'

const OPTIONS: ActivityGridOption[] = [
  { value: ActivityType.COMPUTER, label: 'Ordinateur', iconName: 'computer' },
  { value: ActivityType.WORK, label: 'Travail', iconName: 'edit' },
  { value: ActivityType.READING, label: 'Lecture', iconName: 'menu_book' }
]

describe('ActivityGridPresenter', () => {
  it('renders one tile per option', () => {
    const tiles = buildActivityTiles(OPTIONS, ActivityType.COMPUTER, vi.fn())
    render(
      <ThemeProvider theme={theme}>
        <ActivityGridPresenter tileNodes={buildActivityTileNodes(tiles)} />
      </ThemeProvider>
    )
    expect(screen.getByRole('button', { name: 'Ordinateur' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Travail' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Lecture' })).toBeInTheDocument()
  })

  it('marks the active tile with data-selected="true"', () => {
    const tiles = buildActivityTiles(OPTIONS, ActivityType.WORK, vi.fn())
    render(
      <ThemeProvider theme={theme}>
        <ActivityGridPresenter tileNodes={buildActivityTileNodes(tiles)} />
      </ThemeProvider>
    )
    expect(screen.getByRole('button', { name: 'Travail' })).toHaveAttribute('data-selected', 'true')
    expect(screen.getByRole('button', { name: 'Ordinateur' })).toHaveAttribute(
      'data-selected',
      'false'
    )
  })

  it('calls onChange with the clicked tile value', () => {
    const onChange = vi.fn()
    const tiles = buildActivityTiles(OPTIONS, ActivityType.COMPUTER, onChange)
    render(
      <ThemeProvider theme={theme}>
        <ActivityGridPresenter tileNodes={buildActivityTileNodes(tiles)} />
      </ThemeProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Lecture' }))
    expect(onChange).toHaveBeenCalledWith(ActivityType.READING)
  })
})
