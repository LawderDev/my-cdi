export { studentTable, studentEntitySchema } from '../../features/student/main/entities/student'
export type {
  StudentEntity,
  InsertStudentEntity,
  SelectStudentEntity
} from '../../features/student/main/entities/student'

export {
  frequentationTable,
  FrequentationEntitySchema
} from '../../features/frequentation/main/entities/frequentation'
export type {
  FrequentationEntity,
  FrequentationWithStudentEntity,
  InsertFrequentationEntity,
  SelectFrequentationEntity
} from '../../features/frequentation/main/entities/frequentation'

export { settingTable, settingEntitySchema } from '../../features/settings/main/entities/setting'
export type {
  SettingEntity,
  InsertSettingEntity,
  SelectSettingEntity
} from '../../features/settings/main/entities/setting'
