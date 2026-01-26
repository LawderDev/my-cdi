// Student Module SQL Queries
// SQL queries as TypeScript exports (no .sql files)

// Insert queries
export const INSERT_STUDENT = `
  INSERT INTO students (nom, prenom, classe, created_at, updated_at)
  VALUES (?, ?, ?, datetime('now'), datetime('now'))
`

// Select queries
export const SELECT_ALL_STUDENTS = `
  SELECT id, nom, prenom, classe, created_at, updated_at
  FROM students
  ORDER BY nom ASC, prenom ASC
`

export const SELECT_STUDENT_BY_ID = `
  SELECT id, nom, prenom, classe, created_at, updated_at
  FROM students
  WHERE id = ?
`

export const SELECT_STUDENTS_BY_CLASS = `
  SELECT id, nom, prenom, classe, created_at, updated_at
  FROM students
  WHERE classe = ?
  ORDER BY nom ASC, prenom ASC
`

// Update queries
export const UPDATE_STUDENT = `
  UPDATE students
  SET nom = ?, prenom = ?, classe = ?, updated_at = datetime('now')
  WHERE id = ?
`

// Delete queries
export const DELETE_STUDENT = `
  DELETE FROM students
  WHERE id = ?
`

// Count queries
export const COUNT_STUDENTS = `
  SELECT COUNT(*) as count FROM students
`

// Complex queries
export const SELECT_STUDENTS_WITHOUT_FREQUENTATION_AT_DATE = `
  SELECT s.id, s.nom, s.prenom, s.classe, s.created_at, s.updated_at
  FROM students s
  WHERE s.id NOT IN (
    SELECT DISTINCT f.student_id FROM frequentation f
    WHERE DATE(f.starts_at) = ?
  )
  ORDER BY s.nom ASC, s.prenom ASC
`
