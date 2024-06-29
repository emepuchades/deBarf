import * as SQLite from "expo-sqlite";

export async function addLanguage(db, code, tag) {

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO language (code, tag) VALUES (?, ?)`,
        [code, tag],
        (txObj, resultSet) => {
          resolve(resultSet);
        },
        (txObj, error) => {
          reject(error);
        }
      );
    });
  });
}

export const getLanguage = (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM language;",
        [],
        (txObj, resultSet) => {
          resolve({
            data: resultSet.rows.item(0),
            length: resultSet.rows.length,
          });
        },
        (txObj, error) => {
          reject(error);
        }
      );
    });
  });
};

export async function updateLanguage(db, code, tag) {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        `UPDATE language SET code = ?, tag = ?`,
        [code, tag],
        (txObj, resultSet) => {
          tx.executeSql("COMMIT");
        },
        (txObj, error) => {
          tx.executeSql("ROLLBACK");
        }
      );
    });
  } catch (error) {
    console.log("Error al procesar", error);
  }
}

export async function getLanguaguesAsync() {
  try {
    const languages = await getLanguage(SQLite.openDatabase("debarf.db"));
    return languages;
  } catch (error) {
  }
}

export default addLanguage;
