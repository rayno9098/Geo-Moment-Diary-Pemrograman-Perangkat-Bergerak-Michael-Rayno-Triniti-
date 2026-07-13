import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("GeoMomentDiary.db");

/*
|--------------------------------------------------------------------------
| Membuat Table
|--------------------------------------------------------------------------
*/

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS moments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      latitude REAL,
      longitude REAL,
      created_at TEXT
    );
  `);
}

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export function addMoment(data) {
  db.runSync(
    `INSERT INTO moments
    (title,description,image,latitude,longitude,created_at)
    VALUES (?,?,?,?,?,?)`,
    [
      data.title,
      data.description,
      data.image,
      data.latitude,
      data.longitude,
      new Date().toLocaleString(),
    ]
  );
}

/*
|--------------------------------------------------------------------------
| READ ALL
|--------------------------------------------------------------------------
*/

export function getMoments() {
  return db.getAllSync(`
    SELECT *
    FROM moments
    ORDER BY id DESC
  `);
}

/*
|--------------------------------------------------------------------------
| READ ONE
|--------------------------------------------------------------------------
*/

export function getMoment(id) {
  return db.getFirstSync(
    `
    SELECT *
    FROM moments
    WHERE id = ?
    `,
    [id]
  );
}

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export function updateMoment(data) {
  db.runSync(
    `
    UPDATE moments
    SET
      title=?,
      description=?,
      image=?,
      latitude=?,
      longitude=?
    WHERE id=?
    `,
    [
      data.title,
      data.description,
      data.image,
      data.latitude,
      data.longitude,
      data.id,
    ]
  );
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export function deleteMoment(id) {
  db.runSync(
    `
    DELETE FROM moments
    WHERE id=?
    `,
    [id]
  );
}

export default db;