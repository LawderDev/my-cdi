import { z } from 'zod'
import { ActivityType } from '@types'

export const activityTypeSchema = z.nativeEnum(ActivityType)
