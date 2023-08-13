import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import moment from "moment";
import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import { AuthenticatedUserContext } from "../../../utils/context/context";
import { useNavigation } from "@react-navigation/native";

const Calendar = () => {
  const { user, db } = useContext(AuthenticatedUserContext);
  const [fecha, setFecha] = useState(moment());
  const [comidas, setComidas] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [inputComidaVisible, setInputComidaVisible] = useState(false);
  const [comidaInput, setComidaInput] = useState("");
  const [selectedDay, setSelectedDay] = useState(
    moment().startOf("week").format("YYYY-MM-DD")
  );
  const [pets, setPets] = useState([]);
  const menuScrollViewRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pets",
        null,
        (txObj, resultSet) => setPets(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    if (pets.length > 0) {
      setSelectedPet(pets[0]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const refreshed = navigation.addListener("focus", () => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM pets",
          null,
          (txObj, resultSet) => setPets(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
      });
    });
    if (pets.length > 0) {
      setSelectedPet(pets[0]);
    }
    return refreshed;
  }, [navigation]);

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
        navigation.navigate("AddFood", {
          selectedPet: selectedPet,
        });
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

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => cambiarSemana(-1)}>
          <Text style={styles.navigationText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{fecha.format("MMMM YYYY")}</Text>
        <TouchableOpacity onPress={() => cambiarSemana(1)}>
          <Text style={styles.navigationText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      {console.log("pets", selectedPet)}

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
            <Text style={styles.dayNumber}>{diasNumeros[index]}</Text>
            <Text style={styles.dayName}>{dia}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
                    selectedPet?.id === mascota.id ? "#3498DB" : "#FFF",
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
      {selectedPet ? (
        <View>
          <Text>{selectedPet.name}</Text>
          <Text>{selectedPet.percentage}</Text>
        </View>
      ) : null}
      <Text>Toma 1S</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={comidas[selectedDay] || ""}
          onChangeText={handleInputChange}
          placeholder="Ingresa tu comida"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddFood} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Añadir Alimentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: windowHeight,
    width: windowWidth,
    padding: 15,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  navigationText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  monthText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dayButton: {
    flex: 1,
    alignItems: "center",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dayName: {
    fontSize: 14,
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18, 
    padding: 8,
    color: "#333",
  },
  mascotasContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  mascotaButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#3498DB",
    borderWidth: 2,
    backgroundColor: "#FFF",
  },
  mascotaImageContainer: {
    marginBottom: 8,
  },
  mascotaName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  imagePet: {
    width: 50,
    height: 50,
  },
  mascotasScrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#3498DB",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Calendar;
