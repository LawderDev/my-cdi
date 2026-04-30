import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { IpcMain } from 'electron'
import { ActivityType } from '@types'
import { registerFrequentationController } from '../frequentation.controller'
import { FREQUENTATION_CHANNELS } from '@shared/ipc/channels'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { StudentGateway } from '@student/gateways/student'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { StudentEntity } from '@student/entities/student'

const STUDENT_ID = 1
const FREQUENTATION_ID = 1

const SAMPLE_FREQUENTATION: FrequentationEntity = {
  id: FREQUENTATION_ID,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: ActivityType.WORK,
  studentId: STUDENT_ID,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

const SAMPLE_STUDENT: StudentEntity = {
  id: STUDENT_ID,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '6ème A',
  ine: '12345678X',
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
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
    getByDateRange: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(SAMPLE_FREQUENTATION),
    delete: vi.fn().mockResolvedValue(true),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0)
  }
}

function createStudentGatewayStub(): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(SAMPLE_STUDENT),
    getById: vi.fn().mockResolvedValue(SAMPLE_STUDENT),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(SAMPLE_STUDENT),
    delete: vi.fn().mockResolvedValue(true),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([])
  }
}

describe('registerFrequentationController', () => {
  let ipcMain: IpcMainStub
  let frequentationGateway: FrequentationGateway
  let studentGateway: StudentGateway

  beforeEach(() => {
    ipcMain = createIpcMainStub()
    frequentationGateway = createFrequentationGatewayStub()
    studentGateway = createStudentGatewayStub()
    registerFrequentationController(ipcMain, frequentationGateway, studentGateway)
  })

  it('registers every channel from FREQUENTATION_CHANNELS', () => {
    const registered = ipcMain.registeredChannels()
    for (const channel of Object.values(FREQUENTATION_CHANNELS)) {
      expect(registered).toContain(channel)
    }
  })

  it('registers create handler that delegates to use-case', async () => {
    const result = await ipcMain.invoke(FREQUENTATION_CHANNELS.CREATE, {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.WORK,
      studentId: 1
    })
    expect(result).toEqual({
      success: true,
      data: expect.objectContaining({ activity: 'work' })
    })
    expect(frequentationGateway.create).toHaveBeenCalledOnce()
  })

  it('returns IpcResult error when use case fails', async () => {
    const result = await ipcMain.invoke(FREQUENTATION_CHANNELS.CREATE, {
      startsAt: '',
      activity: ActivityType.WORK,
      studentId: 1
    })
    expect(result).toEqual(expect.objectContaining({ success: false }))
  })
})
