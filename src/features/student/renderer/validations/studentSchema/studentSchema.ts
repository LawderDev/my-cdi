import { z } from 'zod'

const NOM_MAX_LENGTH = 100
const PRENOM_MAX_LENGTH = 100
const CLASSE_MAX_LENGTH = 50

const trimmedString = z.string().trim()

export const nomSchema = trimmedString
  .min(1, 'Le nom est obligatoire')
  .max(NOM_MAX_LENGTH, `Le nom ne peut pas dépasser ${NOM_MAX_LENGTH} caractères`)

export const prenomSchema = trimmedString
  .min(1, 'Le prénom est obligatoire')
  .max(PRENOM_MAX_LENGTH, `Le prénom ne peut pas dépasser ${PRENOM_MAX_LENGTH} caractères`)

export const classeSchema = trimmedString
  .min(1, 'La classe est obligatoire')
  .max(CLASSE_MAX_LENGTH, `La classe ne peut pas dépasser ${CLASSE_MAX_LENGTH} caractères`)

export const ineSchema = trimmedString.min(1, "L'INE est obligatoire")
