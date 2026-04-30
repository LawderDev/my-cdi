import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { IpcMain } from 'electron'
import { ActivityType } from '@types'
import { registerStatisticsController } from '../statistics.controller'
import { STATISTICS_CHANNELS } from '@shared/ipc/channels'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'

const SAMPLE_FREQUENTATION: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: ActivityType.WORK,
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

const SAMPLE_WITH_STUDENT: FrequentationWithStudentEntity = {
  ...SAMPLE_FREQUENTATION,
  studentNom: 'Dupont',
  studentPrenom: 'Jean',
  studentClasse: '6ème A',
  studentIne: '12345678X'
}

type IpcMainHandle = Pick<IpcMain, 'handle'>
type IpcHandler = Parameters<IpcMain['handle']>[1]

interface IpcMainStub extends IpcMainHandle {
  invoke: (channel: string, payload: unknown) => Promise<unknown>
  registeredChannels: () => string[]
}

function createIpcMainStub(): IpcMainStub {
  const handlers = new Map<string, IpcHandler>()
  const handle: IpcMain['handle'] = (channel, listener) => {
    handlers.set(channel, listener)
  }
  return {
    handle,
    invoke: async (channel, payload) => {
      const listener = handlers.get(channel)
      if (!listener) {
        throw new Error(`No handler for ${channel}`)
      }
      const fakeEvent = Object.create(null)
      return listener(fakeEvent, payload)
    },
    registeredChannels: () => Array.from(handlers.keys())
  }
}

function createFrequentationGatewayStub(): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(SAMPLE_FREQUENTATION),
    getById: vi.fn().mockResolvedValue(SAMPLE_FREQUENTATION),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn().mockResolvedValue([]),
    getByDateRange: vi.fn().mockResolvedValue([SAMPLE_WITH_STUDENT]),
    update: vi.fn().mockResolvedValue(SAMPLE_FREQUENTATION),
    delete: vi.fn().mockResolvedValue(true),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0)
  }
}

describe('registerStatisticsController', () => {
  let ipcMain: IpcMainStub
  let frequentationGateway: FrequentationGateway

  beforeEach(() => {
    ipcMain = createIpcMainStub()
    frequentationGateway = createFrequentationGatewayStub()
    registerStatisticsController(ipcMain, frequentationGateway)
  })

  it('registers every channel from STATISTICS_CHANNELS', () => {
    const registered = ipcMain.registeredChannels()
    for (const channel of Object.values(STATISTICS_CHANNELS)) {
      expect(registered).toContain(channel)
    }
  })

  it('returns aggregated stats for the given range', async () => {
    const result = await ipcMain.invoke(STATISTICS_CHANNELS.GET_STATS, {
      startDate: '2026-01-01',
      endDate: '2026-01-31'
    })
    expect(result).toEqual({
      success: true,
      data: expect.objectContaining({ totalVisits: 1 })
    })
    expect(frequentationGateway.getByDateRange).toHaveBeenCalledWith('2026-01-01', '2026-01-31')
  })

  it('returns IpcResult error when gateway throws', async () => {
    frequentationGateway.getByDateRange = vi.fn().mockRejectedValue(new Error('DB error'))

    const result = await ipcMain.invoke(STATISTICS_CHANNELS.GET_STATS, {
      startDate: '2026-01-01',
      endDate: '2026-01-31'
    })
    expect(result).toEqual(expect.objectContaining({ success: false }))
  })
})
