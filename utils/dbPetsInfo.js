import * as FileSystem from "expo-file-system";
import getPercentage from "./getPercentage";

async function addPet(
  db,
  selectedPet,
  searchText,
  formattedDate,
  activity,
  isSterilized,
  isSportingDog,
  isGreyhound,
  selectedImageUri,
  weight,
  weightUnit
) {
  try {
    let imageBase64 = null; // Set to null when no image is available

    console.log('addPet')

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

    //Calcular porcentage
    const percentage = await getPercentage(
      selectedPet,
      activity,
      formattedDate,
      isSterilized,
      weight,
      isGreyhound,
      isSportingDog
    );

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO pets (typePet, name, date, activity, sterilized, sportingDog, isGreyhound , image, weight, weightUnit, percentage)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          selectedPet,
          searchText,
          formattedDate,
          activity,
          isSterilized ? 1 : 0,
          isSportingDog ? 1 : 0,
          isGreyhound ? 1 : 0,
          imageBase64,
          parseFloat(weight),
          weightUnit,
          percentage
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