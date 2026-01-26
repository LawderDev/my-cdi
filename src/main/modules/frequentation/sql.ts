// Frequentation Module SQL Queries
// SQL queries as TypeScript exports (no .sql files)

// Insert queries
export const INSERT_FREQUENTATION = `
  INSERT INTO frequentation (starts_at, activity, student_id, created_at, updated_at)
  VALUES (?, ?, ?, datetime('now'), datetime('now'))
`

// Select queries
export const SELECT_ALL_FREQUENTATIONS = `
  SELECT id, starts_at, activity, student_id, created_at, updated_at
  FROM frequentation
  ORDER BY starts_at DESC
`

export const SELECT_FREQUENTATION_BY_ID = `
  SELECT id, starts_at, activity, student_id, created_at, updated_at
  FROM frequentation
  WHERE id = ?
`

export const SELECT_FREQUENTATIONS_BY_STUDENT_ID = `
  SELECT id, starts_at, activity, student_id, created_at, updated_at
  FROM frequentation
  WHERE student_id = ?
  ORDER BY starts_at DESC
`

export const SELECT_FREQUENTATIONS_BY_DATE_RANGE = `
  SELECT
    f.id, f.starts_at, f.activity, f.student_id, f.created_at, f.updated_at,
    s.nom, s.prenom, s.classe
  FROM frequentation f
  LEFT JOIN students s ON f.student_id = s.id
  WHERE f.starts_at >= ? AND f.starts_at <= ?
  ORDER BY f.starts_at DESC
`

export const SELECT_ALL_FREQUENTATIONS_WITH_STUDENT = `
  SELECT
    f.id, f.starts_at, f.activity, f.student_id, f.created_at, f.updated_at,
    s.nom, s.prenom, s.classe
  FROM frequentation f
  LEFT JOIN students s ON f.student_id = s.id
  ORDER BY f.starts_at DESC
`

// Update queries
// UPDATE_FREQUENTATION removed - now uses dynamic SQL in repository

// Delete queries
export const DELETE_FREQUENTATION = `
  DELETE FROM frequentation
  WHERE id = ?
`

export const DELETE_FREQUENTATIONS_BY_STUDENT_ID = `
  DELETE FROM frequentation
  WHERE student_id = ?
`

// Count queries
export const COUNT_FREQUENTATIONS = `
  SELECT COUNT(*) as count FROM frequentation
`
