import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { styleHome } from "./Home.style";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AuthenticatedUserContext } from "../../../utils/context/context";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const { t } = useTranslation();
  const CalculatorURL = t("navBottom.newPet");
  const { db } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pets",
        null,
        (txObj, resultSet) => setPets(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

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
      setSelectedPet(null);
    });
    return refreshed;
  }, [navigation]);

  const decodeBase64Image = (base64Data) => {
    return `data:image/jpeg;base64,${base64Data}`;
  };

  const handleDeletePet = (index) => {
    const petToDelete = pets[index];

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM pets WHERE id = ?",
        [petToDelete.id],
        (txObj, resultSet) => {
          console.log("Pet deleted successfully");
          // Actualizar la lista de mascotas después de eliminar
          setPets((prevPets) => prevPets.filter((item, i) => i !== index));
        },
        (txObj, error) => console.log("Error al eliminar la mascota", error)
      );
    });
  };

  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading pets...</Text>
      </View>
    );
  }
  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    navigation.navigate("PetDetails", { selectedPet: pet });
  };

  const petImageMap = {
    perro: require("../../../assets/pets/dogDefault.png"),
    gato: require("../../../assets/pets/catDefault.png"),
    huron: require("../../../assets/pets/ferretDefault.png"),
  };

  return (
    <>
      <ScrollView vertical showsHorizontalScrollIndicator={false}>
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
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePetClick(item)}
                    style={styles.itemContainer}
                  >
                    <View style={styles.imageContainer}>
                      {!item.image ? (
                        <Image
                          style={styles.imagePet}
                          source={petImageMap[item.typePet]}
                        />
                      ) : (
                        <>
                          <Image
                            style={styles.imagePet}
                            source={{ uri: decodeBase64Image(item.image) }}
                          />
                        </>
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.nameText}>Nombre: {item.name}</Text>
                      <Text style={styles.petText}>
                        Mascota: {item.typePet}
                      </Text>
                    </View>
                    <View style={styles.deleteButtonContainer}>
                      <Button
                        title="Eliminar"
                        onPress={() => handleDeletePet(index)}
                      />
                    </View>
                  </TouchableOpacity>
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
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate(CalculatorURL)}
      />
    </>
  );
}

const styles = StyleSheet.create(styleHome);
