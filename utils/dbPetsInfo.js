import * as FileSystem from "expo-file-system";
import getPercentage from "./getPercentage";

export const getAllPets = async (
  db,
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pets;",
        [],
        (txObj, resultSet) => {
          const mascotas = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            mascotas.push(resultSet.rows.item(i));
          }
          resolve(mascotas);
        },
        (txObj, error) => {
          reject(error);
        }
      );
    });
  });
};

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
    let imageBase64 = null;

    if (
      selectedImageUri &&
      typeof selectedImageUri === "string" &&
      selectedImageUri !== ""
    ) {
      imageBase64 = await convertImageToBase64(selectedImageUri);
      await saveImageToDevice(selectedImageUri);
    }

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
          percentage,
        ],
        (txObj, resultSet) => {
          tx.executeSql("COMMIT");
        },
        (txObj, error) => {
          tx.executeSql("ROLLBACK");
        }
      );
    });
  } catch (error) {
    console.log("Error al procesar la imagen", error);
  }
}

export const updatePet = async (
  db,
  petId,
  selectedPet,
  searchText,
  formattedDate,
  activity,
  isSterilized,
  isSportingDog,
  isGreyhound,
  selectedImage,
  weight,
  weightUnit,
  existingUri
) => {
  try {
    let imageBase64 = null;

    if (
      selectedImage &&
      typeof selectedImage === "string" &&
      selectedImage !== ""
    ) {
      imageBase64 = await convertImageToBase64(selectedImage);
      await saveImageToDevice(selectedImage);
    }

    const percentage = await getPercentage(
      selectedPet,
      activity,
      formattedDate,
      isSterilized,
      weight,
      isGreyhound,
      isSportingDog
    );

    try {
      await db.transaction(async (tx) => {
        const updateQuery =
          "UPDATE pets SET typePet=?, name=?, activity=?, image=?, date=?, sterilized=?, sportingDog=?, isGreyhound=?, weight=?, weightUnit=?, percentage=? WHERE id=?;";

        await tx.executeSql(
          updateQuery,
          [
            selectedPet,
            searchText,
            activity,
            imageBase64,
            formattedDate,
            isSterilized ? 1 : 0,
            isSportingDog ? 1 : 0,
            isGreyhound ? 1 : 0,
            parseFloat(weight),
            weightUnit,
            percentage,
            parseFloat(petId),
          ],
          (txObj, resultSet) => {
            tx.executeSql("COMMIT");
          },
          (txObj, error) => {
            tx.executeSql("ROLLBACK");
          }
        );
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  } catch (error) {
    console.error("Error updating pet:", error);
    throw new Error(
      "Error al actualizar la mascota en la base de datos: " + error.message
    );
  }
};

export const getPetById = async (db, petId) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM pets WHERE id=?;",
          [petId],
          (txObj, resultSet) => {
            const petData = resultSet.rows.item(0);
            if (!petData) {
              resolve(null);
            } else {
              resolve({
                id: petData.id,
                petType: petData.typePet,
                name: petData.name,
                date: new Date(petData.date),
                activity: petData.activity,
                isSterilized: petData.sterilized === 1,
                isSportingDog: petData.sportingDog === 1,
                isGreyhound: petData.isGreyhound === 1,
                image: petData.image,
                weight: petData.weight,
                weightUnit: petData.weightUnit,
              });
            }
          },
          (txObj, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    throw new Error(
      "Error al obtener los detalles de la mascota de la base de datos: " +
        error.message
    );
  }
};

async function convertImageToBase64(uri) {
  const response = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return response;
}

async function saveImageToDevice(uri) {
  const fileName = uri.split("/").pop();
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const destination = FileSystem.documentDirectory + timestamp + "_" + fileName;
  await FileSystem.copyAsync({ from: uri, to: destination });
  return destination;
}

async function updateImageToDevice(existingUri, newImageBase64) {
  try {
    if (
      !newImageBase64 ||
      typeof newImageBase64 !== "string" ||
      newImageBase64 === ""
    ) {
      return existingUri;
    }

    const fileName = existingUri.split("/").pop();
    const destination = FileSystem.documentDirectory + fileName;

    if (existingUri !== newImageBase64) {
      await saveImageToDeviceUpdate(newImageBase64, destination);
    }

    return destination;
  } catch (error) {
    console.log("Error saving image to device:", error);
    throw error;
  }
}

async function saveImageToDeviceUpdate(imageBase64, destination) {
  try {
    const imageBytes = new Uint8Array(Buffer.from(imageBase64, "base64"));
    await FileSystem.writeAsStringAsync(destination, imageBytes);
  } catch (error) {
    console.log("Error saving image to device:", error);
    throw error;
  }
}

export default addPet;
