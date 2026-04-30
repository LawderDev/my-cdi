import type { IpcMain } from 'electron'
import { createMainRouter } from '@shared/ipc/router'
import { FREQUENTATION_CHANNELS } from '@shared/ipc/channels'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { StudentGateway } from '@student/gateways/student'
import type {
  CreateFrequentationDto,
  UpdateFrequentationDto,
  CreateFrequentationBatchDto,
  DateRangeDto,
  FrequentationResponseDto,
  JournalEntryDto
} from '@frequentation-shared'
import { createFrequentation } from '@frequentation/use-cases/createFrequentation'
import { updateFrequentation } from '@frequentation/use-cases/updateFrequentation'
import { deleteFrequentation } from '@frequentation/use-cases/deleteFrequentation'
import { getFrequentation } from '@frequentation/use-cases/getFrequentation'
import { listFrequentations } from '@frequentation/use-cases/listFrequentations'
import { getJournalEntries } from '@frequentation/use-cases/getJournalEntries'
import { createFrequentationBatch } from '@frequentation/use-cases/createFrequentationBatch'
import type { BatchResult } from '@frequentation/use-cases/createFrequentationBatch'
import { formatFrequentationResponse } from '@frequentation/use-cases/helpers/formatFrequentationResponse'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { UseCaseResult } from '@frequentation/use-cases/types/UseCaseResult'

interface GetFrequentationInput {
  id: number
}

interface ListFrequentationsInput {
  studentId?: number
  dateRange?: DateRangeDto
}

interface UpdateFrequentationInput extends UpdateFrequentationDto {
  id: number
}

interface DeleteFrequentationInput {
  id: number
}

export type IpcMainHandle = Pick<IpcMain, 'handle'>

function unwrap<T>(result: UseCaseResult<T>): T {
  if (!result.success) {
    throw new Error(result.error)
  }
  return result.data
}

export function registerFrequentationController(
  ipcMain: IpcMainHandle,
  frequentationGateway: FrequentationGateway,
  studentGateway: StudentGateway
): void {
  const router = createMainRouter(ipcMain)

  router.procedure<CreateFrequentationDto, FrequentationEntity>(
    FREQUENTATION_CHANNELS.CREATE,
    async (input) => {
      return unwrap(await createFrequentation(frequentationGateway, input))
    }
  )

  router.procedure<GetFrequentationInput, FrequentationEntity>(
    FREQUENTATION_CHANNELS.GET,
    async (input) => {
      return unwrap(await getFrequentation(frequentationGateway, input.id))
    }
  )

  router.procedure<ListFrequentationsInput, FrequentationResponseDto[]>(
    FREQUENTATION_CHANNELS.LIST,
    async (input) => {
      const entities = unwrap(await listFrequentations(frequentationGateway, input))
      return entities.map(formatFrequentationResponse)
    }
  )

  router.procedure<UpdateFrequentationInput, FrequentationEntity>(
    FREQUENTATION_CHANNELS.UPDATE,
    async (input) => {
      const { id, ...dto } = input
      return unwrap(await updateFrequentation(frequentationGateway, id, dto))
    }
  )

  router.procedure<DeleteFrequentationInput, boolean>(
    FREQUENTATION_CHANNELS.DELETE,
    async (input) => {
      return unwrap(await deleteFrequentation(frequentationGateway, input.id))
    }
  )

  router.procedure<CreateFrequentationBatchDto, BatchResult>(
    FREQUENTATION_CHANNELS.CREATE_BATCH,
    async (input) => {
      return unwrap(await createFrequentationBatch(frequentationGateway, input))
    }
  )

  router.procedure<DateRangeDto, JournalEntryDto[]>(
    FREQUENTATION_CHANNELS.GET_JOURNAL_ENTRIES,
    async (input) => {
      return unwrap(await getJournalEntries(frequentationGateway, studentGateway, input))
    }
  )
}
