import * as FileSystem from "expo-file-system";

async function addPet(
  db,
  selectedMascota,
  searchText,
  formattedDate,
  priority,
  isEsterilizado,
  isPerroDeporte,
  isGalgo,
  selectedImageUri,
  weight,
  weightUnit
) {
  try {
    let imageBase64 = null; // Set to null when no image is available

    if (
      selectedImageUri &&
      typeof selectedImageUri === "string" &&
      selectedImageUri !== ""
    ) {
      // Convert the image to base64
      imageBase64 = await convertImageToBase64(selectedImageUri);
      // Save the image physically to the device
      await saveImageToDevice(selectedImageUri);
    }

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
          imageBase64, // Use null if no image is available
          parseFloat(weight),
          weightUnit,
        ],
        (txObj, resultSet) => {
          console.log("resultSet", resultSet);
        },
        (txObj, error) => console.log("Error al añadir pet", error)
      );
    });
  } catch (error) {
    console.log("Error al procesar la imagen", error);
  }
}


async function convertImageToBase64(uri) {
  const response = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return response; // No need to append `data:image/jpeg;base64,` here
}

async function saveImageToDevice(uri) {
  const fileName = uri.split("/").pop(); // Obtener el nombre del archivo de la URI
  const destination = FileSystem.documentDirectory + fileName;
  await FileSystem.copyAsync({ from: uri, to: destination });
  return destination;
}


export default addPet