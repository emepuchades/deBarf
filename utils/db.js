import * as SQLite from "expo-sqlite";

const setDb = async () => {
  return SQLite.openDatabase("debarf.db");
};

async function createTables() {
  const db = SQLite.openDatabase("debarf.db");

  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS mascotas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER,
        mascota VARCHAR(512),
        nombre VARCHAR(512),
        fecha VARCHAR(100),
        prioridad INTEGER,
        esterilizado INTEGER,
        perroDeporte INTEGER,
        esGalgo INTEGER,
        imagen VARCHAR(512),
        weight FLOAT,
        weightUnit VARCHAR(10)
      )
    `
    );
  });
}

async function initDatabase() {
  const db = SQLite.openDatabase("debarf.db");
  createTables();
  db.closeAsync();
}

export default initDatabase;
