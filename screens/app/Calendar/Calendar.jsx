import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useTransition,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import moment from "moment";
import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import { AuthenticatedUserContext } from "../../../utils/context/context";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { checkIfMenuDataExists, getMenuData } from "../../../utils/dbMenu";
import { LinearGradient } from "expo-linear-gradient";
import foodTypes from "../../../utils/info/food.js";
import backgroundImage from "../../../assets/images/header.png";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const { user, db } = useContext(AuthenticatedUserContext);
  const { t } = useTranslation();
  const [fecha, setFecha] = useState(moment());
  const [comidas, setComidas] = useState({});
  const [foodInfo, setFoodInfo] = useState(foodTypes());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [inputComidaVisible, setInputComidaVisible] = useState(false);
  const [comidaInput, setComidaInput] = useState("");
  const [idMenu, setIdMenu] = useState("");
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [pets, setPets] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const menuScrollViewRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pets",
        null,
        (txObj, resultSet) => {
          setPets(resultSet.rows._array);

          if (resultSet.rows.length > 0) {
            setSelectedPet(resultSet.rows._array[0]);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
    const fetchFoodData = async () => {
      if (selectedPet && selectedDay) {
        const foodString = await getMenuData(db, selectedPet.id, selectedDay);

        if (foodString) {
          setIdMenu(foodString.id);
          const parsedFood = JSON.parse(foodString.food);
          setFoodData(parsedFood);

          if (!parsedFood) {
            setFoodData([]);
          }
        } else {
          setIdMenu(null);
          setFoodData([]);
        }
      }
    };

    fetchFoodData();

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const refreshed = navigation.addListener("focus", () => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM pets",
          null,
          (txObj, resultSet) => {
            setPets(resultSet.rows._array);

            if (resultSet.rows.length > 0) {
              setSelectedPet(resultSet.rows._array[0]);
            }
          },
          (txObj, error) => console.log(error)
        );
      });
      const fetchFoodData = async () => {
        if (selectedPet && selectedDay) {
          const foodString = await getMenuData(db, selectedPet.id, selectedDay);

          if (foodString) {
            setIdMenu(foodString.id);
            const parsedFood = JSON.parse(foodString.food);
            setFoodData(parsedFood);

            if (!parsedFood) {
              setFoodData([]);
            }
          } else {
            setIdMenu(null);
            setFoodData([]);
          }
        }
      };

      fetchFoodData();
    });
    return refreshed;
  }, [navigation]);

  useEffect(() => {
    const fetchFoodData = async () => {
      if (selectedPet && selectedDay) {
        const foodString = await getMenuData(db, selectedPet.id, selectedDay);

        if (foodString) {
          setIdMenu(foodString.id);
          const parsedFood = JSON.parse(foodString.food);
          setFoodData(parsedFood);

          if (!parsedFood) {
            setFoodData([]);
          }
        } else {
          setIdMenu(null);
          setFoodData([]);
        }
      }
    };

    fetchFoodData();
  }, [selectedPet, selectedDay]);

  const handleGuardarComida = () => {
    if (comidaInput.trim() !== "") {
      const nuevasComidas = {
        ...comidas,
        [selectedDay]: {
          ...(comidas[selectedDay] || {}),
          [selectedPet.id]: comidaInput,
        },
      };
      setComidas(nuevasComidas);
      setComidaInput("");
    }
  };

  const cambiarSemana = (incremento) => {
    setFecha(fecha.clone().add(incremento, "week"));
    setSelectedDay(
      fecha.clone().add(incremento, "week").startOf("week").format("YYYY-MM-DD")
    );
  };

  const handleDayPress = (fechaDia) => {
    setSelectedDay(fechaDia);
  };

  const handleInputChange = (valor) => {
    const nuevasComidas = { ...comidas, [selectedDay]: valor };
    setComidas(nuevasComidas);
  };

  const diasSemana = moment.weekdaysShort();
  const diasNumeros = Array.from({ length: 7 }, (_, index) =>
    fecha.clone().startOf("week").add(index, "day").format("D")
  );

  const handleMascotaPress = (mascota) => {
    setSelectedPet(mascota);
    setInputComidaVisible(true);

    if (menuScrollViewRef.current) {
      const selectedIndex = pets.findIndex((pet) => pet.id === mascota.id);
      menuScrollViewRef.current.scrollTo({
        x: selectedIndex * (windowWidth * 0.3),
        y: 0,
        animated: true,
      });
    }
  };

  const handleAddFood = () => {
    if (!selectedPet) {
      setModalVisible(true);
      return;
    }
    navigation.navigate("AddFood", {
      selectedPet: selectedPet,
      fecha: selectedDay,
    });
  };

  const editMenu = () => {
    navigation.navigate("EditFood", {
      selectedPet: selectedPet,
      fecha: selectedDay,
      foodData: foodData,
      idMenu: idMenu,
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const petImageMap = {
    perro: require("../../../assets/pets/dogDefault.png"),
    gato: require("../../../assets/pets/catDefault.png"),
    huron: require("../../../assets/pets/ferretDefault.png"),
  };

  const handleMascotaComidaChange = (valor) => {
    const nuevasComidas = {
      ...comidas,
      [selectedDay]: {
        ...comidas[selectedDay],
        [selectedMascota.id]: valor,
      },
    };
    setComidas(nuevasComidas);
  };

  const decodeBase64Image = (base64Data) => {
    return `data:image/jpeg;base64,${base64Data}`;
  };

  const dayFecha = (fechaStr) => {
    const date = new Date(fechaStr);
    const dia = date.getUTCDate();
    return dia;
  };

  const mapFoodTypeToLabel = (foodType) => {
    switch (foodType) {
      case "huesosCarnosos":
        return "bones";
      case "carne":
        return "meat";
      case "pescado":
        return "meat";
      case "higado":
        return "higado";
      case "masvisceras":
        return "visceras";
      case "frutasverduras":
        return "vegetables";
      case "grTotal":
        return "grTotal";
      default:
        return "";
    }
  };

  return (
    <ScrollView
      style={styles.container}
      vertical
      showsHorizontalScrollIndicator={false}
    >
      <ImageBackground
        source={backgroundImage}
        style={styles.navigationWrapper}
      >
        <View style={styles.navigation}>
          <TouchableOpacity onPress={() => cambiarSemana(-1)}>
            <Text style={styles.navigationText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>{fecha.format("MMMM YYYY")}</Text>
          <TouchableOpacity onPress={() => cambiarSemana(1)}>
            <Text style={styles.navigationText}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.daysContainer}>
          {diasSemana.map((dia, index) => (
            <TouchableOpacity
              key={dia}
              onPress={() =>
                handleDayPress(
                  fecha
                    .clone()
                    .startOf("week")
                    .add(index, "day")
                    .format("YYYY-MM-DD")
                )
              }
              style={styles.dayButton}
            >
              {parseFloat(diasNumeros[index]) ===
              parseFloat(dayFecha(selectedDay)) ? (
                <>
                  <View style={styles.selectedDay}>
                    <Text style={styles.dayNumber}>{diasNumeros[index]}</Text>
                    <Text style={styles.dayName}>{dia}</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.nonSelectedDay}>
                    <Text style={styles.dayNumberNoSelected}>
                      {diasNumeros[index]}
                    </Text>
                    <Text style={styles.dayNameNoSelected}>{dia}</Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
      <View style={styles.mascotasContainer}>
        <ScrollView
          horizontal
          ref={menuScrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mascotasScrollContainer}
        >
          {pets.map((mascota) => (
            <TouchableOpacity
              key={mascota.id}
              onPress={() => handleMascotaPress(mascota)}
              style={[
                styles.mascotaButton,
                {
                  backgroundColor:
                    selectedPet?.id === mascota.id ? "#5b8afd" : "white",
                  borderColor:
                    selectedPet?.id === mascota.id ? "white" : "#ddd",
                },
              ]}
            >
              <View style={styles.mascotaImageContainer}>
                {!mascota.image ? (
                  <Image
                    style={styles.imagePet}
                    source={petImageMap[mascota.typePet]}
                  />
                ) : (
                  <Image
                    style={styles.imagePet}
                    source={{ uri: decodeBase64Image(mascota.image) }}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.mascotaName,
                  {
                    color: selectedPet?.id === mascota.id ? "#FFF" : "#333",
                  },
                ]}
              >
                {mascota.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        {selectedPet && foodData && foodData.length > 0 ? (
          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              onPress={() => editMenu()}
              style={styles.addButton}
            >
              <Text style={styles.addButtonLabel}>
                {t(`calendar.editFood`)}
              </Text>
            </TouchableOpacity>
          </View>
        ) : selectedPet ? (
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={handleAddFood} style={styles.addButton}>
              <Text style={styles.addButtonLabel}>
                {t(`calendar.mealRation`)}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={handleAddFood} style={styles.addButton}>
              <Text style={styles.addButtonLabel}>
                {t(`calendar.mealRation`)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.containerFood}>
        <View style={styles.headerFood}>
          <Text style={styles.headerTextFood}>{t(`calendar.feed`)} 1</Text>
        </View>
        <View style={styles.contentFood}>
          {foodData ? (
            foodData.length > 0 ? (
              <View style={styles.foodDataContainer}>
                {Array.isArray(foodData) &&
                  foodData.map((item, index) => {
                    // Buscar la categoría en foodTypes
                    const category = foodInfo[item.category];
                    const foodType = category.find(
                      (type) => type.name === item.name
                    );

                    return (
                      <View key={index} style={styles.foodItemContainer}>
                        {foodType && (
                          <Image
                            source={foodType.img}
                            style={styles.foodImage}
                          />
                        )}
                        <View style={styles.foodInfo}>
                          <Text style={styles.textFood}>{item.name}</Text>
                          <Text style={styles.textCategory}>
                            {mapFoodTypeToLabel(item.category)}
                          </Text>
                        </View>
                        <View style={styles.containerGrams}>
                          <Text style={styles.textGrams}>
                            {item.editGrams} {t(`gr`)}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </View>
            ) : (
              <View style={styles.noFoodCOntainer}>
                <Text>{t(`calendar.noFoodError`)}</Text>
              </View>
            )
          ) : null}
        </View>
      </View>
      <View style={styles.foodDataContainer}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{t(`calendar.noPeterror`)}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>
                {t(`calendar.close`)}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    padding: 0,
  },
  container: {
    backgroundColor: "white",
    height: windowHeight,
    width: windowWidth,
  },
  navigationWrapper: {
    padding: 15,
    height: 140,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navigationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  monthText: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "white",
  },
  daysContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  dayButton: {
    flex: 1,
    alignItems: "center",
    color: "white",
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  dayName: {
    fontSize: 14,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
  },
  addButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 15,
  },
  addButton: {
    backgroundColor: "#92AEF1",
    padding: 10,
    borderRadius: 8,
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
  selectedDay: {
    fontSize: 14,
    marginRight: 10,
    color: "white",
  },
  dayNumberNoSelected: {
    fontSize: 14,
    marginRight: 10,
    color: "white",
  },
  dayNameNoSelected: {
    fontSize: 14,
    color: "white",
    textAlign: "left",
  },

  mascotasContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  mascotaButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#FFF",
  },
  mascotaImageContainer: {},
  mascotaName: {
    fontSize: 12,
  },
  imagePet: {
    width: 40,
    height: 40,
  },
  mascotasScrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#9D71E8",
    padding: 10,
    width: 150,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
  selectedDay: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  nonSelectedDay: {
    padding: 10,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  dayName: {
    fontSize: 14,
  },
  addButtonLabel: {
    color: "white",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
  },
  foodDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  foodItemContainer: {
    width: windowWidth - 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", 
    padding: 10,
    marginBottom: 10,
    borderBottomColor: "#ccc",
  },
  foodInfo: {
    marginLeft: 10,
  },
  textCategory: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 13,
    color: "#ccc",
  },
  textFood: {
    fontSize: 14,
    marginBottom: 5,
  },
  containerGrams: {
    flex: 1,
  },
  textGrams: {
    flex: 1,
    textAlign: "right",
  },
  foodImage: {
    width: 30,
    height: 30,
  },
  noFoodContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerFood: {
    flex: 1,
    padding: 16,
  },
  headerFood: {
    backgroundColor: "#9D71E8",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 8,
  },
  headerTextFood: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  contentFood: {
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8, 
    borderBottomRightRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default Calendar;
