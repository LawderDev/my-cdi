import { describe, it, expect } from 'vitest'
import { ActivityType } from '@types'
import type { FrequentationGateway } from '../frequentation.gateway'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto, UpdateFrequentationDto } from '@frequentation-shared'

describe('FrequentationGateway interface', () => {
  it('defines all CRUD methods with correct signatures', () => {
    const gateway: FrequentationGateway = {
      create: async (_dto: CreateFrequentationDto): Promise<FrequentationEntity> => ({
        id: 1,
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1,
        createdAt: '2026-01-15T09:00:00.000Z',
        updatedAt: '2026-01-15T09:00:00.000Z'
      }),
      getById: async (_id: number): Promise<FrequentationEntity | null> => null,
      getAll: async (): Promise<FrequentationWithStudentEntity[]> => [],
      getByStudentId: async (_studentId: number): Promise<FrequentationWithStudentEntity[]> => [],
      getByDateRange: async (
        _startDate: string,
        _endDate: string
      ): Promise<FrequentationWithStudentEntity[]> => [],
      update: async (
        _id: number,
        _dto: UpdateFrequentationDto
      ): Promise<FrequentationEntity | null> => null,
      delete: async (_id: number): Promise<boolean> => false,
      deleteByStudentId: async (_studentId: number): Promise<number> => 0,
      count: async (): Promise<number> => 0
    }
    expect(typeof gateway.create).toBe('function')
    expect(typeof gateway.getById).toBe('function')
    expect(typeof gateway.getAll).toBe('function')
    expect(typeof gateway.getByStudentId).toBe('function')
    expect(typeof gateway.getByDateRange).toBe('function')
    expect(typeof gateway.update).toBe('function')
    expect(typeof gateway.delete).toBe('function')
    expect(typeof gateway.deleteByStudentId).toBe('function')
    expect(typeof gateway.count).toBe('function')
  })
})
