import { describe, it, expect } from 'vitest'
import { buildActivityOptions } from '../buildActivityOptions'
import { ActivityType } from '@types'

describe('buildActivityOptions', () => {
  it('maps every activity to a {value, label} option', () => {
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
      { value: ActivityType.WORK, label: 'Travail' },
      { value: ActivityType.READING, label: 'Lecture' },
      { value: ActivityType.COMPUTER, label: 'Ordinateur' },
      { value: ActivityType.RELAXATION, label: 'Détente' },
      { value: ActivityType.GAME, label: 'Jeu de société' },
      { value: ActivityType.OTHER, label: 'Autre' }
    ])
  })

  it('returns empty array for empty input', () => {
    expect(buildActivityOptions([], () => '')).toEqual([])
  })
})
