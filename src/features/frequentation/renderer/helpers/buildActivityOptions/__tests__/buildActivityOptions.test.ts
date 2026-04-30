import { describe, it, expect } from 'vitest'
import { buildActivityOptions } from '../buildActivityOptions'
import { ActivityType } from '@types'

describe('buildActivityOptions', () => {
  it('maps every activity to a {value, label, iconName} option', () => {
    const labels: Record<ActivityType, string> = {
      [ActivityType.WORK]: 'Travail',
      [ActivityType.READING]: 'Lecture',
      [ActivityType.COMPUTER]: 'Ordinateur',
      [ActivityType.RELAXATION]: 'Détente',
      [ActivityType.GAME]: 'Jeu de société',
      [ActivityType.OTHER]: 'Autre'
    }
    const result = buildActivityOptions(Object.values(ActivityType), (a) => labels[a])

    expect(result).toEqual([
      { value: ActivityType.WORK, label: 'Travail', iconName: 'edit' },
      { value: ActivityType.READING, label: 'Lecture', iconName: 'menu_book' },
      { value: ActivityType.COMPUTER, label: 'Ordinateur', iconName: 'computer' },
      { value: ActivityType.RELAXATION, label: 'Détente', iconName: 'weekend' },
      { value: ActivityType.GAME, label: 'Jeu de société', iconName: 'casino' },
      { value: ActivityType.OTHER, label: 'Autre', iconName: 'more_horiz' }
    ])
  })

  it('returns empty array for empty input', () => {
    expect(buildActivityOptions([], () => '')).toEqual([])
  })
})
