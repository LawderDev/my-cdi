import type { IpcMain } from 'electron'
import { createMainRouter } from '@shared/ipc/router'
import { STATISTICS_CHANNELS } from '@shared/ipc/channels'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { PeriodRangeDto, StatsForPeriodDto } from '@statistics-shared'
import { getStatsForPeriod } from '@statistics/use-cases/getStatsForPeriod'
import { unwrap } from '@shared/lib/use-case'

export type IpcMainHandle = Pick<IpcMain, 'handle'>

export function registerStatisticsController(
  ipcMain: IpcMainHandle,
  frequentationGateway: FrequentationGateway
): void {
  const router = createMainRouter(ipcMain)

  router.procedure<PeriodRangeDto, StatsForPeriodDto>(
    STATISTICS_CHANNELS.GET_STATS,
    async (input) => {
      return unwrap(await getStatsForPeriod(frequentationGateway, input))
    }
  )
}
