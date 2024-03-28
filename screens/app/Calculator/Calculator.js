import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { styleCalculator } from "./Calculator.style";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Button as PaperButton } from "react-native-paper";
import { AuthenticatedUserContext } from "../../../utils/context/context";
import { useNavigation } from "@react-navigation/native";
import addPet from "../../../utils/dbPetsInfo";
import { useTranslation } from "react-i18next";
import ErrorMessage from "../../../components/ErrorMessage";

function Calculator() {
  const { user, db } = useContext(AuthenticatedUserContext);
  const { t } = useTranslation();

  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedPet, setSelectedPet] = useState("perro");
  const [activity, setActivity] = useState("baja");
  const [isSterilized, setIsSterilized] = useState(false);
  const [isSportingDog, setIsSportingDog] = useState(false);
  const [isGreyhound, setIsGreyhound] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [weight, setWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState("kilos");
  const HomeURL = t("navBottom.pets");
  const [errorMessages, setErrorMessages] = useState({});

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleActivityChange = (value) => {
    setActivity(value);
  };

  const handlePetSelection = (pet) => {
    setSelectedPet(pet === selectedPet ? null : pet);
  };

  let petImageSource = null;
  switch (selectedPet) {
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
        setSelectedImage(result.assets[0].uri);
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
    if (value) {
      setDate(value);
      setDatePicker(false);
    }
  }

  const handleGuardar = async () => {
    try {
      setErrorMessages({});

      if (
        !selectedPet ||
        !searchText ||
        !date ||
        weight === null ||
        activity === null
      ) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          general: t(`calculator.generalError`),
        }));
        return;
      }

      if (isNaN(weight) || weight === 0) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          weight: t(`calculator.weigthError`),
        }));
        return;
      }

      if (!user) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          user: t(`calculator.userError`),
        }));
        return;
      }
      const formattedDate = date.toISOString();

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (date.toDateString() === currentDate.toDateString()) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          date: t(`calculator.dateError`),
        }));
        return;
      }

      await addPet(
        db,
        selectedPet,
        searchText,
        formattedDate,
        activity,
        isSterilized,
        isSportingDog,
        isGreyhound,
        selectedImage,
        weight,
        weightUnit
      );

      setSearchText("");
      setDate(new Date());
      setSelectedPet("perro");
      setActivity("baja");
      setIsSterilized(false);
      setIsSportingDog(false);
      setIsGreyhound(false);
      setSelectedImage("");
      setWeight(0);
      setWeightUnit("kilos");

      navigation.navigate(HomeURL);
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
        <Text style={styles.titleEligeType}>{t(`calculator.choosePet`)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedPet === "perro" && styles.buttonPressed,
            ]}
            onPress={() => handlePetSelection("perro")}
          >
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
              {t(`dog`)}
            </Text>
          </TouchableOpacity>
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
              {t(`cat`)}
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
              {t(`ferret`)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPetInfo}>
          <TouchableOpacity onPress={handleImageSelect}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.petImage} />
            ) : (
              <Image source={petImageSource} style={styles.petImage} />
            )}
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <Ionicons name="camera" size={30} color="#fff" />
              <Text color="#fff">{t(`calculator.addImage`)}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.petNameConatiner}>
            <Text style={styles.petNameTitle}>{t(`calculator.namePet`)}</Text>
            <TextInput
              value={searchText}
              style={styles.namePet}
              onChangeText={handleSearchTextChange}
              placeholder={t(`calculator.namePet`)}
            />
          </View>
        </View>

        <View style={styles.containerDate}>
          <View style={styles.containerDateText}>
            <Text style={styles.textDateBirthTitle}>
              {t(`calculator.dateBirth`)}
            </Text>
            <Text style={styles.textDateBirth}>{date.toDateString()}</Text>
          </View>
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
              title={t(`calculator.selectBirth`)}
              color="#4F98FE"
              onPress={showDatePicker}
            />
          </View>
        </View>

        <Text style={styles.weigthTitle}>{t(`calculator.weigthTitle`)}</Text>
        <View style={styles.weightPickerContainer}>
          <View style={styles.weightInputContainer}>
            <TextInput
              style={styles.weightInput}
              value={weight}
              onChangeText={setWeight}
              placeholder={t(`calculator.weigthTitle`)}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={weightUnit}
              style={styles.weightUnitPicker}
              onValueChange={(itemValue) => setWeightUnit(itemValue)}
            >
              <Picker.Item label={t(`kilos`)} value="kilos" />
              <Picker.Item label={t(`pounds`)} value="libras" />
            </Picker>
          </View>
        </View>

        <Text style={styles.selectActivityTitle}>
          {t(`calculator.selectActivity`)}
        </Text>
        <Picker
          selectedValue={activity}
          style={styles.picker}
          onValueChange={handleActivityChange}
        >
          <Picker.Item label={t(`calculator.low`)} value="baja" />
          <Picker.Item label={t(`calculator.medium`)} value="media" />
          <Picker.Item label={t(`calculator.high`)} value="alta" />
        </Picker>

        {selectedPet === "perro" && (
          <>
            <View style={styles.checkBoxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkBox,
                  isSterilized && styles.checkBoxSelected,
                ]}
                onPress={() => setIsSterilized(!isSterilized)}
              >
                {isSterilized && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkBoxContainerText}>
                {t(`calculator.sterilized`)}
              </Text>
            </View>

            <View style={styles.checkBoxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkBox,
                  isSportingDog && styles.checkBoxSelected,
                ]}
                onPress={() => setIsSportingDog(!isSportingDog)}
              >
                {isSportingDog && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkBoxContainerText}>
                {t(`calculator.sportDog`)}
              </Text>
            </View>

            <View style={styles.checkBoxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkBox,
                  isGreyhound && styles.checkBoxSelected,
                ]}
                onPress={() => setIsGreyhound(!isGreyhound)}
              >
                {isGreyhound && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkBoxContainerText}>
                {t(`calculator.isGreyhound`)}
              </Text>
            </View>
          </>
        )}

        {selectedPet === "gato" && (
          <>
            <View style={styles.checkBoxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkBox,
                  isSterilized && styles.checkBoxSelected,
                ]}
                onPress={() => setIsSterilized(!isSterilized)}
              >
                {isSterilized && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkBoxContainerText}>
                {t(`calculator.sterilized`)}
              </Text>
            </View>

            <View style={styles.checkBoxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkBox,
                  isSportingDog && styles.checkBoxSelected,
                ]}
                onPress={() => setIsSportingDog(!isSportingDog)}
              >
                {isSportingDog && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkBoxContainerText}>
                {t(`calculator.strayCat`)}
              </Text>
            </View>
          </>
        )}

        {selectedPet === "huron" && (
          <>
            <View style={styles.checkBoxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkBox,
                  isSterilized && styles.checkBoxSelected,
                ]}
                onPress={() => setIsSterilized(!isSterilized)}
              >
                {isSterilized && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkBoxContainerText}>
                {t(`calculator.sterilized`)}
              </Text>
            </View>
          </>
        )}

        {errorMessages.general && (
          <ErrorMessage message={errorMessages.general} />
        )}
        {errorMessages.date && <ErrorMessage message={errorMessages.date} />}
        {errorMessages.weight && (
          <ErrorMessage message={errorMessages.weight} />
        )}
        {errorMessages.user && <ErrorMessage message={errorMessages.user} />}

        <PaperButton
          onPress={() => handleGuardar()}
          mode="contained"
          style={styles.guardarButton}
        >
          {t(`calculator.save`)}
        </PaperButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create(styleCalculator);

export default Calculator;
