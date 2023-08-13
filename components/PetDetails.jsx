import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { calculateBARFDiet, getAge } from "../utils/getPercentage";

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
    async function fetchData() {
      setMeatPercentage(selectedPet.percentage);
      const agePet = await getAge(selectedPet.date);
      setAge(agePet.years)
      setMonths(agePet.remainingMonths);
      const infoBarf = await calculateBARFDiet(selectedPet);
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
