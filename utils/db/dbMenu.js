async function addMenu(db, date, petID, foodJSON) {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO menu (date, petId, food) VALUES (?, ?, ?)`,
        [date, petID, foodJSON],
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

export async function updateMenu(db, menuID, date, petID, foodJSON) {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        `UPDATE menu SET date = ?, petId = ?, food = ? WHERE id = ?`,
        [date, petID, foodJSON, menuID],
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

export async function getMenuData(db, petId, date) {

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM menu WHERE petId = ? AND date = ?;",
        [petId, date],
        (txObj, resultSet) => {
          try {
            if (resultSet.rows.length > 0) {
              const foodData = resultSet.rows.item(0);
              resolve(foodData);
            } else {
              resolve(null); // No hay datos para la mascota y fecha seleccionadas
            }
          } catch (error) {
            reject(error);
          }
        },
        (txObj, error) => {
          reject(error);
        }
      );
    });
  });
}


export const checkIfMenuDataExists = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM menu;",
        [],
        (txObj, resultSet) => {
          const rowCount = resultSet.rows.length;
          resolve(rowCount > 0);
        },
        (txObj, error) => {
          reject(error);
        }
      );
    });
  });
};

export async function addLanguage(db, code, tag) {
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
          resolve({data: resultSet.rows.item(0), length: resultSet.rows.length});
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


export default addMenu;
