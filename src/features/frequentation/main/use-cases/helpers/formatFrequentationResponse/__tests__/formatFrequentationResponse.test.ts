import { describe, it, expect } from 'vitest'
import { ActivityType } from '@types'
import { formatFrequentationResponse } from '../formatFrequentationResponse'
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'

describe('formatFrequentationResponse', () => {
  it('maps FrequentationWithStudentEntity to FrequentationResponseDto', () => {
    const entity: FrequentationWithStudentEntity = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.WORK,
      studentId: 1,
      studentNom: 'Dupont',
      studentPrenom: 'Jean',
      studentClasse: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }

    const result = formatFrequentationResponse(entity)

    expect(result).toEqual({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentName: 'Jean Dupont',
      studentClass: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
  })

  it('formats studentName as "prenom nom"', () => {
    const entity: FrequentationWithStudentEntity = {
      id: 2,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.READING,
      studentId: 2,
      studentNom: 'Martin',
      studentPrenom: 'Marie',
      studentClasse: '5ème B',
      studentIne: '87654321Y',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }

    const result = formatFrequentationResponse(entity)
    expect(result.studentName).toBe('Marie Martin')
  })
})
