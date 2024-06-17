async function addLanguage(db, code, tag) {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO language (code, tag) VALUES (?, ?)`,
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

export const getLanguage = async (db) => {
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

export default addLanguage;
