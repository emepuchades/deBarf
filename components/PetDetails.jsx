import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const PetDetails = ({ route }) => {
  const { selectedPet } = route.params;
  const [barfDiet, setBarfDiet] = useState({});
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
    async function calculateBARFDiet() {
      const weightInKg = selectedPet.weight;
      console.log("selectedPet weightInKg", selectedPet);

      switch (selectedPet.typePet) {
        case "perro":
          let meatPercentage = selectedPet.percentage;
          const grMenuDiary = weightInKg * meatPercentage * 1000; // Convert weight to grams
          const meatAmount = grMenuDiary * 0.3; // 30% of grMenuDiary as meat
          const bonesAmount = grMenuDiary * 0.45; // 45% of grMenuDiary as bones
          const vegetablesAmount = grMenuDiary * 0.15; // 15% of grMenuDiary as vegetables
          const higadoAmount = grMenuDiary * 0.05; // 5% of grMenuDiary as liver
          const otrasViscerasAmount = grMenuDiary * 0.05; // 5% of grMenuDiary as other organs

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

          return {
            grTotal: grMenuDiary.toFixed(0) + " g",
            meat: meatAmount.toFixed(0) + " g",
            bones: bonesAmount.toFixed(0) + " g",
            vegetables: vegetablesAmount.toFixed(0) + " g",
            higado: higadoAmount.toFixed(0) + " g",
            otrasVisceras: otrasViscerasAmount.toFixed(0) + " g",
          };

        case "gato":
          let meatPercentagCat = selectedPet.percentage;

          const grMenuDiaryCat = weightInKg * meatPercentagCat * 1000; // Convert weight to grams
          const meatAmountCat = grMenuDiaryCat * 0.3; // 30% of grMenuDiary as meat
          const bonesAmountCat = grMenuDiaryCat * 0.45; // 45% of grMenuDiary as bones
          const vegetablesAmountCat = grMenuDiaryCat * 0.15; // 15% of grMenuDiary as vegetables
          const higadoAmountCat = grMenuDiaryCat * 0.05; // 5% of grMenuDiary as liver
          const otrasViscerasAmountCat = grMenuDiaryCat * 0.05; // 5% of grMenuDiary as other organs

          if (selectedPet.weightUnit === "libras") {
            return {
              grTotal: (grMenuDiaryCat * 0.00220462).toFixed(2) + " lbs",
              meat: (meatAmountCat * 0.00220462).toFixed(2) + " lbs",
              bones: (bonesAmountCat * 0.00220462).toFixed(2) + " lbs",
              vegetables:
                (vegetablesAmountCat * 0.00220462).toFixed(2) + " lbs",
              higado: (higadoAmountCat * 0.00220462).toFixed(2) + " lbs",
              otrasVisceras:
                (otrasViscerasAmountCat * 0.00220462).toFixed(2) + " lbs",
            };
          }

          return {
            grTotal: grMenuDiaryCat.toFixed(0) + " g",
            meat: meatAmountCat.toFixed(0) + " g",
            bones: bonesAmountCat.toFixed(0) + " g",
            vegetables: vegetablesAmountCat.toFixed(0) + " g",
            higado: higadoAmountCat.toFixed(0) + " g",
            otrasVisceras: otrasViscerasAmountCat.toFixed(0) + " g",
          };
          break;
        case "huron":
              let meatPercentagFerret = selectedPet.percentage;

              const grMenuDiaryFerret = weightInKg * meatPercentagFerret * 100; // Porcentaje sugerido para hurones (80%)
              const meatAmountFerret = grMenuDiaryFerret * 0.8; // 80% de grMenuDiaryFerret como carne
              const bonesAmountFerret = grMenuDiaryFerret * 0.1; // 10% de grMenuDiaryFerret como huesos
              const organsAmountFerret = grMenuDiaryFerret * 0.1; // 10% de grMenuDiaryFerret como órganos

              if (selectedPet.weightUnit === "libras") {
                return {
                  grTotal: (grMenuDiaryFerret * 0.00220462).toFixed(2) + " lbs",
                  meat: (meatAmountFerret * 0.00220462).toFixed(2) + " lbs",
                  bones: (bonesAmountFerret * 0.00220462).toFixed(2) + " lbs",
                  viscerasHigado:
                    (organsAmountFerret * 0.00220462).toFixed(2) + " lbs",
                };
              }

              return {
                grTotal: grMenuDiaryFerret.toFixed(0) + " g",
                meat: meatAmountFerret.toFixed(0) + " g",
                bones: bonesAmountFerret.toFixed(0) + " g",
                viscerasHigado: organsAmountFerret.toFixed(0) + " g",
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
      <Text style={styles.barfDietTitle}>BARF Diet:</Text>
      <Text style={styles.barfDietText}>
        Total Daily Diet: {barfDiet.grTotal}
      </Text>

      {barfDiet.meat ? (
        <Text style={styles.barfDietText}>Meat: {barfDiet.meat}</Text>
      ) : null}
      {barfDiet.bones ? (
        <Text style={styles.barfDietText}>Bones: {barfDiet.bones}</Text>
      ) : null}
      {barfDiet.vegetables ? (
        <Text style={styles.barfDietText}>
          Vegetables: {barfDiet.vegetables}
        </Text>
      ) : null}
      {barfDiet.higado ? (
        <Text style={styles.barfDietText}>Liver: {barfDiet.higado}</Text>
      ) : null}
      {barfDiet.otrasVisceras ? (
        <Text style={styles.barfDietText}>
          Other Organs: {barfDiet.otrasVisceras}
        </Text>
      ) : null}

      {barfDiet.viscerasHigado ? (
        <Text style={styles.barfDietText}>
          Visceras y higado: {barfDiet.viscerasHigado}
        </Text>
      ) : null}

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
