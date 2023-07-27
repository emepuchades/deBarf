import React from "react";
import { View, Text } from "react-native";

const PetDetails = ({ route }) => {
  const { selectedPet } = route.params;

  if (!selectedPet) {
    return (
      <View>
        <Text>No pet selected.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Name: {selectedPet.nombre}</Text>
      <Text>Pet: {selectedPet.mascota}</Text>
    </View>
  );
};

export default PetDetails;
