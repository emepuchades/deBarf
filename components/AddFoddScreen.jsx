import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import foodTypes from "../utils/info/food.js";
import { calculateBARFDiet } from "../utils/getPercentage.js";
import {  PieChart } from "react-native-gifted-charts";

const AddFoodScreen = ({ navigation, route }) => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]); 
  const [foodInfo, setFoodInfo] = useState(foodTypes());
  const [selectedPet, setSelectedPet] = useState(route.params.selectedPet);
  const [statsPet, setStatsPet] = useState(
    calculateBARFDiet(route.params.selectedPet)
  );
  const [pieData, setPieData] = useState([]);
  const { t } = useTranslation();

 const COLORS = [
   "#FF5733",
   "#27AE60",
   "#3498DB",
   "#FFC300",
   "#9B59B6",
   "#E74C3C",
   "#2ECC71",
   "#2980B9",
   "#F39C12",
   "#8E44AD",
   "#C0392B",
   "#16A085",
 ];

 const pieDataD = [
   { value: 70, color: "#177AD5" },
   { value: 30, color: "lightgray" },
 ];

useEffect(() => {
  const updateData = async () => {
    const newStatsPet = await calculateBARFDiet(route.params.selectedPet);
    setSelectedPet(route.params.selectedPet);
    setStatsPet(newStatsPet);

    const updatedPieData = Object.keys(newStatsPet).map((key, index) => ({
      key: index,
      amount: 0,
      svg: { fill: COLORS[index % COLORS.length] },
      label: key,
    }));
    setPieData(updatedPieData);
  };

  updateData();
}, [route.params.selectedPet]);

  const handleSaveFood = () => {
    const newFood = {
      name: foodName,
      calories: calories,
    };

    setSelectedFoods((prevSelectedFoods) => [...prevSelectedFoods, newFood]);
    setFoodName("");
    setCalories("");
  };

  const mapFoodTypeToLabel = (foodType) => {
    switch (foodType) {
      case "huesosCarnosos":
        return "bones";
      case "carne":
        return "meat";
      case "pescado":
        return "meat";
      case "higado":
        return "higado";
      case "masvisceras":
        return "viscerasHigado";
      case "frutasverduras":
        return "vegetables";
      case "grTotal":
        return "grTotal";
      default:
        return "";
    }
  };

  const handleFoodSelection = (selectedFood) => {
    console.log("dentroooooo");
    setSelectedFoods((prevSelectedFoods) => [
      ...prevSelectedFoods,
      selectedFood,
    ]);
    setFoodName(selectedFood.name);

    const foodType = Object.keys(foodInfo).find((type) =>
      foodInfo[type].some((food) => food.name === selectedFood.name)
    );

    if (foodType) {
      const chartLabel = mapFoodTypeToLabel(foodType);

      const updatedPieData = pieData.map((item) => {
        if (chartLabel === item.label) {
          return {
            ...item,
            amount: item.amount + 20, 
          };
        }
        return item;
      });

      setPieData(updatedPieData);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    const allFoods = Object.values(foodInfo).flat();
    const filtered = allFoods.filter((food) =>
      food.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFoods(filtered);
  };


  return (
    <ScrollView
      style={styles.container}
      vertical
      showsHorizontalScrollIndicator={false}
    >
      {statsPet ? (
        <View>
          <View style={styles.chartContainer}>
            <PieChart
              donut
              radius={25}
              innerRadius={20}
              data={pieDataD}
              centerLabelComponent={() => {
                return <Text style={{ fontSize: 18 }}>70%</Text>;
              }}
            />
          </View>
          <View style={styles.horizontalChartsContainer}>
            {pieData.slice(1).map((item, index) => (
              <View key={index} style={styles.horizontalChartContainer}>
                <PieChart
                  data={[item]}
                  donut
                  radius={25}
                  innerRadius={20}
                  style={styles.horizontalChart}
                  centerLabelComponent={() => {
                    return <Text style={{ fontSize: 18 }}>p </Text>;
                  }}
                />
                <Text style={styles.chartLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.label}>{selectedPet.name}</Text>

          <Text style={styles.label}>Buscar Alimento:</Text>
          <Text style={styles.label}></Text>
          <TextInput
            style={styles.input}
            value={searchTerm}
            onChangeText={handleSearch}
            placeholder="Buscar alimento..."
          />
          <TouchableOpacity onPress={handleSaveFood} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Guardar Alimento</Text>
          </TouchableOpacity>
          <ScrollView style={styles.selectedFoods}>
            {selectedFoods.map((food, index) => (
              <View key={food.name + index} style={styles.selectedFoodItem}>
                <Text>{food.name}</Text>
              </View>
            ))}
          </ScrollView>
          <ScrollView style={styles.fullList}>
            {Object.values(foodInfo)
              .flat()
              .map((food, index) => (
                <TouchableOpacity
                  key={index + index}
                  onPress={() => handleFoodSelection(food)}
                  style={styles.fullListItem}
                >
                  <View>
                    <Text>{food.name}</Text>
                    <Image source={food.img} style={styles.searchResultImage} />
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#3498DB",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
  selectedFoods: {
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  selectedFoodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingLeft: 10,
  },
  searchResultImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  fullList: {
    maxHeight: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  fullListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row", 
    justifyContent: "center",
    flexWrap: "wrap",
  },
  horizontalChartsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  horizontalChartContainer: {
    alignItems: "center",
    margin: 10,
  },
  horizontalChart: {
    height: 50,
    width: 50,
  },
});

export default AddFoodScreen;
