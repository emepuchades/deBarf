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
import { styleHome } from "./Home.style";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function Home1() {
  const [db, setDb] = useState(SQLite.openDatabase("debarf.db"));
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const { t } = useTranslation();
  const CalculatorURL = t("navBottom.newPet");

  useEffect(() => {
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

  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading pets...</Text>
      </View>
    );
    A;
  }

  return (
    <>
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
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate(CalculatorURL)}
      />
    </>
  );
}

const styles = StyleSheet.create(styleHome);
