import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PetDetails = ({ route }) => {
  const { selectedPet } = route.params;
  const [barfDiet, setBarfDiet] = useState({});
  const [meatPercentage, setMeatPercentage] = useState(0.02);
  const [age, setAge] = useState();
  const [months, setMonths] = useState();

  const navigation = useNavigation();

  if (!selectedPet) {
    return (
      <View>
        <Text>No pet selected.</Text>
      </View>
    );
  }

  useEffect(() => {
    async function calculateBARFDiet() {
      const weightInKg = selectedPet.weight;

      switch (selectedPet.typePet) {
        case "perro":
          const grMenuDiary = weightInKg * meatPercentage * 1000; // Convert weight to grams
          const meatAmount = grMenuDiary * 0.3; // 30% of grMenuDiary as meat
          const bonesAmount = grMenuDiary * 0.45; // 45% of grMenuDiary as bones
          const vegetablesAmount = grMenuDiary * 0.15; // 15% of grMenuDiary as vegetables
          const higadoAmount = grMenuDiary * 0.05; // 5% of grMenuDiary as liver
          const otrasViscerasAmount = grMenuDiary * 0.05; // 5% of grMenuDiary as other organs
          console.log("meatPercentage", meatPercentage);

          if (selectedPet.weightUnit === "libras") {
            return {
              grTotal: (grMenuDiary * 0.00220462).toFixed(2) + " lbs",
              meat: (meatAmount * 0.00220462).toFixed(2) + " lbs",
              bones: (bonesAmount * 0.00220462).toFixed(2) + " lbs",
              vegetables: (vegetablesAmount * 0.00220462).toFixed(2) + " lbs",
              higado: (higadoAmount * 0.00220462).toFixed(2) + " lbs",
              otrasVisceras:
                (otrasViscerasAmount * 0.00220462).toFixed(2) + " lbs",
            };
          }

          // Si la unidad original es kilos, simplemente muestra los resultados en kilos
          return {
            grTotal: grMenuDiary.toFixed(0) + " g",
            meat: meatAmount.toFixed(0) + " g",
            bones: bonesAmount.toFixed(0) + " g",
            vegetables: vegetablesAmount.toFixed(0) + " g",
            higado: higadoAmount.toFixed(0) + " g",
            otrasVisceras: otrasViscerasAmount.toFixed(0) + " g",
          };

        case "gato":
          return {
            meat: "N/A",
            bones: "N/A",
            vegetables: "N/A",
            higado: "N/A",
            otrasVisceras: "N/A",
          };
          break;
        case "huron":
          return {
            meat: "N/A",
            bones: "N/A",
            vegetables: "N/A",
            higado: "N/A",
            otrasVisceras: "N/A",
          };
          break;
        default:
          return {
            meat: "N/A",
            bones: "N/A",
            vegetables: "N/A",
            higado: "N/A",
            otrasVisceras: "N/A",
          };
      }
    }

    async function getAge() {
      console.log("get age selected pet", selectedPet);

      const providedDate = selectedPet.date;

      const dateObject = new Date(providedDate);
      const currentDate = new Date();

      const timeDifferenceInMilliseconds = currentDate - dateObject;
      const millisecondsInAYear = 365.25 * 24 * 60 * 60 * 1000;

      const timeDifferenceInYears =
        timeDifferenceInMilliseconds / millisecondsInAYear;
      const years = Math.floor(timeDifferenceInYears);
      const remainingMonths = Math.floor((timeDifferenceInYears - years) * 12);

      setAge(years);
      setMonths(remainingMonths);
    }

    async function fetchData() {
      setMeatPercentage(selectedPet.percentage);
      await getAge();
      const infoBarf = await calculateBARFDiet();
      setBarfDiet(infoBarf);
    }

    fetchData();
  }, [selectedPet]);

  const petImageMap = {
    perro: require("../assets/pets/dogDefault.png"),
    gato: require("../assets/pets/catDefault.png"),
    huron: require("..//assets/pets/ferretDefault.png"),
  };

  const decodeBase64Image = (base64Data) => {
    return `data:image/jpeg;base64,${base64Data}`;
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

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar Mascota</Text>
          </TouchableOpacity>
        </View>
      </View>
      {console.log("barfDiet", barfDiet)}
      <Text style={styles.barfDietTitle}>BARF Diet:</Text>
      <Text style={styles.barfDietText}>
        Total Daily Diet: {barfDiet.grTotal}
      </Text>
      <Text style={styles.barfDietText}>Meat: {barfDiet.meat}</Text>
      <Text style={styles.barfDietText}>Bones: {barfDiet.bones}</Text>
      <Text style={styles.barfDietText}>Vegetables: {barfDiet.vegetables}</Text>
      <Text style={styles.barfDietText}>Liver: {barfDiet.higado}</Text>
      <Text style={styles.barfDietText}>
        Other Organs: {barfDiet.otrasVisceras}
      </Text>

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
  barfDietText: {
    fontSize: 16,
    marginTop: 8,
  },
});
