import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { calculateBARFDiet, getAge } from "../utils/getPercentage";
import updateData from "../utils/functions/piedData";
import { PieChart } from "react-native-gifted-charts";
import { windowWidth } from "../utils/Dimentions";

const PetDetails = ({ route }) => {
  const { selectedPet } = route.params;
  const [barfDiet, setBarfDiet] = useState({});
  const [pieData, setPieData] = useState([]);
  const [pieDataGraphic, setPieDataGraphic] = useState([]);
  const [meatPercentage, setMeatPercentage] = useState(0.02);
  const [age, setAge] = useState();
  const [months, setMonths] = useState();
  const { t } = useTranslation();
  const [value, setValue] = useState(meatPercentage);

  const navigation = useNavigation();
  const [counter, setCounter] = useState(1);
  const increment = () => {
    if (counter + 1 <= 15) {
      setCounter(counter + 1);
    }
  };
  const decrement = () => {
    if (counter - 1 > 1) {
      setCounter(counter - 1);
    }
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  if (!selectedPet) {
    return (
      <View>
        <Text>No pet selected.</Text>
      </View>
    );
  }

  useEffect(() => {
    async function fetchData() {
      setMeatPercentage(selectedPet.percentage);
      const agePet = await getAge(selectedPet.date);
      setAge(agePet.years);
      setMonths(agePet.remainingMonths);
      const infoBarf = await calculateBARFDiet(selectedPet);
      setBarfDiet(infoBarf);
      const pieDataInfo = await updateData(selectedPet);
      setPieData(pieDataInfo);
    }

    fetchData();
  }, [selectedPet]);

  const petImageMap = {
    perro: require("../assets/pets/dogDefault.png"),
    gato: require("../assets/pets/catDefault.png"),
    huron: require("../assets/pets/ferretDefault.png"),
  };

  const decodeBase64Image = (base64Data) => {
    return `data:image/jpeg;base64,${base64Data}`;
  };

  const handleEditPet = (petId) => {
    navigation.navigate("EditPet", {
      isEditing: true,
      editPetId: selectedPet.id,
    });
  };

  const getColorForKey = (key) => {
    return "#FF5733";
  };

  const COLORS = [
    "#ffca3a",
    "#ff595e",
    "#3498DB",
    "#9D71E8",
    "#8ac926",
    "#ff9914",
    "#abff4f",
    "#2980B9",
    "#F39C12",
    "#8E44AD",
    "#C0392B",
    "#16A085",
  ];

  return (
    <ScrollView
      style={styles.container}
      vertical
      showsHorizontalScrollIndicator={false}
    >
      <View>
        <View style={styles.petInfoContainer}>
          <View style={styles.imageContainer}>
            {!selectedPet.image ? (
              <Image
                style={styles.imagePet}
                source={petImageMap[selectedPet.typePet]}
              />
            ) : (
              <Image
                style={styles.imagePet}
                source={{ uri: decodeBase64Image(selectedPet.image) }}
              />
            )}
          </View>
          <View style={styles.petDetails}>
            <Text style={styles.petName}>{selectedPet.name}</Text>
            <Text style={styles.petWeight}>Peso: {selectedPet.weight} kg</Text>
            <Text style={styles.petWeight}>
              Anos: {age} | Meses: {months}
            </Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditPet(selectedPet.id)}
            >
              <Text style={styles.editButtonText}>Editar Mascota</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerlegend}>
          <View style={styles.headerContainer}>
            <Text style={styles.barfDietText}>
              <Text style={styles.barfDietTexttBlod}>Total Daily Diet: </Text>
              {barfDiet.grTotal}
              <Text>Editar porcentage</Text>
            </Text>
            <View style={styles.grTotalContainer}>
              <PieChart
                donut
                showText
                textColor="black"
                radius={60}
                innerRadius={25}
                textSize={20}
                data={pieData}
              />
            </View>
          </View>
          <View style={styles.tableContainer}>
            {Object.entries(barfDiet).map(([key, value], index) =>
              key === "grTotal" ? null : (
                <View key={key} style={styles.tableRow}>
                  <View
                    style={[
                      styles.colorPoint,
                      { backgroundColor: COLORS[index] },
                    ]}
                  />
                  <Text style={styles.tableItem}>{key}</Text>
                  <Text style={styles.tableItem}>{value}</Text>
                </View>
              )
            )}
          </View>
        </View>
        <View style={styles.containerDietDetails}>
          <Text style={styles.barfDietTitle}>Configuracion dieta:</Text>
          <Text>Porcentaje diaria de acuerdo a su peso</Text>
          <View
            style={{
              flex: 1,
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={value}
              minimumTrackTintColor="#1565C0"
              maximumTrackTintColor="#000000"
              onValueChange={handleValueChange}
            />
            <Text style={{ fontSize: 16 }}>{value}</Text>
          </View>
          <Text>{(meatPercentage * 100).toFixed(2)}</Text>
          <View>
            <Text>Porciones al dia</Text>
            <View style={styles.containerCounter}>
              <TouchableOpacity onPress={() => decrement()}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text>{counter <= 1 ? 1 : counter}</Text>
              <TouchableOpacity onPress={() => increment()}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    width: windowWidth,
    height: "100%",
    marginHorizontal: 15,
  },
  petInfoContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    width: "92%",
    padding: 10,
    marginTop: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageContainer: {
    marginRight: 16,
  },
  imagePet: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  barfDietTexttBlod: {
    fontWeight: "bold",
  },
  containerCounter: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  petMascota: {
    fontSize: 16,
  },
  petWeight: {
    fontSize: 16,
  },
  editButton: {
    marginTop: 8,
    paddingVertical: 6,
    backgroundColor: "#1565C0",
    borderRadius: 20,
    margin: 8,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  containerlegend: {
    width: "92%",
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginRight: 20,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 25,
  },
  containerDietDetails: {
    width: "92%",
    backgroundColor: "#ffffff",
    marginRight: 20,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 25,
  },
  barfDietTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  headerContainer: {},
  barfDietText: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  tableContainer: {
    width: "85%",
    backgroundColor: "#ffffff",
    padding: 15,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 52,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  tableItem: {
    flex: 1,
    width: "30%",
    justifyContent: "center",
    alignSelf: "center",
  },
  colorPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  grTotalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
