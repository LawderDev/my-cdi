import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { IpcMain } from 'electron'
import { registerStudentController } from '../student.controller'
import { STUDENT_CHANNELS } from '@shared/ipc/channels'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const STUDENT_ID = 1

const SAMPLE_ENTITY: StudentEntity = {
  id: STUDENT_ID,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: 'INE1',
  createdAt: '2026-04-26T00:00:00.000Z',
  updatedAt: '2026-04-26T00:00:00.000Z'
}

type IpcMainHandle = Pick<IpcMain, 'handle'>
type IpcHandler = Parameters<IpcMain['handle']>[1]

interface IpcMainStub extends IpcMainHandle {
  invoke: (channel: string, payload: unknown) => Promise<unknown>
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
    }
  }
}

function createGatewayStub(): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    update: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    delete: vi.fn().mockResolvedValue(true),
    getById: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    getAll: vi.fn().mockResolvedValue([]),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([])
  }
}

describe('registerStudentController', () => {
  let ipcMain: IpcMainStub
  let gateway: StudentGateway

  beforeEach(() => {
    ipcMain = createIpcMainStub()
    gateway = createGatewayStub()
  })

  it('registers create handler that delegates to use-case', async () => {
    registerStudentController(ipcMain, gateway)
    const result = await ipcMain.invoke(STUDENT_CHANNELS.CREATE, {
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: 'INE1'
    })
    expect(result).toEqual({ success: true, data: expect.objectContaining({ nom: 'Dupont' }) })
    expect(gateway.create).toHaveBeenCalledOnce()
  })

  it('registers every channel from STUDENT_CHANNELS', () => {
    registerStudentController(ipcMain, gateway)
    for (const channel of Object.values(STUDENT_CHANNELS)) {
      expect(() => ipcMain.invoke(channel, {})).not.toThrow()
    }
  })
})
