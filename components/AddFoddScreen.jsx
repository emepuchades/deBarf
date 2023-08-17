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
import { PieChart } from "react-native-gifted-charts";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const AddFoodScreen = ({ navigation, route }) => {
  const [foodName, setFoodName] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodInfo, setFoodInfo] = useState(foodTypes());
  const [selectedPet, setSelectedPet] = useState(route.params.selectedPet);
  const [statsPet, setStatsPet] = useState(
    calculateBARFDiet(route.params.selectedPet)
  );
  const [selectedTab, setSelectedTab] = useState("ourFood");
  const [activeTab, setActiveTab] = useState("huesosCarnosos"); // Establece la categoría predeterminada
  const [pieData, setPieData] = useState([]);
  const [pieDataGraphic, setPieDataGraphic] = useState([]);
  const { t } = useTranslation();
  const [yourCategory, setYourCategory] = useState();
  const [yourGrFood, setYourGrFood] = useState("");

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
      setSelectedFoods([]);
    };

    updateData();
  }, [route.params.selectedPet]);

  const handleEditFood = (index, isEditing) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedFoods = [...prevSelectedFoods];
      updatedFoods[index].isEditing = isEditing;

      if (!isEditing) {
        // Actualizar el amount en la gráfica correspondiente cuando se guarda la edición
        const chartLabel = mapFoodTypeToLabel(updatedFoods[index]);
        if (chartLabel) {
          const editGramsAsNumber = parseFloat(updatedFoods[index].editGrams);

          if (!isNaN(editGramsAsNumber)) {
            const updatedPieData = pieData.map((item) => {
              if (chartLabel === item.label) {
                return {
                  ...item,
                  amount: editGramsAsNumber,
                };
              }
              return item;
            });
            setPieData(updatedPieData);
          }
        }
      }

      return updatedFoods;
    });
  };

  const handleEditGramsChange = (text, index) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedFoods = [...prevSelectedFoods];
      updatedFoods[index].editGrams = text;

      const chartLabel = mapFoodTypeToLabel(updatedFoods[index].category);

      if (chartLabel) {
        const categoryFoods = updatedFoods.filter(
          (food) => food.category === updatedFoods[index].category
        );
        const totalCategoryGrams = categoryFoods.reduce(
          (total, food) => total + parseFloat(food.editGrams),
          0
        );

        const updatedPieData = pieData.map((item) => {
          if (chartLabel === item.label) {
            return {
              ...item,
              amount: totalCategoryGrams,
            };
          }
          return item;
        });
        setPieData(updatedPieData);
      }

      return updatedFoods;
    });
  };

  const handleSaveFood = () => {};

  const handleTabChange = (categoryName) => {
    setActiveTab(categoryName);
    setSelectedTab("ourFood");
  };

  const handleSwitchToAddFood = () => {
    setSelectedTab("addFood");
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



  const handleFoodSelection = (selectedFood, category) => {
    const selectedFoodNew = {
      ...selectedFood,
      category: category,
    };

    setSelectedFoods((prevSelectedFoods) => [
      ...prevSelectedFoods,
      selectedFoodNew,
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
            amount: item.amount,
          };
        }
        return item;
      });

      setPieData(updatedPieData);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      vertical
      showsHorizontalScrollIndicator={false}
    >
      {statsPet ? (
        <View>
          <View style={styles.contentContainer}>
            <View style={styles.chartContainer}>
              <View style={styles.grTotalContainer}>
                <PieChart
                  donut
                  radius={40}
                  innerRadius={30}
                  data={[
                    {
                      value: statsPet.grTotal,
                      color: COLORS[0],
                    },
                  ]}
                  centerLabelComponent={() => {
                    return (
                      <Text style={{ fontSize: 18 }}>{statsPet.grTotal}</Text>
                    );
                  }}
                />
              </View>
            </View>
            <View style={styles.horizontalChartsContainer}>
              <View style={styles.legendItem}>
                <View style={styles.legendSquare} />
                <Text style={styles.legendLabelHeader}>Item</Text>
                <Text style={styles.legendTextHeader}>Total</Text>
                <Text style={styles.legendTextHeader}>Objetivo</Text>
              </View>
              {pieData.slice(1).map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendSquare,
                      { backgroundColor: COLORS[index % COLORS.length] },
                    ]}
                  />
                  <Text style={styles.legendLabel}>{item.label}</Text>
                  <Text style={styles.legendText}>{item.amount} g</Text>
                  <Text style={styles.legendText}>
                    {statsPet[item.label]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.label}>{selectedPet.name}</Text>

          {selectedFoods.map((food, index) => (
            <View key={food.name + index} style={styles.selectedFoodItem}>
              <Text>{food.name}</Text>
              <View style={styles.editContainer}>
                {food.isEditing ? (
                  <>
                    <TextInput
                      style={styles.editInput}
                      value={food.editGrams}
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        handleEditGramsChange(text, index)
                      }
                    />
                    <TouchableOpacity
                      style={styles.editIcon}
                      onPress={() => handleEditFood(index, false)}
                    >
                      <Ionicons name="checkmark" size={24} color="green" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.gramsText}>{food.editGrams} g</Text>
                    <TouchableOpacity
                      style={styles.editIcon}
                      onPress={() => handleEditFood(index, true)}
                    >
                      <Ionicons name="pencil" size={24} color="blue" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={handleSaveFood} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Guardar Comida</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Clicka un alimento para anadirlo:</Text>
          <View>
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                onPress={() => setSelectedTab("ourFood")}
                style={[
                  styles.tabButton,
                  selectedTab === "ourFood" && styles.activeTab,
                ]}
              >
                <Text style={styles.tabButtonText}>Nuestra Comida</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("addFood")}
                style={[
                  styles.tabButton,
                  selectedTab === "addFood" && styles.activeTab,
                ]}
              >
                <Text style={styles.tabButtonText}>Tu Comida</Text>
              </TouchableOpacity>
            </View>
            {selectedTab === "ourFood" ? (
              <View>
                <View style={styles.tabsContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {Object.keys(foodInfo).map((categoryName, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleTabChange(categoryName)}
                        style={[
                          styles.tabButton,
                          activeTab === categoryName && styles.activeTab,
                        ]}
                      >
                        <Text style={styles.tabButtonText}>{categoryName}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                {activeTab && (
                  <View style={styles.foodListContainer}>
                    {foodInfo[activeTab].map((food, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleFoodSelection(food, activeTab)}
                        style={styles.fullListItem}
                      >
                        <View>
                          <Text>{food.name}</Text>
                          <Image
                            source={food.img}
                            style={styles.searchResultImage}
                          />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.addFoodContainer}>
                <Text>Nombre del alimento:</Text>
                <TextInput
                  style={styles.addFoodInput}
                  placeholder="Nombre de la comida"
                  value={foodName}
                  onChangeText={setFoodName}
                />
                <Text>Gramos:</Text>
                <TextInput
                  style={styles.addFoodInput}
                  placeholder="Nombre de la comida"
                  value={yourGrFood}
                  onChangeText={setYourGrFood}
                />
                <Text>Categoría:</Text>
                <Picker
                  selectedValue={yourCategory}
                  style={styles.picker}
                  onValueChange={(itemValue) => setYourCategory(itemValue)}
                >
                  {Object.keys(foodInfo).map((categoryName, index) => (
                    <Picker.Item
                      key={index}
                      label={categoryName}
                      value={categoryName}
                    />
                  ))}
                </Picker>
                <TouchableOpacity
                  onPress={handleSaveFood}
                  style={styles.addFoodButton}
                >
                  <Text style={styles.addFoodButtonText}>Añadir</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
  grTotalContainer: {
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center", // Align horizontally in the center
    alignItems: "center",
    padding: 20,
  },
  chartContainer: {
    flex: 1,
    width: "25%",
    flexDirection: "row",
    justifyContent: "center", // Align horizontally in the center
    alignItems: "center",
  },
  horizontalChartsContainer: {
    width: "75%",
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  horizontalChartContainer: {
    alignItems: "center",
    marginLeft: 25,
  },
  horizontalChart: {
    height: 50,
    width: 50,
  },

  tabsContainer: {
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#3498DB",
  },
  tabButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  foodListContainer: {
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addFoodContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  addFoodInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addFoodButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addFoodButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedTab: {
    borderColor: "#3498DB",
    borderWidth: 2,
  },
  picker: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  gramsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editInputInstagram: {
    backgroundColor: "#FAFAFA", // Color de fondo similar a Instagram
    borderColor: "#ddd",
    fontSize: 16,
  },
  totalGrams: {
    alignSelf: "center", // Centrar el texto horizontalmente
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto", // Mover los elementos a la derecha
  },
  editInput: {
    width: 50, // Reducir el ancho del input para que quepa en la pantalla
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10, // Agregar espacio entre el input y el ícono
  },
  gramsText: {
    fontSize: 16,
    marginRight: 10, // Agregar margen derecho para separar el texto del ícono
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  legendSquare: {
    width: 10,
    height: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  legendLabelHeader: {
    flex: 2,
    fontWeight: "bold",
  },
  legendTextHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  legendLabel: {
    flex: 2,
  },
  legendText: {
    flex: 1,
    textAlign: "center",
  },
});

export default AddFoodScreen;
