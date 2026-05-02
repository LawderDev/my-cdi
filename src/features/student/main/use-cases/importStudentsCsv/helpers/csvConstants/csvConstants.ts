export const CSV_COLUMN_NOM = 'nom'
export const CSV_COLUMN_PRENOM = 'prenom'
export const CSV_COLUMN_CLASSE = 'classe'
export const CSV_COLUMN_INE = 'ine'
export const CSV_REQUIRED_COLUMNS = [
  CSV_COLUMN_NOM,
  CSV_COLUMN_PRENOM,
  CSV_COLUMN_CLASSE,
  CSV_COLUMN_INE
] as const

export const FIRST_DATA_ROW_NUMBER = 2
export const UTF8_BOM_CHARACTER = 0xfeff

export const HEADER_ALIASES: Record<string, string> = {
  'nom de famille': 'nom',
  'prénom 1': 'prenom',
  prénom: 'prenom',
  division: 'classe',
  ine: 'ine'
}
