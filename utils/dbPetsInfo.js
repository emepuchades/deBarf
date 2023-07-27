
async function addPet(
  db,
  selectedMascota,
  searchText,
  formattedDate,
  priority,
  isEsterilizado,
  isPerroDeporte,
  isGalgo,
  selectedImage,
  weight,
  weightUnit
) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO mascotas (mascota, nombre, fecha, prioridad, esterilizado, perroDeporte, esGalgo, imagen, weight, weightUnit)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        selectedMascota,
        searchText,
        formattedDate,
        priority,
        isEsterilizado ? 1 : 0,
        isPerroDeporte ? 1 : 0,
        isGalgo ? 1 : 0,
        selectedImage,
        parseFloat(weight),
        weightUnit,
      ],
      (txObj, resultSet) => {
        console.log("resultSet", resultSet);
      },
      (txObj, error) => console.log("Error al anadir pet", error)
    );
  });
}

export default addPet;
