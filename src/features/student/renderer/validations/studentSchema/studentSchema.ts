import { z } from 'zod'

const NOM_MAX_LENGTH = 100
const PRENOM_MAX_LENGTH = 100
const CLASSE_MAX_LENGTH = 50

const trimmedString = z.string().trim()

export const nomSchema = trimmedString.min(1).max(NOM_MAX_LENGTH)

export const prenomSchema = trimmedString.min(1).max(PRENOM_MAX_LENGTH)

export const classeSchema = trimmedString.min(1).max(CLASSE_MAX_LENGTH)

export const ineSchema = trimmedString.min(1)
