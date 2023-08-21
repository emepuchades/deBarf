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

export async function getMenuData(db, petId, date) {
  console.log("dsf dentro", date);

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT food FROM menu WHERE petId = ? AND date = ?;",
        [petId, date],
        (txObj, resultSet) => {
          try {
            if (resultSet.rows.length > 0) {
              const foodData = resultSet.rows.item(0).food;
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

export default addMenu;
