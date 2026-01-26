// Frequentation Module
// Main entry point for the frequentation module

import Database from 'better-sqlite3'
import { FrequentationModuleRepository } from './repository'
import { FrequentationModuleManager } from './manager'
import { FrequentationModuleController } from './controller'
import { FrequentationModule } from './types'

// Factory function to create the frequentation module
export function createFrequentationModule(db: Database.Database): FrequentationModule {
  const repository = new FrequentationModuleRepository(db)
  const manager = new FrequentationModuleManager(repository)
  const controller = new FrequentationModuleController(manager)

  return {
    repository,
    manager,
    controller
  }
}

// Export all module components
export * from './types'
export * from './models'
export * from './repository'
export * from './manager'
export * from './controller'
export * from './sql'
export * from './repository.helpers'
