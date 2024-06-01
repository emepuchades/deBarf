async function createTables(db) {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER,
        typePet VARCHAR(512),
        name VARCHAR(512),
        date VARCHAR(100),
        activity INTEGER,
        sterilized INTEGER,
        sportingDog INTEGER,
        isGreyhound INTEGER,
        image VARCHAR(512),
        weight FLOAT,
        weightUnit VARCHAR(10),
        percentage FLOAT
      )
    `
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        petId INTEGER,
        date TEXT,
        food TEXT
      )
    `
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS language (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
        tag TEXT
      )
    `
    );
  });
}

async function initDatabase(db) {
  createTables(db);
}

export default initDatabase;
