export const MAX_CSV_IMPORT_ROWS = 500
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
