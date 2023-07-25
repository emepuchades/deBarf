import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Image,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import Calculator from "../Calculator/Calculator";
import { styleHome } from "./Home.style";
import { FAB } from "react-native-paper";

export default function Home1() {
  const [db, setDb] = useState(SQLite.openDatabase("debarf.db"));
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [isCalculator, setIsCalculator] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedMascota, setSelectedMascota] = useState("perro");
  const [selectedPet, setSelectedPet] = useState("perro");
  const [priority, setPriority] = useState("baja");
  const [isEsterilizado, setIsEsterilizado] = useState(false);
  const [isPerroDeporte, setIsPerroDeporte] = useState(false);
  const [isGalgo, setIsGalgo] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kilos");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `
      CREATE TABLE IF NOT EXISTS mascotas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER,
        mascota VARCHAR(512),
        nombre VARCHAR(512),
        fecha VARCHAR(100),
        prioridad INTEGER,
        esterilizado INTEGER,
        perroDeporte INTEGER,
        esGalgo INTEGER,
        imagen VARCHAR(512),
        weight FLOAT,
        weightUnit VARCHAR(10)
      )
    `
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM mascotas",
        null,
        (txObj, resultSet) => setPets(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, [db]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading pets...</Text>
      </View>
    );
  }

  const addName = (
    selectedMascota,
    searchText,
    date,
    priority,
    isEsterilizado,
    isPerroDeporte,
    isGalgo,
    selectedImage,
    weight,
    weightUnit
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO mascotas (mascota, nombre, fecha, prioridad, esterilizado, perroDeporte, esGalgo, imagen, weight, weightUnit)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          selectedMascota,
          searchText,
          date,
          priority,
          isEsterilizado ? 1 : 0,
          isPerroDeporte ? 1 : 0,
          isGalgo ? 1 : 0,
          selectedImage,
          parseFloat(weight),
          weightUnit,
        ],
        (txObj, resultSet) => {
          pets.push(resultSet);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <>
      {isCalculator ? (
        <Calculator
          addName={addName()}
          setIsCalculator={setIsCalculator()}
          selectedMascota={selectedMascota}
          setSelectedMascota={setSelectedMascota()}
          searchText={searchText}
          setSearchText={setSearchText()}
          date={date}
          setDate={setDate()}
          priority={priority}
          setPriority={setPriority()}
          isEsterilizado={isEsterilizado}
          setIsEsterilizado={setIsEsterilizado()}
          isPerroDeporte={isPerroDeporte}
          setIsPerroDeporte={setIsPerroDeporte()}
          isGalgo={isGalgo}
          setIsGalgo={setIsGalgo()}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage()}
          weight={weight}
          setWeight={setWeight()}
          weightUnit={weightUnit}
          setWeightUnit={setWeightUnit()}
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet()}
          datePicker={datePicker}
          setDatePicker={setDatePicker()}
        />
      ) : (
        <View style={styles.container}>
          {pets ? (
            <View style={styles.containerNewPet}>
              {pets.length === 0 ? (
                <View style={styles.containerNewPet}>
                  <Image
                    style={styles.tinyLogo}
                    source={require("../../../assets/pets/addNewPet.png")}
                  />
                  <Text>
                    <Text style={styles.addPetTitle}>
                      ¡Registra tu primera mascota ahora!{"\n"}
                    </Text>
                    <Text>
                      Usa el botón que se encuentra en la parte inferior para
                      comenzar.
                    </Text>
                  </Text>
                </View>
              ) : (
                pets.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.text}>
                      Nombre: {item.nombre}
                      {console.log("pets", item)}
                    </Text>
                    <Text style={styles.text}>Mascota: {item.mascota}</Text>
                  </View>
                ))
              )}
            </View>
          ) : (
            <View style={styles.containerNewPet}>
              <Image
                style={styles.tinyLogo}
                source={require("../../../assets/pets/addNewPet.png")}
              />
              <Text>
                <Text style={styles.addPetTitle}>
                  ¡Registra tu primera mascota ahora!{"\n"}
                </Text>
                <Text>
                  Usa el botón que se encuentra en la parte inferior para
                  comenzar.
                </Text>
              </Text>
            </View>
          )}
        </View>
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setIsCalculator(true)}
      />
    </>
  );
}

const styles = StyleSheet.create(styleHome);
