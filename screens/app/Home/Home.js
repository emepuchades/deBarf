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
import { Ionicons } from "@expo/vector-icons";
import DualButtonTab from "../../../components/DualButtonTab";
import BottomTabNavigator from "../../../components/BottomTabNavigator";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const { t } = useTranslation();
  const CalculatorURL = t("navBottom.newPet");
  const { db, setBottomTabSelected } = useContext(AuthenticatedUserContext);
  const [selectedTabKg, setSelectedTabKg] = useState(true);
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
      setBottomTabSelected(0);
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
        <Text>{t("home.loanding")}</Text>
      </View>
    );
  }
  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    navigation.navigate(t("drawer.petDetails"), { selectedPet: pet });
  };

  const updateKg = () => {
    setSelectedTabKg(!selectedTabKg);
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
                      {t("home.registerTitle")}
                    </Text>
                    <Text>{t("home.registerSubtitle")}</Text>
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
                      <Text style={styles.nameText}>{item.name}</Text>
                      <Text style={styles.petText}>{item.weight}Kg</Text>
                    </View>
                    <View style={styles.settingsButtonContainer}>
                      <TouchableOpacity onPress={() => handlePetClick(item)}>
                        <Ionicons
                          name="options-outline"
                          size={27}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.deleteButtonContainer}>
                      <TouchableOpacity onPress={() => handleDeletePet(index)}>
                        <Ionicons
                          name="trash-outline"
                          size={27}
                          color="black"
                        />
                      </TouchableOpacity>
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
                  {t("home.registerTitle")}
                  {"\n"}
                </Text>
                <Text>{t("home.registerSubtitle")}</Text>
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
      <BottomTabNavigator />
    </>
  );
}

const styles = StyleSheet.create(styleHome);
