import { z } from 'zod'

export const activityTypeSchema = z.enum([
  'work',
  'reading',
  'computer',
  'relaxation',
  'game',
  'other'
])
