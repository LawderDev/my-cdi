// Student Module
// Main entry point for the student module

import Database from 'better-sqlite3'
import { StudentModuleRepository } from './repository'
import { StudentModuleManager } from './manager'
import { StudentModuleController } from './controller'
import { StudentModule } from './types'

// Factory function to create the student module
export function createStudentModule(db: Database.Database): StudentModule {
  const repository = new StudentModuleRepository(db)
  const manager = new StudentModuleManager(repository)
  const controller = new StudentModuleController(manager)

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
