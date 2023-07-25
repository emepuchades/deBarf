import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Button as PaperButton } from "react-native-paper";
import SyncStorage from "sync-storage";
import { AuthenticatedUserContext } from "../../../utils/context/context";
import { useNavigation } from '@react-navigation/native'; // Asegúrate de tener React Navigation instalado y configurado.
import  { getDbConnection } from "../../../utils/db";

import colors from "../../../utils/colors";

function Calculator( addName,
          setIsCalculator,
          selectedMascota,
          setSelectedMascota,
          searchText,
          setSearchText,
          date,
          setDate,
          priority,
          setPriority,
          isEsterilizado,
          setIsEsterilizado,
          isPerroDeporte,
          setIsPerroDeporte,
          isGalgo,
          setIsGalgo,
          selectedImage,
          setSelectedImage,
          weight,
          setWeight,
          weightUnit,
          setWeightUnit,
          selectedPet,
          setSelectedPet,
          datePicker,
          setDatePicker) {



  const { user, setUser } = useContext(AuthenticatedUserContext);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handlePetSelection = (pet) => {
    setSelectedPet(pet === selectedPet ? null : pet);
    setSelectedMascota(pet);
  };

  let petImageSource = null;
  switch (selectedMascota) {
    case "perro":
      petImageSource = require("../../../assets/pets/dogDefault.png");
      break;
    case "gato":
      petImageSource = require("../../../assets/pets/catDefault.png");
      break;
    case "huron":
      petImageSource = require("../../../assets/pets/ferretDefault.png");
      break;
    default:
      petImageSource = require("../../../assets/pets/dogDefault.png");
      break;
  }

  const handleImageSelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.uri);
      } else {
        setSelectedImage(null);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  const handleGuardar = async () => {
    try {
      if (
        !selectedMascota ||
        !searchText ||
        !date ||
        weight === null ||
        priority === null
      ) {
        console.log(
          "Por favor, complete todos los campos obligatorios antes de guardar la mascota."
        );
        return;
      }

      if (isNaN(weight)) {
        console.log("El peso debe ser un número válido.");
        return;
      }

      if (!user) {
        console.log(
          "No hay un usuario autenticado. No se puede guardar la mascota."
        );
        return;
      }
      console.log("handleGuardar" );

      addName();

      setIsCalculator(false);
    } catch (error) {
      console.log("Error al guardar los datos de mascota:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      vertical
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.containerSelectPet}>
        <Text style={styles.titleEligeType}>Elige el tipo de mascota</Text>
        <View style={styles.buttonContainer}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/pets/dogDefault.png")}
          />
          <Text
            style={[
              styles.buttonText,
              selectedPet === "perro" && styles.buttonTextPressed,
            ]}
          >
            Perro
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              selectedPet === "gato" && styles.buttonPressed,
            ]}
            onPress={() => handlePetSelection("gato")}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../../../assets/pets/catDefault.png")}
            />
            <Text
              style={[
                styles.buttonText,
                selectedPet === "gato" && styles.buttonTextPressed,
              ]}
            >
              Gato
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedPet === "huron" && styles.buttonPressed,
            ]}
            onPress={() => handlePetSelection("huron")}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../../../assets/pets/ferretDefault.png")}
            />
            <Text
              style={[
                styles.buttonText,
                selectedPet === "huron" && styles.buttonTextPressed,
              ]}
            >
              Huron
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPetInfo}>
          <TouchableOpacity onPress={handleImageSelect}>
            {/* Aquí agregamos el TouchableOpacity encima de la imagen */}
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.petImage} />
            ) : (
              <Image source={petImageSource} style={styles.petImage} />
            )}
            <View style={styles.overlay}>
              <Ionicons name="camera" size={24} color="#fff" />
              <Text color="#fff">Anade una foto</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.petNameTitle}>
              {" "}
              Nombre de tu {selectedMascota}
            </Text>
            <TextInput
              value={searchText}
              style={styles.namePet}
              onChangeText={handleSearchTextChange}
              placeholder={`Nombre de tu ${selectedMascota}`}
            />
          </View>
        </View>

        <View style={styles.containerDate}>
          <Text> Fecha nacimiento: {date}</Text>
          {datePicker && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={onDateSelected}
              style={styles.datePicker}
            />
          )}

          <View style={{ margin: 10 }}>
            <Button
              title="Introduce la fecha de nacimiento"
              color="green"
              onPress={showDatePicker}
            />
          </View>
        </View>

        <Text>Seleccionar peso:</Text>
        <View style={styles.weightPickerContainer}>
          <View style={styles.weightInputContainer}>
            <TextInput
              style={styles.weightInput}
              value={weight}
              onChangeText={setWeight}
              placeholder="Ingrese el peso"
              keyboardType="numeric"
            />
            <Picker
              selectedValue={weightUnit}
              style={styles.weightUnitPicker}
              onValueChange={(itemValue) => setWeightUnit(itemValue)}
            >
              <Picker.Item label="Kilos" value="kilos" />
              <Picker.Item label="Libras" value="libras" />
            </Picker>
          </View>
        </View>

        <Text>Seleccionar de actividad:</Text>
        <Picker
          selectedValue={priority}
          style={styles.picker}
          onValueChange={handlePriorityChange}
        >
          <Picker.Item label="Baja" value="baja" />
          <Picker.Item label="Media" value="media" />
          <Picker.Item label="Alta" value="alta" />
        </Picker>

        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            style={[styles.checkBox, isEsterilizado && styles.checkBoxSelected]}
            onPress={() => setIsEsterilizado(!isEsterilizado)}
          >
            {isEsterilizado && <Text style={styles.checkBoxText}>✓</Text>}
          </TouchableOpacity>
          <Text>Esterilizado</Text>
        </View>

        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            style={[styles.checkBox, isPerroDeporte && styles.checkBoxSelected]}
            onPress={() => setIsPerroDeporte(!isPerroDeporte)}
          >
            {isPerroDeporte && <Text style={styles.checkBoxText}>✓</Text>}
          </TouchableOpacity>
          <Text>Perro de deporte</Text>
        </View>

        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            style={[styles.checkBox, isGalgo && styles.checkBoxSelected]}
            onPress={() => setIsGalgo(!isGalgo)}
          >
            {isGalgo && <Text style={styles.checkBoxText}>✓</Text>}
          </TouchableOpacity>
          <Text>Es galgo</Text>
        </View>
        <PaperButton
          onPress={handleGuardar}
          mode="contained"
          style={styles.guardarButton}
        >
          Guardar
        </PaperButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: windowHeight - 140,
    width: windowWidth,
    padding: 20,
  },
  tinyLogo: {
    height: 40,
    width: 40,
  },
  containerPetInfo: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  titleEligeType: {
    fontWeight: "bold",
  },
  containerSelectPet: {
    marginBottom: 20,
  },
  petNameTitle: {
    marginLeft: 20,
    marginTop: 30,
    fontWeight: "bold",
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  namePet: {
    width: "100%",
    backgroundColor: colors.inputBackground,
    height: 45,
    marginBottom: 20,
    fontSize: 16,
    padding: 12,
    margin: 20,
    borderRadius: 10,
  },
  containerDate: {
    marginBottom: 20,
  },
  weightPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  weightPicker: {
    alignItems: "center",
  },
  pickerItem: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 30,
  },
  pickerItemText: {
    fontSize: 18,
    color: "#000",
  },
  picker: {
    width: "90%",
    height: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "left",
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,

    borderColor: "#000",
  },
  buttonText: {
    fontSize: 16,
  },
  buttonPressed: {
    backgroundColor: "#000",
  },
  buttonTextPressed: {
    color: "#fff",
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkBox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  checkBoxSelected: {
    backgroundColor: "#000",
  },
  checkBoxText: {
    color: "#fff",
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  weightInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  weightInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: colors.inputBackground,
    height: 45,
    borderRadius: 10,
  },
  weightUnitPicker: {
    width: 140,
  },
  guardarButton: {
    margin: 20,
  },
});

export default Calculator;
