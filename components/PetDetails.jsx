import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { calculateBARFDiet, getAge } from "../utils/getPercentage";
import updateData from "../utils/functions/piedData";
import { PieChart } from "react-native-gifted-charts";

const PetDetails = ({ route }) => {
  const { selectedPet } = route.params;
  const [barfDiet, setBarfDiet] = useState({});
  const [pieData, setPieData] = useState([]);
  const [pieDataGraphic, setPieDataGraphic] = useState([]);
  const [meatPercentage, setMeatPercentage] = useState(0.02);
  const [age, setAge] = useState();
  const [months, setMonths] = useState();
  const { t } = useTranslation();

  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
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
          <Text style={styles.petName}>Name: {selectedPet.name}</Text>
          <Text style={styles.petMascota}>Pet: {selectedPet.typePet}</Text>
          <Text style={styles.petWeight}>Peso: {selectedPet.weight}</Text>
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
            Total Daily Diet: {barfDiet.grTotal}
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
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Elemento</Text>
            <Text style={styles.tableHeader}>Texto</Text>
          </View>
          {Object.entries(barfDiet).map(([key, value]) =>
            key === "grTotal" ? null : (
              <View key={key} style={styles.tableRow}>
                <View
                  style={[
                    styles.colorPoint,
                    { backgroundColor: getColorForKey(key) },
                  ]}
                />
                <Text style={styles.tableItem}>{key}</Text>
                <Text style={styles.tableItem}>{value}</Text>
              </View>
            )
          )}
        </View>
      </View>
      <View>
        <Text style={styles.barfDietTitle}>Configuracion dieta:</Text>
        <Text>Porcentaje diaria de acuerdo a su peso</Text>
        <Text>{(meatPercentage * 100).toFixed(2)}</Text>
      </View>
      <View>
        <Text>Porciones al dia</Text>
        <Text>1</Text>
      </View>
      <View>
        <Text>Huevo</Text>
        <Text>1/ semana *abria que calcularlo</Text>
      </View>
      <View>
        <Text>Incluir pescado </Text>
        <Text>1 / semana *abria que calcularlo</Text>
      </View>
      <View>
        <Text>Suplementos: </Text>
        <Text>Omega 3</Text>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  petInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  petMascota: {
    fontSize: 16,
  },
  petWeight: {
    fontSize: 16,
  },
  editButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#1565C0",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  barfDietTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  headerContainer: {
  },
  barfDietText: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  tableContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
  },
  tableItem: {
    flex: 1,
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
