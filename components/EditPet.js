import React, { useState, useContext, useEffect } from "react";
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
import { styleCalculator } from "../screens/app/Calculator/Calculator.style";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Button as PaperButton } from "react-native-paper";
import { AuthenticatedUserContext } from "../utils/context/context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getPetById, updatePet } from "../utils/dbPetsInfo";

function EditPet({ route }) {
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
    const [petID, setPetID] = useState();
    const [existingUri, setExistingUri] = useState("");

    const HomeURL = t("navBottom.pets");


    const { editPetId } = route.params;

    const decodeBase64Image = (base64Data) => {
        if (base64Data){
          return `data:image/jpeg;base64,${base64Data}`;  
        } else {
            return null
        }
    };

    useEffect(() => {
        async function getPet() {
            if (editPetId) {
                const petData = await getPetById(db, editPetId);
                setSearchText(petData.name);
                setPetID(petData.id);
                setDate(petData.date);
                setSelectedPet(petData.petType);
                setActivity(petData.activity);
                setIsSterilized(petData.isSterilized);
                setIsSportingDog(petData.isSportingDog);
                setIsGreyhound(petData.isGreyhound);
                setWeight(petData.weight.toFixed(0));
                setWeightUnit(petData.weightUnit);
                setSelectedImage(decodeBase64Image(petData.image));
                setExistingUri(petData.image);
            }
        }

        getPet();
    }, [editPetId]);

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
            petImageSource = require("../assets/pets/dogDefault.png");
            break;
        case "gato":
            petImageSource = require("../assets/pets/catDefault.png");
            break;
        case "huron":
            petImageSource = require("../assets/pets/ferretDefault.png");
            break;
        default:
            petImageSource = require("../assets/pets/dogDefault.png");
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
            if (
                !selectedPet ||
                !searchText ||
                !date ||
                weight === null ||
                activity === null
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
            const formattedDate = date.toISOString();

            await updatePet(
                db,
                petID,
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
            );

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
                <Text style={styles.titleEligeType}>Elige el tipo de mascota</Text>
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
                            source={require("../assets/pets/dogDefault.png")}
                        />
                        <Text
                            style={[
                                styles.buttonText,
                                selectedPet === "perro" && styles.buttonTextPressed,
                            ]}
                        >
                            Perro
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
                            source={require("../assets/pets/catDefault.png")}
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
                            source={require("../assets/pets/ferretDefault.png")}
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
                        {selectedImage ? (
                            <Image
                                source={{ uri: selectedImage }}
                                style={styles.petImage}
                            />
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
                            <Ionicons name="camera" size={24} color="#fff" />
                            <Text color="#fff">Anade una foto</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.petNameTitle}>
                            {" "}
                            Nombre de tu {selectedPet}
                        </Text>
                        <TextInput
                            value={searchText}
                            style={styles.namePet}
                            onChangeText={handleSearchTextChange}
                            placeholder={`Nombre de tu ${selectedPet}`}
                        />
                    </View>
                </View>

                <View style={styles.containerDate}>
                    <Text>Fecha nacimiento: {date.toDateString()}</Text>
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
                    selectedValue={activity}
                    style={styles.picker}
                    onValueChange={handleActivityChange}
                >
                    <Picker.Item label="Baja" value="baja" />
                    <Picker.Item label="Media" value="media" />
                    <Picker.Item label="Alta" value="alta" />
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
                            <Text>Esterilizado</Text>
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
                            <Text>Perro de deporte</Text>
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
                            <Text>Es galgo</Text>
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
                            <Text>Esterilizado</Text>
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
                            <Text>Gato callejero</Text>
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
                            <Text>Esterilizado</Text>
                        </View>
                    </>
                )}

                <PaperButton
                    onPress={() => handleGuardar()}
                    mode="contained"
                    style={styles.guardarButton}
                >
                    Editar
                </PaperButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create(styleCalculator);

export default EditPet;
